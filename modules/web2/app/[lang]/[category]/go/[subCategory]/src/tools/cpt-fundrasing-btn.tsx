// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 14 Mar 2024
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

import { loadDOT } from "@/app/__CORE__/utils/i18n-types"

let a = loadDOT("TOB34z6mX")

export default () => {
    let Dot = a()
    return <a onClick={(e) => {
        e.preventDefault()
        if (confirm(Dot("SZDOPPh8G", "To support this project, you can also choose to finance us by purchasing a professional edition of our software, we promise it will be a good investment for you to use LafTools of the professional edition. Do you want to know more?"))) {
            location.href = ('https://codegen.cc')
        } else {
            location.reload()
        }
    }} className='flex flex-row items-center justify-center ' href={'javascript:void(0);'}>
        <button type="button" className="py-2 w-full   justify-center inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <img src='/controls/help.png' className='w-5 h-5 mr-[2px] ' />
            <span className=''>
                {Dot("smi-8G-AQ", "Fundraising Plan")}
            </span>
        </button>
    </a>
}