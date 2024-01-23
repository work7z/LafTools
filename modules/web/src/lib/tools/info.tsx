// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
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

import { OneOf } from "protobufjs";
import { Dot } from "../../utils/TranslationUtils";
import { ToolHandler, ToolHandlerClass } from "./handler";
import { FAQItem } from './faq/types'
import _ from "lodash";
import { CodeImplMap } from "./code/types";


export type AppInfoType = {
    Label: string;
    ImportImpl?: () => Promise<ToolHandlerClass>
    ImportFAQ?: () => Promise<FAQItem[]>
    ImportCode?: () => Promise<CodeImplMap>
    Description?: string;
}
let passInfo = (obj: AppInfoType): AppInfoType => {
    return obj;
}
let appToolInfoObj: {
    [key: string]: AppInfoType
} = {
    "edc_base64": passInfo({
        Label: Dot("gkC8t", "Base64")
    }),
    "edc_base32": passInfo({
        Label: Dot("gkqC8t", "Base32")
    }),
    "edc_base45": passInfo({
        Label: Dot("gkdqqC8t", "Base45")
    }),
    "edc_base58": passInfo({
        Label: Dot("egkqC8t", "Base58")
    }),
    "edc_base62": passInfo({
        Label: Dot("egkqCd8t", "Base62")
    }),
    "edc_base85": passInfo({
        Label: Dot("e4Cd8t", "Base85")
    }),
    "md5": passInfo({
        Label: "MD5"
    }),
    // Example
    "Example": passInfo({
        Label: Dot("1X8x7", "Example")
    }),
}
_.forEach(appToolInfoObj, (x, d, n) => {
    x.ImportImpl = () => import(`./impl/${d}.tsx`)
    x.ImportFAQ = () => import(`./faq/${d}.tsx`)
    x.ImportCode = () => import(`./code/${d}.tsx`)
})

export type AppToolKeyType = keyof typeof appToolInfoObj; // "a" | "b"

export default appToolInfoObj