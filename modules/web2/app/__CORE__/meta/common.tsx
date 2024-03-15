// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 6 Mar 2024
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

import { fmtURL_Server } from "../utils/routeUtils";



export * from "@/app/[lang]/client/src/impl/tools/d_portal";


export let fmtURL_Category = (x: string[]) => {
    return fmtURL_Server(x)
}

export let fmtURL_ToolSubPage = (x: string[]) => {
    return fmtURL_Category(['tools', ...x])
}


export type SystemConfig = {
    database: {
        link: string
    },
    sms: {
        appId: string,
        secretId: string,
        secretKey: string
    }
}


export type PageProps<T, K> = {
    params: T,
    searchParams: K
}