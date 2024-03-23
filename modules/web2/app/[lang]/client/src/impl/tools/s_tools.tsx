
// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Fri, 22 Mar 2024
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


import _ from "lodash"
import { Dot } from "../../utils/cTranslationUtils"
import { AppOptFnMap } from "./g_optlist"
import { Intent } from "@blueprintjs/core"
import { tw } from "../../types/styles"
export type OpDetail = {
    id: string,
    twBgClz: string,
    sortType: number,
    twClz: string,
    intent: Intent,
    label: string,
    description: string
}
export let getAllOperationDetails = (): OpDetail[] => {
    let opDetails: OpDetail[] = []

    _.forEach(AppOptFnMap, (x, d, n) => {
        let xobj = x({ Dot: Dot })
        let whatIntent: Intent = 'none'
        let twClz = ''
        let twBgClz = ''
        let sortType = 99
        let xid = d;
        let lowerId = _.toLower(xid)
        let startsWithTo = xid.startsWith('To')
        if (startsWithTo) {
            sortType = 97
            whatIntent = 'success'
        } else if (lowerId.startsWith('from')) {
            sortType = 98
            whatIntent = 'warning'
        } else if (lowerId.indexOf("beautify") != -1 || lowerId.indexOf("format") != -1) {
            sortType = 96
            twClz = tw` !border-lime-700 dark:!border-lime-600 !text-lime-600 dark:!text-lime-500   `
            twBgClz = tw` !bg-lime-700 !text-white  `
        }

        opDetails.push({
            id: d,
            intent: whatIntent,
            twBgClz: twBgClz,
            twClz: twClz,
            sortType,
            label: xobj.optName || "N/A",
            description: xobj.optDescription
        })
    })
    // x.id.replace("From", "").replace("To", ""),
    return _.sortBy(opDetails, x => [x.sortType,])
}