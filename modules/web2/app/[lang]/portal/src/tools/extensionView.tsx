'use client'

import Link from 'next/link'
import React from 'react'
import { pushClient } from '@/app/__CORE__/utils/clientUtils'
import { useRouter } from 'next/navigation'
import ToolSingleView from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/tools/ToolSingleView'
import { Provider, useDispatch } from "react-redux";
import { store } from '@/app/[lang]/client/src/store'

export type ExtensionViewProps = {

}

export default (props: ExtensionViewProps) => {
    let r = useRouter()
    return <Provider store={store}>
        <div className=' w-full h-full'>
            <ToolSingleView extId={'edc_base64'} />
        </div>
    </Provider>
}