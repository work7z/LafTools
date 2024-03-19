'use client'
// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 28 Feb 2024
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

import React, { useEffect } from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import ExtraListTool from './extra-list-tool';
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils';
import _ from 'lodash';
import gutils from '@/app/[lang]/client/src/utils/GlobalUtils';
import { loadDOT } from '@/app/__CORE__/utils/i18n-types';
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}

export type CrtToolProp = ToolProp
let recentToolStorageKey = "tyoZa-kdM"
export type TitleLinkType = { title: string, link: string }
let d = loadDOT("D4tscXwgV")
export default (props: CrtToolProp) => {
    d()
    const [tools, setTools] = React.useState<TitleLinkType[]>([])
    useEffect(() => {
        let value = localStorage.getItem(recentToolStorageKey) || '[]'
        let storage = gutils.safeparse(value)
        let newTools = tools;
        if (storage) {
            newTools = storage as any
            setTools(newTools)
        }
        setTimeout(() => {
            let ele = document.getElementById("tool-current-title")
            if (ele) {
                let crtTitle = ele.innerText
                let crtLink = window.location.href
                let newResults: TitleLinkType[] = [{ title: crtTitle, link: crtLink }, ...newTools]
                let pObj = {}
                let filterValue = _.take(newResults.filter(x => {
                    if (pObj[x.title]) {
                        return false;
                    } else {
                        pObj[x.title] = true
                        return true;
                    }
                }), 25)
                localStorage.setItem(recentToolStorageKey, JSON.stringify(filterValue))
            }
        }, 3500)

    }, [])
    if (_.isEmpty(tools)) { return '' }
    return <Card {...getCardsProps()} className={light_border_clz_all} >
        <div className='px-2 py-2 text-xs'>
            <span>
                {Dot("OUQHhPFdkC5", "You recently used these tools:")}
            </span>
            <span>
                {
                    tools.map((x, i) => {
                        return <a key={i} href={x.link} className='ml-2'>{x.title}</a>
                    })
                }
            </span>
        </div>
    </Card >
}