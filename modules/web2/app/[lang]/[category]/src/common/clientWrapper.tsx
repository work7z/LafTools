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
import React from 'react'
import { pushClient } from '@/app/__CORE__/utils/clientUtils'
import { useRouter } from 'next/navigation'
import ToolSingleView from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/tools/ToolSingleView'
import { Provider, useDispatch } from "react-redux";
import { store } from '@/app/[lang]/client/src/store'
import '@/app/[lang]/client/src/initapp'
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp'
import { VAL_CSS_MENU_TITLE_PANEL, border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles'
import { loadDOT } from '@/app/__CORE__/utils/i18n-types'
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils'
import SmallScreenDetecter from '@/app/[lang]/client/src/SmallScreenDetecter'
import { ClientPortalContext } from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/types';

let d = loadDOT("1RH8bdqw")
export let getAppToolHeight = () => {
    return 880
}

export default (props: { children: any }) => {
    d()
    return <div className='w-full h-full'>
        <ClientPortalContext.Provider value={{
            appToolHeight: getAppToolHeight(),
            portalMode: true
        }}>
            <Provider store={store}>
                {props.children}
                <SmallScreenDetecter />
            </Provider>
        </ClientPortalContext.Provider>
    </div>
}