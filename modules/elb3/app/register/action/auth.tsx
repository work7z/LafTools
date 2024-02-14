

import { getImgBase64Result, } from "@/app/api/captcha/route";
import dao from "../../__CORE__/dao";
import { Dot } from "../../__CORE__/utils/TranslationUtils";
import { AsyncCreateResponse, CheckRules, fn_verifyVCode, validateEachRuleInArr } from "../action-types";
import { setCookie, getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import _ from "lodash";
import { InvitationCode, User, UserRole, UserToken } from "@/app/__CORE__/dao/model";
import { checkIfStrOnlyHasAlphanumeric } from "./utils";
import { randomUUID } from "crypto";
import { key_sessionGroup } from "../redis-types";
import path from "path";
import fs from 'fs'
import crypto from 'crypto'
import { getPreCompiledDir } from "@/app/__CORE__/hooks/env";

let dir = getPreCompiledDir()
let keyFile = path.join(dir, 'private.key')
let privateKey = fs.readFileSync(keyFile, 'utf-8')

export let getSignatureFromStr = (str: string) => {
    return getMD5(str + privateKey) + 'v1' // signature plus version
}


export let getMD5 = (str: string) => {
    let md5 = crypto.createHash('md5')
    md5.update(str)
    return md5.digest('hex')
}
