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

    let [read, setRead] = useLocalStorage("read-en-rntgFr", "false")

    if (read == 'true') {
        return ''
    }

    if (regionUtils.isCurrentUserPossibleChinese() && regionUtils.isUSHost()) {
        return (
            <div className={" bg-yellow-100 text-black p-1 text-xs text-center  border-b-[1px] " + border_clz}>
                <div className="space-x-2">
                    <span className="font-semibold">
                        切换至更稳定快速的国内版(Switch to CN region)
                    </span>
                    <a href={regionUtils.getCNHosts()[0]}>Redirect</a>
                    <a href="#" onClick={() => {
                        setRead("true")
                    }}>Close</a>
                </div>
            </div>
        )
    } else {
        return ''
    }
}