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

'use client'

import { loadDOT } from "@/app/__CORE__/utils/i18n-types"
import { useEffect } from "react"
import AlertUtils from "./utils/AlertUtils"


let a = loadDOT("yK170zDc1")

export default () => {
    let Dot = a()
    useEffect(() => {
        // if window size smaller than 1000, then alert
        if (window.innerWidth < 800) {
            AlertUtils.win_alert({
                id: "3QF1S",
                msg: Dot("8qzWJu", "Sorry, currently we haven't supported small screen device yet, please use PC to visit this page.")
            })
        }
    }, [])

    return ''
}