'use server'

import dao from "../__CORE__/dao";
import { Dot } from "../__CORE__/utils/TranslationUtils";
import { AsyncCreateResponse, CheckRules, validateEachRuleInArr } from "./action-types";

export default async function create(formData: {
    username?: string,
    password?: string,
    email?: string,
    confirmPassword?: string,
    vcode?: string
}): Promise<AsyncCreateResponse> {
    let rules: CheckRules[] = [
        {
            type: "non-empty",
            name: "username",
            label: Dot("RfqYACPtV", "Username"),
        },
        {
            type: "non-empty",
            name: "password",
            label: Dot("TXdh_K", "Password"),
        },
        {
            type: "non-empty",
            name: "email",
            label: Dot("TXdh_wK", "Email"),
        },
        {
            type: "non-empty",
            name: "confirmPassword",
            label: Dot("TqXdh_K", "Confirm Password"),
        },
        {
            type: "non-empty",
            name: "vcode",
            label: Dot("TqXddh_K", "Verification Code"),
        },
        {
            type: "valid-email",
            name: "email",
            label: Dot("TXddh_wK", "Email"),
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
    ]

    let validObj = await validateEachRuleInArr(rules, formData);
    if (validObj) {
        return validObj
    }

    const rawFormData = {
        ...formData
    };
    let dbref = await dao()
    console.log(rawFormData);
    return {
        message: 'this is new item'
    }
}