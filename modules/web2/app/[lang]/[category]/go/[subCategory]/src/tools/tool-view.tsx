// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Fri, 8 Mar 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

'use client'

import Link from 'next/link'
import React, { useContext } from 'react'
import { pushClient } from '@/app/__CORE__/utils/clientUtils'
import { useRouter } from 'next/navigation'
import ToolSingleView from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/tools/ToolSingleView'
import { Provider, useDispatch } from "react-redux";
import { store } from '@/app/[lang]/client/src/store'
import '@/app/[lang]/client/src/initapp'
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp'
import { CSS_BG_COLOR_WHITE, VAL_CSS_MENU_TITLE_PANEL, border_clz, light_border_clz_all, tw } from '@/app/[lang]/styles'
import { loadDOT } from '@/app/__CORE__/utils/i18n-types'
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils'
import SmallScreenDetecter from '@/app/[lang]/client/src/SmallScreenDetecter'
import ClientWrapper from '../wrapper/clientWrapper'
import { ClientPortalContext } from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/types'

export type ExtensionViewProps = {

}


let d = loadDOT("1RH8bum7S")
let ToolTitlebar = (props) => {
    d()
    return <div className={CSS_BG_COLOR_WHITE + ' relative w-full flex flex-row justify-between px-[2px] items-center text-sm ' + light_border_clz_all + " border-b-0 "} style={{
        borderBottom: 'none',
        height: VAL_CSS_MENU_TITLE_PANEL
    }}>
        <div>
            <a href="#">
                {/* {Dot("crZZ_WXlw", "View Relevant")} */}
            </a>
        </div>
        <div className={`font-semibold top-[50%] translate-y-[-50%] absolute left-[50%] translate-x-[-50%]`}>
            {Dot("lje4Xk6ai", "Base64 Encoder")}
        </div>
        <div>
            <a href="#">
                {/* {Dot("438yFc2HZ", "Float this Tool")} */}
            </a>
        </div>
    </div>
}

let ToolInnerView = (props: ExtensionViewProps) => {
    d()
    let constructedKey = useConstructedKeyAndInit()
    // h - [650px] xl: h - [800px]
    let clientContext = useContext(ClientPortalContext)

    return <div className='w-full min-h-[500px]' >
        <ToolTitlebar extId="edc_base64" />
        <div
            style={{
                height: clientContext.portalMode ? 'auto' : `calc(100% - ${VAL_CSS_MENU_TITLE_PANEL}px)`
            }}
            className={' w-full   rounded-sm shadow-sm' + light_border_clz_all + ' ' + CSS_BG_COLOR_WHITE}
            key={constructedKey}
        >
            <ToolSingleView disableClientMode extId={'edc_base64'} />
        </div>
    </div>
}

export default (props: ExtensionViewProps) => {
    return <ClientWrapper children={
        <div className='w-full h-full p-[5px] relative bg-slate-50 dark:bg-gray-900'>
            <ToolInnerView {...props} />
        </div>
    } />
}