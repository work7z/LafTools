// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Fri, 23 Feb 2024
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

import Link from "next/link"
import { LabelHrefType, NavigatorPassProp } from ".."
import { fmtURL_Server } from "@/app/__CORE__/utils/routeUtils"

export let NavCategory = (props: NavigatorPassProp & {
    activeId?: string,
    nav: LabelHrefType[],
    extraLeft?: any
}) => {
    let { nav } = props
    let leftNav = nav
    return <div className={' flex flex-row items-center  space-x-4 font-xs '}>
        {props.extraLeft}
        {
            leftNav.map(x => {
                return <Link href={x.href || fmtURL_Server([x.id || '']) || ''} className={
                    "  text-xs text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 duration-100 " + (
                        // props.activeId && props.activeId == x.id ? ' underline-offset-1 ' : ''
                        ''
                    )
                }>{x.label}</Link>
            })
        }
    </div>
}