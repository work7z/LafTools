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

import { COMMON_CLZ_ANCHOR_TEXT } from "@/app/__CORE__/common/clz"
import RegularLink from "@/app/__CORE__/components/RegularLink"
import { MoonIcon, Cog8ToothIcon, SunIcon } from '@heroicons/react/24/solid'
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"
import { loadDOT } from "../../utils/i18n-types"

let a = loadDOT("6xOX9cfLT")

export default (props: { labelMode?: boolean }) => {
    a()
    const { theme, setTheme } = useTheme();

    let [mounted, setMount] = useState(false)
    useEffect(() => {
        setMount(true)
    }, [])

    if (!mounted) {
        return <span></span>;
    }

    return <span className='flex space-x-2 items-center justify-start flex-row '>
        {
            theme == "dark" ? (
                <SunIcon className="cursor-pointer h-5 w-5 text-yellow-300" onClick={() => {
                    setTheme('light')
                }} />
            ) : (
                <MoonIcon className=" cursor-pointer h-5 w-5 text-solarized-cyan-400 mt-[2px] " onClick={() => {
                    setTheme('dark')
                }} />
            )
        }
        <span onClick={() => {
            setTheme(theme == 'dark' ? 'light' : 'dark')
        }} className={' cursor-pointer text-sm ' + (theme == 'dark' ? ' text-yellow-400 ' : ' text-solarized-cyan ')}>
            {props.labelMode ? theme == 'dark' ? Dot("JAbVG", "Light Theme") : Dot("OnP4s", "Dark Theme") : ''}</span>
    </span>
}