
// let xlocale = getXLocaleStrInRSC()

import { LocaleType } from "@/middleware"
import { getXLocaleStrInRSC } from "./TranslationUtils"
import { sysLocale } from "./ClientTranslationUtils"


export let getLocalePrefix_Client = (): LocaleType => {
    return sysLocale
}

export let fmtURL_Client = (str: string): string => {
    if (str == '/') {
        str = ''
    }
    let localePrefix = getLocalePrefix_Client().langInURL
    return "/"+localePrefix + str
}