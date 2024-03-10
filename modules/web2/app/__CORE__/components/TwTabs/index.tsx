// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
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

import React from 'react'
import _ from 'lodash'
import { useParams, usePathname } from 'next/navigation'

export default (props: {
    tabs: { label: string, value: string }[],
    activeId?: string,
    paramName: string
}) => {
    let pathname = usePathname()
    let p = useParams()
    let { tabs } = props;
    let pactiveId = props.activeId || _.get(tabs, '0.value')
    return <>
        <div className="flex">
            <div className="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-600">
                <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
                    {
                        tabs.map(x => {
                            return <a href={`${pathname}?${props.paramName
                                }=${x.value
                                }`}>
                                <button type="button" className={
                                    pactiveId == x.value ? `
                                  hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white active
                                  `:

                                        ` hs-tab-active:bg-white hs-tab-active:text-gray-700 hs-tab-active:dark:bg-gray-800 hs-tab-active:dark:text-gray-400 dark:hs-tab-active:bg-gray-800 py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white `


                                } id={`segment-item-${x.value}`} data-hs-tab={`#${x.value}`} aria-controls={x.value} role="tab">
                                    {x.label}
                                </button>
                            </a>
                        })
                    }
                </nav>
            </div>
        </div>
    </>
}
