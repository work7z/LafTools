// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 16 Mar 2024
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


import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles';
import { Dot, getHStr } from '@/app/__CORE__/utils/TranslationUtils';
import Nav from '../nav/nav-sub-tab';
import Link from 'next/link';
import { fmtURL_Server } from '@/app/__CORE__/utils/routeUtils';
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import { ToolProp, getCardsProps } from '.';
import CptCalendar from '../cpt/cpt-calendar';
import SidebarQuickaccess from './sidebar-quickaccess';

import { Button, ButtonGroup } from "@nextui-org/react";


export default (props: ToolProp) => {
    let subCategory = props.subCategory
    let secondaryPanelClzHeader = tw('bg-slate-50 g-card-header dark:bg-slate-700')

    return <div className='w-64  space-y-2'>
        <Card {...getCardsProps()}>
            <CardHeader className={secondaryPanelClzHeader}>{Dot("ob1q-I7s-", "About LafTools")}</CardHeader>
            <CardBody>
                <div className='space-y-2'>
                    <Link className='flex flex-row items-center justify-center ' href={fmtURL_Server(['client'])}>
                        <Button color='primary' fullWidth size='sm' variant='bordered'>
                            <img src='/controls/program.png' className='w-5 h-5 mr-[2px] ' />
                            <span className=''>
                                {Dot("kUSuP_S-Y", "Try with Client UI")}
                            </span>
                        </Button>
                        {/* <button type="button" className="w-full justify-center py-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        </button> */}
                    </Link>
                    <FundrasingPlanBtn />
                </div>
            </CardBody>
        </Card>
        <Card {...getCardsProps()}>
            {/* {Dot("8HcQxKgho", "Quick Access")} */}
            <CardHeader className={secondaryPanelClzHeader}>
                {Dot("o1ikM3T4c", "Programmer's Helpers")}({Dot("09m6vG51A", "in development")})</CardHeader>
            <CardBody>
                <SidebarQuickaccess />
            </CardBody>
        </Card>
        {/* <Card {...getCardsProps()}>
            <CardHeader className={secondaryPanelClzHeader}>{Dot("rzoFmjStq", "Relevant Tools")}</CardHeader>
            <CardBody>
                <ul className={"list-disc ml-5"}>
                    <li>item1</li>
                    <li>item2</li>
                    <li>item3</li>
                </ul>
            </CardBody>
        </Card> */}
        {/* <Card {...getCardsProps()}>
            <CardHeader className={secondaryPanelClzHeader}>{Dot("dO6b2Tkqwe", "Recently Used Tools")}</CardHeader>
            <CardBody>
                <div>used tools</div>
            </CardBody>
        </Card> */}
        <Card {...getCardsProps()}>
            <CardHeader className={secondaryPanelClzHeader}>{Dot("announcement", "Announcement")}</CardHeader>
            <CardBody>
                <div className='text-xs'>
                    <p>{Dot("BP2jBlIE0", "Some links are still unavailable as LafTools is still under development, please give us a star to subsrible latest update on GitHub.")}</p>
                    <a target="_blank" href={'https://github.com/work7z/LafTools'}>{Dot("wYsKTq7nK", "Click me to view the source code")}</a>
                </div>
                {/* <div>Debug: {getHStr()}</div> */}
            </CardBody>
        </Card>
    </div>
}