'use client'

import TranslationUtils, { sysLocale } from "@/app/__CORE__/utils/cTranslationUtils"
import { useEffect } from "react"

export default (props: { xlocaleJSON: string }) => {
    useEffect(() => {
        TranslationUtils.ExtraMap = {
            ...TranslationUtils.ExtraMap,
            ...JSON.parse(props.xlocaleJSON)
        }
    }, [])
    return <span></span>
}