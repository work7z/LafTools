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
import { CSS_BG_COLOR_WHITE, VAL_CSS_MENU_TITLE_PANEL, VAL_MENU_LEFT_PANEL_WIDTH, border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles'
import { loadDOT } from '@/app/__CORE__/utils/i18n-types'
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils'
import SmallScreenDetecter from '@/app/[lang]/client/src/SmallScreenDetecter'
import ClientWrapper, { getAppToolHeight } from '../../common/clientWrapper'
import { ClientPortalContext } from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/types'
import { CardBody } from '@nextui-org/react'
import { CategorySearchProps, ToolSearchDetail } from '@/app/[lang]/page'
import NotYetOkie from '@/app/[lang]/client/src/components/NotYetOkie'
import exportUtils from '@/app/[lang]/client/src/utils/ExportUtils'

export type ExtensionViewProps = ToolSearchDetail & CategorySearchProps


let d = loadDOT("1RH8bum7S")


let ToolInnerView = (props: ExtensionViewProps) => {
    d()
    let constructedKey = useConstructedKeyAndInit()
    let clientContext = useContext(ClientPortalContext)
    let toolId = props.searchToolItem.toolId
    let body: JSX.Element = <div>not implemented yet</div>
    let needFullPage = clientContext.portalMode && false; // TODO: for now, we just only use fixed height to support drafting border
    if (!toolId) {
        body = <div className='w-full min-h-[500px]'>
            <div>{Dot("QJUcHZ3bD", "Sorry, it is still in progress, please kindly stay tuned by staring our Github repo.")}</div>
        </div>
    } else {
        body = <ToolSingleView needFullPageSupport={needFullPage} extId={toolId} />
    }
    return <div className='w-full ' style={{
        height: `${clientContext.appToolHeight}px`
    }} key={constructedKey}>
        {body}
    </div>
}

export default (props: ExtensionViewProps) => {
    return <CardBody className='p-0'>
        <ClientWrapper children={
            <div className='w-full h-full p-[5px] min-h-[300px] relative bg-slate-50 dark:bg-gray-900'>
                <ToolInnerView {...props} />
            </div>
        } />
    </CardBody>
}