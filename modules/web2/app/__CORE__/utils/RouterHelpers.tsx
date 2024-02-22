
// let xlocale = getXLocaleStrInRSC()

import { LocaleType } from "@/middleware"
import { getXLocaleStrInRSC } from "./TranslationUtils"


export let getLocalePrefix_Server = (): LocaleType => {
    return getXLocaleStrInRSC()
}
export let fmtURL_Server = (str: string): string => {
    let localePrefix = getLocalePrefix_Server().langInURL
    return "/"+localePrefix + str
}