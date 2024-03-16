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

import React, { cache } from 'react';
import _ from 'lodash';
import { loadDOT } from '@/app/__CORE__/utils/i18n-types';

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

export default (props) => {
    let Dot = d()
    return <div className='flex flex-row space-x-1'>
        <IconLabel icon='translation.png' label={Dot("mWljvLU5c", "Translation")} />
        <IconLabel icon='to-do-list.png' label={Dot("QDhYHZeBO", "TODO")} />
        <IconLabel icon='stopwatch.png' label={Dot("BRrOAMTG7", "Timer")} />
        <IconLabel icon='dictionary.png' label={Dot("BRrOAMTG7", "Timer")} />
    </div>
}