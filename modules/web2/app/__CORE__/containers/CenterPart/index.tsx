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

import { getPureWebsiteName } from "@/app/__CORE__/common/config"
import { Dot } from "@/app/__CORE__/utils/TranslationUtils"

export default (props: { children: JSX.Element }) => {
    return <div style={{
        minHeight: 'calc(100vh - 30px - 120px)'
    }} className="  dark:bg-solarized-base02 bg-slate-100 w-full shadow-inner dark:shadow-solarized-base00 dark:shadow-none  shadow-slate-200  pb-12">
        <div className="app-minmax-size mx-auto p-4">
            {props.children}
        </div>
    </div>
}