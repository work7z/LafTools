// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import React, { useEffect } from 'react';
import { Dot } from '../../utils/cTranslationUtils';
import { loadDOT, useTTT2 } from '@/app/[lang]/register/i18n-types';
let a = loadDOT("-bXvwz70W")
export default (props: { name: string }) => {
    a()

    let [value, setValue] = React.useState('')
    useEffect(() => {
        setValue(localStorage.getItem(props.name) || '')
    }, [])
    return (
        <div className=''>
            <label htmlFor="hs-leading-icon" className="block text-sm font-medium mb-2 dark:text-white">{Dot("-rKp-Y", "Email")}</label>
            <div className="relative">
                <input value={value} onChange={e => {
                    setValue(e.target.value)
                    localStorage.setItem(props.name, e.target.value)
                }} name={props.name} type="text" id="hs-leading-icon" className="py-3 px-4 ps-11 block w-full border-gray-200 border-[1px]  rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={Dot("R59iP", "Enter Email")} />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                    <svg className="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
            </div>
        </div>
    )
}