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

import React, { cache } from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { CSS_TW_GRAY_TEXT, border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles';
import { Dot } from '@/app/__CORE__/utils/TranslationUtils';
import SubTabNav from '../nav/nav-sub-tab';
import Link from 'next/link';
import { fmtURL_Server } from '@/app/__CORE__/utils/routeUtils';
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import { getCardsProps } from './main-part';
import { fmtURL_ToolSubPage, getToolSubCategory } from '../../../types';
import _ from 'lodash';
import { URL_SUBCATEGORY_GO_PATH } from '@/app/__CORE__/meta/url';

export default (props: ToolProp) => {
    let subCategory = getToolSubCategory()
    return <div className='flex-1  space-y-2'>
        {
            subCategory.map(x => {
                return <Card {...getCardsProps()} className={light_border_clz_all + ' py-4 mark-st-wrapper'} key={x.id} >
                    <div className='flex flex-row items-start justify-between mx-3'>
                        <h1 className='m-0  text-[15px] mb-3 font-semibold  mark-title border-l-4 px-2 '>{x.longLabel}</h1>
                        <div className={CSS_TW_GRAY_TEXT + ' text-xs'}>{Dot("hbvxdivMHi", "{0} tools in total", _.size(x.subTabs))}</div>
                    </div>
                    <ul className='space-y-[4px]  block px-9 '>
                        {
                            (x.subTabs || []).map(xx => {
                                return <li className=' gray-list-item  w-1/4 xl:w-1/5 list-item list-disc  float-left'>
                                    <Link className='black-anchor-text   list-disc  text-left ' href={fmtURL_ToolSubPage([URL_SUBCATEGORY_GO_PATH, x.id, xx.id])} key={xx.id}>
                                        {xx.label}
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </Card>
            })
        }
    </div>
}