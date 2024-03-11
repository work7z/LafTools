'use client'

import { loadDOT } from "@/app/__CORE__/utils/i18n-types"
import { useEffect } from "react"
import AlertUtils from "./utils/AlertUtils"


let a = loadDOT("yK170zDc1")

export default () => {
    let Dot = a()
    useEffect(() => {
        // if window size smaller than 1000, then alert
        if (window.innerWidth < 800) {
            AlertUtils.win_alert({
                id: "3QF1S",
                msg: Dot("8qzWJu", "Sorry, currently we haven't supported small screen device yet, please use PC to visit this page.")
            })
        }
    }, [])

    return ''
}