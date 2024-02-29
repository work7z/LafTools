'use client'

import NoSsr2 from '@/app/__CORE__/components/NoSsr2'
import { FinalRootApp } from './src/main'
import TranslationUtils from '@/app/__CORE__/utils/cTranslationUtils'
import { useEffect } from 'react'


export default () => {
    useEffect(() => {
        if (window) {
            // let langMap = 
            // TranslationUtils.LangMap = langMap
        }
    }, [])
    let innerChild = <div className="w-full h-full">
        <FinalRootApp />
    </div>
    return innerChild
}
