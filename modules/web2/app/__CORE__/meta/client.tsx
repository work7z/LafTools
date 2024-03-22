// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Tue, 19 Mar 2024
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

import { fmtURL_Client } from "../utils/cRouteUtils"
import { URL_TOOL_CATEGORY } from "./url"


export let fmtURL_ToolSubPageClient = (x: string[]) => {
    return fmtURL_Client([URL_TOOL_CATEGORY, ...x])
}

