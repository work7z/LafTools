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
'use client'
import React, { cache } from 'react';
import _ from 'lodash';
import { loadDOT } from '@/app/__CORE__/utils/i18n-types';
import { Button, ButtonGroup } from "@nextui-org/react";
import { border_clz } from '@/app/__CORE__/meta/styles';
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils';

let d = loadDOT("g2m9MYK-u")

export let IconLabel = (props: { icon: string, label: string }) => {
    // javascript:void(0)
    return <a href=''>
        <div className="">
            <img src={'/controls/' + props.icon} className="w-5 h-5 mr-2" />
            {/* <span>{props.label}</span> */}
        </div>
    </a>
}

export let getQuickAccessList = () => {
    d()
    return [
        {
            id: 'translation',
            icon: 'translation.png',
            label: Dot("mWljvLU5c", "Translation")
        },
        {
            id: 'todo',
            icon: 'to-do-list.png',
            label: Dot("QDhYHZeBO", "TODO")
        },
        {
            id: 'stopwatch',
            icon: 'stopwatch.png',
            label: Dot("BRrOAMTG7", "Timer")
        },
        {
            id: 'dictionary',
            icon: 'dictionary.png',
            label: Dot("8TA2AYbhv", "Dictionary")
        }
    ]
}


export default (props) => {
    let Dot = d()
    let quickAccessList = getQuickAccessList()
    return <div className='space-y-2'>
        <div className='text-xs'>
            {Dot("o1ikM3T4c", "Programmer's Helpers")}:
        </div>
        <div className='flex flex-row space-x-1'>
            {quickAccessList.map(x => {
                return <IconLabel key={x.id} icon={x.icon} label={x.label} />
            })}
        </div>
        <div className='mt-4' style={{
            marginTop: '14px'
        }}>
            <Button onClick={(e) => {
                // scroll to page bottom
                // window.scrollTo(0, document.body.scrollHeight);
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }} color="primary" variant='ghost' size='sm' fullWidth >
                {Dot("mFsDijzjI", "Jump to Quick Access")}
            </Button>
        </div>
    </div>
}