'use client'

import Link from 'next/link'
import React from 'react'
import { pushClient } from '@/app/__CORE__/utils/clientUtils'
import { useRouter } from 'next/navigation'
import ToolSingleView from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/tools/ToolSingleView'
import { Provider, useDispatch } from "react-redux";
import { store } from '@/app/[lang]/client/src/store'
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp'
import { border_clz, light_border_clz_all } from '@/app/[lang]/styles'

export type ExtensionViewProps = {

}

let Wrapper = (props: ExtensionViewProps) => {
    let constructedKey = useConstructedKeyAndInit()
    return <div className={' w-full  h-[650px] bg-white dark:bg-black rounded-sm shadow-sm' + light_border_clz_all} key={constructedKey}>
        <ToolSingleView disableClientMode extId={'edc_base64'} />
    </div>
}

export default (props: ExtensionViewProps) => {
    return <div className='w-full h-full p-[5px] bg-slate-50 dark:bg-slate-700'>
        <Provider store={store}>
            <Wrapper {...props} />
        </Provider>
    </div>
}