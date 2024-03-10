'use client'

import { border_clz } from "@/app/[lang]/styles"
import { useState } from "react"
import regionUtils from "../../utils/regionUtils"
import TranslationUtils from "../../utils/cTranslationUtils"


type ReturnType = [string, (value: string) => void]
export let useLocalStorage = (key: string, initialValue: string): ReturnType => {
    let [value, setValue] = useState(() => {
        let value = localStorage.getItem(key)
        if (value) {
            return value
        } else {
            return initialValue
        }
    })
    let setLocalStorageValue = (value: string) => {
        setValue(value)
        localStorage.setItem(key, value)
    }
    return [value, setLocalStorageValue]
}

export default (props) => {
    debugger;
    if (regionUtils.isCurrentUserPossibleChinese()) {
        return regionUtils.getCNHosts()[0]
    } else {
        return regionUtils.getUSHosts()[0]
    }
}