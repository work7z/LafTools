'use client'

import Link from 'next/link'
import React from 'react'
import { pushClient } from '@/app/__CORE__/utils/clientUtils'
import { useRouter } from 'next/navigation'
import ToolSingleView from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/tools/ToolSingleView'
import { Provider, useDispatch } from "react-redux";
import { store } from '@/app/[lang]/client/src/store'
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp'
import { VAL_CSS_MENU_TITLE_PANEL, border_clz, light_border_clz_all, tw } from '@/app/[lang]/styles'
import { loadDOT } from '@/app/__CORE__/utils/i18n-types'
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils'

export type ExtensionViewProps = {

}

let CSS_BG_COLOR_WHITE = tw(` bg-white dark:bg-black `)

let d = loadDOT("1RH8bum7S")
let ToolTitlebar = (props) => {
    d()
    return <div className={CSS_BG_COLOR_WHITE + ' relative w-full flex flex-row justify-between px-[2px] items-center text-sm ' + light_border_clz_all + " border-b-0 "} style={{
        borderBottom: 'none',
        height: VAL_CSS_MENU_TITLE_PANEL
    }}>
        <div>
            <a href="#">
                {Dot("crZZ_WXlw", "View Relevant")}
            </a>
        </div>
        <div className={`font-semibold top-[50%] translate-y-[-50%] absolute left-[50%] translate-x-[-50%]`}>
            {Dot("lje4Xk6ai", "Base64 Encoder")}
        </div>
        <div>
            <a href="#">
                {Dot("crZZ_WXlw", "View Relevant")}
            </a>
        </div>
    </div>
}

let Wrapper = (props: ExtensionViewProps) => {
    d()
    let constructedKey = useConstructedKeyAndInit()
    return <div className='w-full h-[650px]' >
        <ToolTitlebar extId="edc_base64" />
        <div
            style={{
                height: `calc(100% - ${VAL_CSS_MENU_TITLE_PANEL}px)`
            }}
            className={' w-full   rounded-sm shadow-sm' + light_border_clz_all + CSS_BG_COLOR_WHITE}
            key={constructedKey}
        >
            <ToolSingleView disableClientMode extId={'edc_base64'} />
        </div>
    </div>
}

export default (props: ExtensionViewProps) => {
    return <div className='w-full h-full p-[5px] relative bg-slate-50 dark:bg-gray-700'>
        <Provider store={store}>
            <Wrapper {...props} />
        </Provider>
    </div>
}