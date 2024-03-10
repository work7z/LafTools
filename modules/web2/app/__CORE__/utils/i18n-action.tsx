// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 24 Feb 2024
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

'use server'

import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import { ShareClienti18nKeys } from "./i18n-types";

let fullDefinition: ShareClienti18nKeys = {
    smsCode: Dot("9YPgsPid2M", "SMS Code"),
    other: ""
}

export let getI18nDynamically = async (obj: Partial<ShareClienti18nKeys>): Promise<Partial<ShareClienti18nKeys>> => {
    let newObj = {}
    for (let key in obj) {
        let val = obj[key]
        if (val) {
            newObj[key] = fullDefinition[key]
        }
    }
    return newObj
}
