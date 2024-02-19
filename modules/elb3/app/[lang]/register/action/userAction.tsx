'use server'

import { getImgBase64Result, } from "@/app/api/captcha/route";
import dao from "@/app/__CORE__/dao";
import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import { AsyncCreateResponse, CheckRules, fn_verifyVCode, validateEachRuleInArr } from "../action-types";
import { setCookie, getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import _ from "lodash";
import { InvitationCode, SMSCodeRecord, User, UserLoginLog, UserRole, UserToken } from "@/app/__CORE__/dao/model";
import { checkIfStrOnlyHasAlphanumeric } from "./utils";
import { randomUUID } from "crypto";
import { key_sessionGroup } from "../redis-types";
import path from "path";
import { getMD5, getSignatureFromStr } from "./auth";
import { fn_refresh_system_info_from_redis } from "../user-types";
import moment from "moment";
import handleAuthInfo from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";


export type Elb3AuthBody = {
    userAcctId: string,
    userRole: UserRole
}


export let signInWithUserId = async (userAcctId: string) => {
    let userInfo = await getUserInfoByUserAcctId(userAcctId)
    if (!userInfo) {
        throw new Error('user not found')
    }
    if (!userInfo.id) {
        throw new Error('user id not found')
    }
    let daoRef = await dao()
    // init set
    await daoRef.redis.sAdd(key_sessionGroup, userAcctId) // add user acct into the set
    // let sessionVal = await daoRef.redis.hGet(key_sessionGroup + ':' + userAcctId, 'token')
    // if (_.isEmpty(sessionVal)) {
    //     sessionVal = randomUUID().toString()
    //     await daoRef.redis.hSet(key_sessionGroup + ':' + userAcctId, 'token', sessionVal) // set user acct session id
    // }
    // add to cookie
    let push: Elb3AuthBody = {
        userAcctId: userInfo.userAcctId,
        userRole: userInfo.role
    }
    let elb3AuthBody = btoa(JSON.stringify(push))
    let expiredDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12 * 30 // by default, 30 years expired
    let signature = getSignatureFromStr(elb3AuthBody)
    setCookie('elb3-auth', expiredDate + '.' + elb3AuthBody + '.' + (signature), {
        cookies
    })
}

export let getUserInfoByUserAcctId = async (userAcctId: string): Promise<User | null> => {
    await dao()
    let user = await User.findOne({
        where: {
            userAcctId: userAcctId
        }
    })
    return user;
}
export let getUserInfoByPhoneNumber = async (phoneNumber: string): Promise<User | null> => {
    await dao()
    let user = await User.findOne({
        where: {
            phoneNumber: phoneNumber
        }
    })
    return user;
}

export type ValOrError<T> = {
    error?: string,
    value?: T
}

export let verifySMSCode = async (formData: {
    phoneNumber: string, msgCode: string, type: "activate-account" | "reset-password"
}): Promise<ValOrError<{}>> => {
    let authInfo = await handleAuthInfo()
    if (!authInfo.signedIn) {
        throw new Error('not signed in')
    }
    let userAcctId = authInfo.user?.userAcctId
    if (!userAcctId) {
        throw new Error('user acct id not found')
    }
    let daoRef = await dao()
    let item = await SMSCodeRecord.findOne({
        where: {
            userAcctId: userAcctId,
            code: formData.msgCode
        }
    })
    let key = 'smstried' + userAcctId
    let sms_code_tried_times = await daoRef.redis.get(key)
    if (sms_code_tried_times == null || sms_code_tried_times == '') {
        sms_code_tried_times = '1'
    }
    await daoRef.redis.setEx(key, 60 * 60 * 24, (parseInt(sms_code_tried_times) + 1) + '')
    let max = 200
    if (!item) {
        return {
            error: Dot("RYlJHHwg3", "SMS code is not correct. ") + `[${sms_code_tried_times}/${max}]`
        }
    }
    if (parseInt(sms_code_tried_times) > max) {
        return {
            error: Dot("D_9sNBiZj", "You tried too many times, please try again later.")
        }
    }
    await daoRef.db.transaction(async () => {
        if (item) {
            switch (formData.type) {
                case 'activate-account':
                    if (authInfo.user) {
                        await authInfo.user.update({
                            status: 'normal'
                        })
                    }
                    break;
                default:
                    throw new Error('unknown logic')
            }
            await item.destroy()
        }
    })

    return {}
}

export let hashPW = (pw: string) => {
    return getMD5("elb-210801" + pw + "240215")
}

export let sendSMSCodeWithVerificationCode = async (formData: {
    phoneNumber: string, vcode: string
}): Promise<ValOrError<{}>> => {
    await dao()
    let authInfo = await handleAuthInfo()
    if (!authInfo.signedIn) {
        throw new Error('not signed in')
    }
    let userAcctId = authInfo.user?.userAcctId
    if (!userAcctId) {
        throw new Error('user acct id not found')
    }
    console.log('sms code auth info', authInfo)
    let { phoneNumber } = formData
    let r = await validateEachRuleInArr([fn_verifyVCode()], formData)
    if (r?.error) {
        return {
            error: r.error
        }
    }
    let r2 = await sendSMSCodeForUser(userAcctId, phoneNumber)
    return r2;
}

export let sendSMSCodeForUser = async (userAcctId: string, phoneNumber: string): Promise<ValOrError<{}>> => {
    phoneNumber = _.trim(phoneNumber)
    let daoRef = await dao()
    let sms_code = _.random(100000, 999999) + ''
    let momentDate = moment().format("YYYY-MM-DD");
    let ctn = await SMSCodeRecord.count({
        where: {
            userAcctId: userAcctId,
            phoneNumber: phoneNumber,
            dateValue: momentDate
        }
    })
    if (ctn > 8) {
        return {
            error: Dot("-dxG-aEe4w", "The maximum number of SMS verification codes sent today has been reached.")
        }
    }
    await SMSCodeRecord.create({
        id: 0,
        userAcctId: userAcctId,
        phoneNumber: phoneNumber,
        code: sms_code,
        dateValue: momentDate
    })
    // TODO: send sms code
    return {}
}




export async function handleSignInUser(formData: {
    userAcctId: string,
    password: string,
    phoneNumber: string,
    type: string,
    vcode: string
}): Promise<AsyncCreateResponse<{}>> {
    let daoRef = await dao()
    let rules: CheckRules[] = [
        formData.type == 'username' ? {
            type: "non-empty",
            name: "userAcctId",
            label: Dot("oHQNQ4mRw", "User ID"),
        } :
            {
                type: 'non-empty',
                name: 'phoneNumber',
                label: Dot("Te3h_wK", "Telephone Number"),
            },
        {
            type: "non-empty",
            name: "password",
            label: Dot("TXdh_K", "Password"),
        },
        {
            type: "non-empty",
            name: "vcode",
            label: Dot("TqXddh_K", "Verification Code"),
        },
        fn_verifyVCode(),
        {
            type: 'check-fn',
            name: 'userAcctId',
            validateFn: async (val) => {
                let user: User | null = null;
                if (formData.type == 'username') {
                    user = await getUserInfoByUserAcctId(formData.userAcctId)
                } else {
                    user = await getUserInfoByPhoneNumber(formData.phoneNumber)
                }
                if (!user) {
                    return Dot("dsdfqw", "User does not exist")
                }
                if (user.password != hashPW(formData.password)) {
                    return Dot("eqwee", "Password is not correct")
                }
                // LOGIN SUCCESS
                await daoRef.db.transaction(async () => {
                    if (!user) return;
                    await signInWithUserId(user.userAcctId)
                    await UserLoginLog.create({
                        userId: user.id || -1,
                        loginIp: '',
                        loginTime: new Date(),
                    })
                })
            }
        },
    ].filter(x => x)

    let validObj = await validateEachRuleInArr(rules, formData);
    if (validObj) {
        return validObj
    }

    return {
        data: {
        },
    }
}


export default async function create(formData: {
    preview: boolean,
    userAcctId: string,
    password: string,
    phoneNumber: string,
    invitationCode: string,
    confirmPassword: string,
    vcode: string
}): Promise<AsyncCreateResponse<{ newUser?: User }>> {
    console.log('formData', formData)
    let daoRef = await dao()
    let invitationCodeItem = await InvitationCode.findOne({
        where: {
            code: formData.invitationCode
        }
    })
    let rules: CheckRules[] = [
        {
            type: "non-empty",
            name: "userAcctId",
            label: Dot("oHQNQ4mRw", "User ID"),
        },
        {
            type: "non-empty",
            name: "password",
            label: Dot("TXdh_K", "Password"),
        },
        {
            type: "non-empty",
            name: "confirmPassword",
            label: Dot("TqXdh_K", "Confirm Password"),
        },
        {
            type: 'non-empty',
            name: 'phoneNumber',
            label: Dot("TqXdd3h_wK", "Telephone Number"),
        },
        {
            type: "non-empty",
            name: "invitationCode",
            label: Dot("Xddh_wK", "Invitation Code"),
        },
        {
            type: "non-empty",
            name: "vcode",
            label: Dot("TqXddh_K", "Verification Code"),
        },
        {
            type: "valid-phone",
            name: "phoneNumber",
            label: Dot("TdXddh_wK", "Telephone Number"),
        },
        {
            type: 'check-fn',
            name: 'userAcctId',
            validateFn: async (val) => {
                let user = await getUserInfoByUserAcctId(val)
                if (user) {
                    return Dot("8sVG1RdXhx", "User ID already exists")
                }
                let ok = checkIfStrOnlyHasAlphanumeric(val)
                if (!ok) {
                    return Dot("8sVGdXhx", "User ID should only contain letters and numbers")
                }
                if (val.length < 2) {
                    return Dot("8sVG1kqXhx", "User ID should be at least 2 characters")
                }
                let prohibittedArr = [
                    "admin",
                    "administrator",
                    "root",
                    "superuser",
                    "system",
                    "systemadmin",
                    "sysadmin",
                    "user",
                    "username",
                    "useracctid",
                    "undefined",
                    "null",
                    "fuck",
                    "suck"
                ]
                // check if contains in prohibiteedArr
                let lVal = _.toLower(val)
                for (let item of prohibittedArr) {
                    if (lVal.indexOf(_.toLower(item)) != -1) {
                        return Dot("K2UEY4ddl", "The user ID contains invalid words, please avoid using {0}", item)
                    }
                }
            }
        },
        {
            type: "check-fn",
            name: "password",
            validateFn: async (val) => {
                if (val.length < 6) {
                    return Dot("8sVG1RXhx", "password should be at least 6 characters")
                }
            }
        },
        {
            type: "check-fn",
            name: "confirmPassword",
            validateFn: async (val) => {
                if (val !== formData.password) {
                    return Dot("Y-svpKvUz", "two passwords do not match")
                }
            }
        },
        {
            type: "check-fn",
            name: "invitationCode",
            validateFn: async (val) => {
                if (val.length > 0) {
                    let item = invitationCodeItem
                    if (!item) {
                        return Dot("8s1dX", "The invitation code does not exist in system, please check if there is a case sensitive issue.")
                    }
                    if (item.expiredAt < new Date()) {
                        return Dot("8saIR-LCjyChx", "Invitation code has expired")
                    }
                    if (item.useCount > item.maxUseCount) {
                        return Dot("8saIt5r5nGxwwChx", "Invitation code has been used up")
                    }
                    // all good
                } else {
                    return Dot("8s1R5nChx", "Invitation code is empty, this community is not open to public but limited to invited users.")
                }
            }
        },
        formData.preview ? null : fn_verifyVCode()
    ].filter(x => x)

    let validObj = await validateEachRuleInArr(rules, formData);
    if (validObj) {
        return validObj
    }

    if (formData.preview) {
        return {
            data: undefined
        };
    }

    let newUser = await daoRef.db.transaction(async () => {
        let newUser = await User.create({
            userAcctId: formData.userAcctId + '',
            password: hashPW(formData.password + ''),
            phoneNumber: formData.phoneNumber + '',
            invitationCode: formData.invitationCode + '',
            vcode: formData.vcode + '',
            role: 'user',
            status: 'newly-created',
            topicCount: 0,
            replyCount: 0,
        })

        await invitationCodeItem?.update({
            useCount: invitationCodeItem.useCount - 1
        })

        await signInWithUserId(formData.userAcctId + '')

        await fn_refresh_system_info_from_redis()

        await sendSMSCodeForUser(formData.userAcctId, formData.phoneNumber)

        return newUser
    })
    if (!newUser) {
        return {
            error: "create user failed"
        }
    }
    return {
        data: {
            newUser: newUser
        },
    }
}