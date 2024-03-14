// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 24 Feb 2024
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

import { fmtURL_Server } from '../__CORE__/utils/routeUtils'
import { Dot, getXHostname } from "../__CORE__/utils/TranslationUtils";
import { PortalDefinitionType, getToolsPortalDefinitions } from './client/src/impl/tools/d_portal';
import { LabelHrefType } from './navigator'

export let fmt_Category = (x: string) => {
    return fmtURL_Server(`${x}`)
}
export let fmt_ToolSubPage = (x: string) => {
    if (x.startsWith('/')) x = x.slice(1)
    return fmt_Category('tools' + '/' + x)
}
export let fn_leftNav = (): LabelHrefType[] => {
    let leftNav: LabelHrefType[] = [
        {
            label: Dot("G2dvTUljF", "Tools"),
            href: fmt_Category('/tools')
        },
        {
            label: Dot("n28g4di0L", "Manuals"),
            href: fmt_Category('/manuals')
        },
        {
            label: Dot("AvsWiJHLZ", "Resources"),
            href: fmt_Category('/resources'),
        },
        {
            label: Dot("ymyfghy1r", "Notes"),
            href: fmt_Category('/notes')
        },
        {
            label: Dot("bWQunyU10", "AI Laboratory"),
            href: fmt_Category('/ai-lab')
        },
    ]

    return leftNav
}
// TODO: update the /v2 to actual path
export let fn_rightNav = (): LabelHrefType[] => {
    let rightNav: LabelHrefType[] = [
        // {
        //     label: <LightDarkButton />,
        //     href: 'javascript:void(0);'
        // },
        {
            label: Dot("str.login", "Login"),
            href: 'https://my.laftools.dev/v2/zh-hans/nav/form/sign-in'
        },
        {
            label: Dot("str.register", "Register"),
            href: 'https://my.laftools.dev/v2/zh-hans/nav/form/sign-up'
        },
        {
            label: Dot("str.usercentre", "User Centre"),
            href: 'https://my.laftools.dev'
        },
    ]
    return rightNav
}

export let fn_leftCategoryArr = (): PortalDefinitionType[] => {
    let leftCategoryArr: PortalDefinitionType[] = getToolsPortalDefinitions()
    return leftCategoryArr;
}
export let fn_rightCategoryArr = () => {
    let rightCategoryArr: LabelHrefType[] = [
        {
            label: Dot("download-local", "Free Download"),
            href: '/v2/'
        },
        {
            label: Dot("str.remarks", "Favorites"),
            href: fmtURL_Server('/'),
        },
        {
            label: Dot("str.mostused", "Frequently-Used"),
            href: fmtURL_Server('/'),
        }
    ]
    return rightCategoryArr
}