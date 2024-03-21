// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 10 Mar 2024
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

let regionUtils = {
    getCNHosts(): string[] {
        // return ["laftools.cn"]
        return ['laftools.cn']
    },
    getUSHosts(): string[] {
        return ["laftools.dev"]
    },
    isCNHost(): boolean {
        let host = location.hostname
        return this.getCNHosts().includes(host)
    },
    isUSHost(): boolean {
        let host = location.hostname
        return this.getUSHosts().includes(host)
    },
    isCurrentUserPossibleChinese(): boolean {
        let arr = navigator.languages
        return arr.includes("zh-CN")
    }
}

export default regionUtils