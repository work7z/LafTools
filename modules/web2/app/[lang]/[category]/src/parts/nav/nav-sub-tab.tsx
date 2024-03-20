// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Mon, 11 Mar 2024
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


import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { Dot, getXSearchParams } from "@/app/__CORE__/utils/TranslationUtils";
import { PortalDefinitionTbabGroup, PortalDefinitionType, getToolSubCategory } from "@/app/[lang]/client/src/impl/tools/d_portal";
import { ToolProp } from "../tools";
import _ from "lodash";
import { fmtURL_ToolSubPage } from "@/app/[lang]/[category]/types";
import { URL_SUBCATEGORY_GO_PATH } from "@/app/__CORE__/meta/url";
import { CrtToolProp } from "../tools/main-part";

export default function (props: CrtToolProp) {
    let subCategory = props.subCategory
    let sp = {
        id: props.params.id
    }

    let subTabs: PortalDefinitionTbabGroup[] = [];
    let toolsPortalDefinitions = getToolSubCategory()
    toolsPortalDefinitions.forEach(x => {
        if (x.id == subCategory) {
            subTabs = _.take(x.subTabs || [], 7)
        }
    })
    let currentSubTabId = sp["id"]
    // if it's not empty and not included in subTabs, then set it to more
    if (!_.isEmpty(currentSubTabId)) {
        let found = false
        subTabs.every(x => {
            if (x.id == currentSubTabId) {
                found = true
            }
            return !found
        })
        if (!found) {
            currentSubTabId = 'more'
        }
    }
    // defaults to id
    if (_.isEmpty(currentSubTabId) && subTabs.length > 0) {
        currentSubTabId = subTabs[0].id
    }

    subTabs = [
        ...subTabs,
        {
            id: 'more',
            label: Dot("HckK__LH2", 'More')
        }
    ]

    return (
        <div className="flex w-full  flex-col bg-white dark:bg-black ">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-2 justify-center" aria-label="Tabs" role="tablist">
                    {
                        subTabs.map(x => {
                            let extraProps = {}
                            let isMore = x.id == 'more'
                            if (isMore) {
                                extraProps = {
                                    'data-navid': props.subCategory
                                }
                            }
                            let Ele = isMore ? Link : Link
                            let children = <button type="button" className={
                                ((currentSubTabId) == x.id ? "active " : ' ') +
                                'hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 '
                                // " hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-blue-600 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-x-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-lg hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            } id="card-type-tab-item-2" data-hs-tab="#card-type-tab-2" aria-controls="card-type-tab-2" role="tab">
                                {x.label}
                            </button>
                            return isMore ? <span  {...extraProps} key={x.id} className="inline-block">
                                {children}
                            </span> : <Ele  {...extraProps} key={x.id} href={isMore ? 'javascript:void(0);' : fmtURL_ToolSubPage([URL_SUBCATEGORY_GO_PATH, subCategory, '' + x.id])}>
                                {children}
                            </Ele>
                        })
                    }
                </nav>
            </div>

        </div>
    );
}