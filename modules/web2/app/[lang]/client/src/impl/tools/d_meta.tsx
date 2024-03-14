// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 17 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
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

import { OneOf } from "protobufjs";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { ToolHandler, ToolHandlerClass } from "./r_handler";
import { FAQItem } from './faq/types'
import _ from "lodash";
import { CodeImplMap } from "./code/types";


export type AppInfoType = {
    LabelFn: () => string;
    ImportImpl?: () => Promise<{
        default: ToolHandlerClass
    }>
    ImportFAQ?: () => Promise<{
        default: () => FAQItem[]
    }>
    ImportCode?: () => Promise<{
        default: () => CodeImplMap
    }>
    Description?: string;
}
let passInfo = (obj: AppInfoType): AppInfoType => {
    return obj;
}
let appToolInfoObj = {
    "bcd": passInfo({
        LabelFn: () => Dot("1Xe8x7qe", "BCD")
    }),
    "edc_base64": passInfo({
        LabelFn: () => Dot("gkC8t", "Base64")
    }),
    "edc_base32": passInfo({
        LabelFn: () => Dot("gkqC8t", "Base32")
    }),
    "edc_base45": passInfo({
        LabelFn: () => Dot("gkdqqC8t", "Base45")
    }),
    "edc_base58": passInfo({
        LabelFn: () => Dot("egkqC8t", "Base58")
    }),
    "edc_base62": passInfo({
        LabelFn: () => Dot("egkqCd8t", "Base62")
    }),
    "edc_base85": passInfo({
        LabelFn: () => Dot("e4Cd8t", "Base85")
    }),
    "CSSBeautify": passInfo({
        LabelFn: () => Dot("1Xe8x7", "{0} Beautify", "CSS")
    }),
    "JSONBeautify": passInfo({
        LabelFn: () => Dot("1Xe8x7", "{0} Beautify", "JSON")
    }),
    "JavaScriptBeautify": passInfo({
        LabelFn: () => Dot("1Xe8x7", "{0} Beautify", "JavaScript")
    }),
    "XMLBeautify": passInfo({
        LabelFn: () => Dot("1Xe8x7", "{0} Beautify", "XML")
    }),
    "GenericCodeBeautify": passInfo({
        LabelFn: () => Dot("1Xe8x7", "{0} Beautify", Dot("Vvt09V2Qo", "Generic Code"))
    }),
    "SQLBeautify": passInfo({
        LabelFn: () => Dot("1Xe8x7", "{0} Beautify", "SQL")
    }),
    "md5": passInfo({
        LabelFn: () => "MD5"
    }),
    "md2": passInfo({
        LabelFn: () => "MD2"
    }),
    "md4": passInfo({
        LabelFn: () => "MD4"
    }),
    "md6": passInfo({
        LabelFn: () => "MD6"
    }),
    "JSONMinify": passInfo({
        LabelFn: () => Dot("1Xe82x7", "{0} Minify", "JSON")
    }),
    "XMLMinify": passInfo({
        LabelFn: () => Dot("1Xe82x7", "{0} Minify", "XML")
    }),
    "CSSMinify": passInfo({
        LabelFn: () => Dot("1Xe82x7", "{0} Minify", "CSS")
    }),
    "SQLMinify": passInfo({
        LabelFn: () => Dot("1Xe82x7", "{0} Minify", "SQL")
    }),
    "JavaScriptMinify": passInfo({
        LabelFn: () => Dot("UVvJp-vtF", "{0} Minify", "JavaScript")
    }),
    hex: passInfo({
        LabelFn: () => Dot("1Xe8wx7", "Hex String")
    }),
    SHA0: passInfo({
        LabelFn: () => "SHA-0"
    }),
    SHA1: passInfo({
        LabelFn: () => "SHA-1"
    }),
    SHA2: passInfo({
        LabelFn: () => "SHA-2"
    }),
    SHA3: passInfo({
        LabelFn: () => "SHA-3"
    }),
    Tail: passInfo({
        LabelFn: () => Dot("tail", "Tail")
    }),
    RemoveWhitespace: passInfo({
        LabelFn: () => Dot("remove-whitespace", "Remove Whitespace")
    }),
    RemoveLineNumbers: passInfo({
        LabelFn: () => Dot("1fd8x7dqw", "Remove Line Numbers")
    }),
    Reverse: passInfo({
        LabelFn: () => Dot("reverse.text", "Reverse Text")
    }),
    CSVToJSON: passInfo({
        LabelFn: () => Dot("1X8x7dqw", "CSV to JSON")
    }),
    // Example
    "Example": passInfo({
        LabelFn: () => Dot("1X8x7", "Example")
    }),
} satisfies Record<string, AppInfoType>

_.forEach(appToolInfoObj, (x, d, n) => {
    x.ImportImpl = () => import(`./impl/${d}.tsx`)
    x.ImportFAQ = () => import(`./faq/${d}.tsx`)
    x.ImportCode = () => import(`./code/${d}.tsx`)
})

export type AppToolKeyType = keyof typeof appToolInfoObj; // "a" | "b"

export default appToolInfoObj