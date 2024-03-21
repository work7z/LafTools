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
import CommonRef, { DotType } from "./common_ref";
import { ToolHandler, ToolHandlerClass } from "./r_handler";
import { FAQItem } from './faq/types'
import _ from "lodash";
import { CodeImplMap } from "./code/types";


export type AppInfoType = {
    LabelFn: (Dot: DotType) => string;
    ImportImpl?: () => Promise<{
        default: ToolHandlerClass
    }>
    ImportFAQ?: () => Promise<{
        default: () => FAQItem[]
    }>
    ImportCode?: () => Promise<{
        default: () => CodeImplMap
    }>
}
let passInfo = (obj: AppInfoType): AppInfoType => {
    return obj;
}
// NOTE: do not add typing for appToolInfoObj, it will be inferred from the object
let appToolInfoObj = {
    "bcd": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7qe", "BCD")
    }),
    "edc_base64": passInfo({
        LabelFn: (Dot: DotType) => Dot("gkC8t", "Base64")
    }),
    "edc_base32": passInfo({
        LabelFn: (Dot: DotType) => Dot("gkqC8t", "Base32")
    }),
    "edc_base45": passInfo({
        LabelFn: (Dot: DotType) => Dot("gkdqqC8t", "Base45")
    }),
    "edc_base58": passInfo({
        LabelFn: (Dot: DotType) => Dot("egkqC8t", "Base58")
    }),
    "edc_base62": passInfo({
        LabelFn: (Dot: DotType) => Dot("egkqCd8t", "Base62")
    }),
    "edc_base85": passInfo({
        LabelFn: (Dot: DotType) => Dot("e4Cd8t", "Base85")
    }),
    "CSSBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "CSS")
    }),
    "JSONBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "JSON")
    }),
    "JavaScriptBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "JavaScript")
    }),
    "XMLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "XML")
    }),
    "YAMLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "YAML"),
    }),
    "GenericCodeBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", Dot("Vvt09V2Qo", "Generic Code"))
    }),
    "SQLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "SQL")
    }),
    "HTMLBeautify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "HTML")
    }),
    "MarkdownBeautify": passInfo({
        // {
        //     parser: "markdown",
        //     plugins: [parserMarkdown],
        // },
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "Markdown")
    }),
    "TypeScriptBeautify": passInfo({
        // ext: {
        //     parser: "typescript",
        //     plugins: [parserTypescript],
        // },
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "TypeScript")
    }),
    // GraphqlBeautify
    "GraphQLBeautify": passInfo({
        // ext: {
        //     parser: "graphql",
        //     plugins: [parserGraphql],
        // },
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "GraphQL")
    }),
    "SCSSBeautify": passInfo({
        // {
        //     parser: "scss"|"less"|"css",
        //     plugins: [parserPostcss],
        // }
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "SCSS")
    }),
    "LessBeautify": passInfo({
        // {
        //     parser: "scss"|"less"|"css",
        //     plugins: [parserPostcss],
        // }
        LabelFn: (Dot: DotType) => Dot("1Xe8x7", "{0} Beautify", "Less")
    }),

    "md5": passInfo({
        LabelFn: (Dot: DotType) => "MD5"
    }),
    "md2": passInfo({
        LabelFn: (Dot: DotType) => "MD2"
    }),
    "md4": passInfo({
        LabelFn: (Dot: DotType) => "MD4"
    }),
    "md6": passInfo({
        LabelFn: (Dot: DotType) => "MD6"
    }),
    "JSONMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "JSON")
    }),
    "XMLMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "XML")
    }),
    "CSSMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "CSS")
    }),
    "SQLMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe82x7", "{0} Minify", "SQL")
    }),
    "JavaScriptMinify": passInfo({
        LabelFn: (Dot: DotType) => Dot("UVvJp-vtF", "{0} Minify", "JavaScript")
    }),
    hex: passInfo({
        LabelFn: (Dot: DotType) => Dot("1Xe8wx7", "Hex String")
    }),
    SHA0: passInfo({
        LabelFn: (Dot: DotType) => "SHA-0"
    }),
    SHA1: passInfo({
        LabelFn: (Dot: DotType) => "SHA-1"
    }),
    SHA2: passInfo({
        LabelFn: (Dot: DotType) => "SHA-2"
    }),
    SHA3: passInfo({
        LabelFn: (Dot: DotType) => "SHA-3"
    }),
    Tail: passInfo({
        LabelFn: (Dot: DotType) => Dot("tail", "Tail")
    }),
    RemoveWhitespace: passInfo({
        LabelFn: (Dot: DotType) => Dot("remove-whitespace", "Remove Whitespace")
    }),
    RemoveLineNumbers: passInfo({
        LabelFn: (Dot: DotType) => Dot("1fd8x7dqw", "Remove Line Numbers")
    }),
    Reverse: passInfo({
        LabelFn: (Dot: DotType) => Dot("reverse.text", "Reverse Text")
    }),
    CSVToJSON: passInfo({
        LabelFn: (Dot: DotType) => Dot("1X8x7dqw", "CSV to JSON")
    }),
    // Example
    "Example": passInfo({
        LabelFn: (Dot: DotType) => Dot("1X8x7", "Example")
    }),
} satisfies Record<string, AppInfoType>

_.forEach(appToolInfoObj, (x, d, n) => {
    x.ImportImpl = () => import(`./impl/${d}.tsx`)
    x.ImportFAQ = () => import(`./faq/${d}.tsx`)
    x.ImportCode = () => import(`./code/${d}.tsx`)
})

export type AppToolKeyType = keyof typeof appToolInfoObj;

// for app operation list
export let AppOperationMap = {
    'CSSBeautify': () => import('./impl/conversion/CSSBeautify.tsx'),
    'CSSMinify': () => import('./impl/conversion/CSSMinify.tsx'),
    'CSVToJSON': () => import('./impl/conversion/CSVToJSON.tsx'),
    'FromBase32': () => import('./impl/conversion/FromBase32.tsx'),
    'FromBase45': () => import('./impl/conversion/FromBase45.tsx'),
    'FromBase58': () => import('./impl/conversion/FromBase58.tsx'),
    'FromBase62': () => import('./impl/conversion/FromBase62.tsx'),
    'FromBase64': () => import('./impl/conversion/FromBase64.tsx'),
    'FromBase85': () => import('./impl/conversion/FromBase85.tsx'),
    'FromBCD': () => import('./impl/conversion/FromBCD.tsx'),
    'FromHex': () => import('./impl/conversion/FromHex.tsx'),
    'GenericCodeBeautify': () => import('./impl/conversion/GenericCodeBeautify.tsx'),
    'HTMLBeautify': () => import('./impl/conversion/HTMLBeautify.tsx'),
    'JavaScriptBeautify': () => import('./impl/conversion/JavaScriptBeautify.tsx'),
    'JavaScriptMinify': () => import('./impl/conversion/JavaScriptMinify.tsx'),
    'JSONBeautify': () => import('./impl/conversion/JSONBeautify.tsx'),
    'JSONMinify': () => import('./impl/conversion/JSONMinify.tsx'),
    'MD2': () => import('./impl/conversion/MD2.tsx'),
    'MD4': () => import('./impl/conversion/MD4.tsx'),
    'MD5': () => import('./impl/conversion/MD5.tsx'),
    'MD6': () => import('./impl/conversion/MD6.tsx'),
    'RemoveLineNumbers': () => import('./impl/conversion/RemoveLineNumbers.tsx'),
    'RemoveWhitespace': () => import('./impl/conversion/RemoveWhitespace.tsx'),
    'Reverse': () => import('./impl/conversion/Reverse.tsx'),
    'SHA0': () => import('./impl/conversion/SHA0.tsx'),
    'SHA1': () => import('./impl/conversion/SHA1.tsx'),
    'SHA2': () => import('./impl/conversion/SHA2.tsx'),
    'SHA3': () => import('./impl/conversion/SHA3.tsx'),
    'SQLBeautify': () => import('./impl/conversion/SQLBeautify.tsx'),
    'SQLMinify': () => import('./impl/conversion/SQLMinify.tsx'),
    'Tail': () => import('./impl/conversion/Tail.tsx'),
    'ToBase32': () => import('./impl/conversion/ToBase32.tsx'),
    'ToBase45': () => import('./impl/conversion/ToBase45.tsx'),
    'ToBase58': () => import('./impl/conversion/ToBase58.tsx'),
    'ToBase62': () => import('./impl/conversion/ToBase62.tsx'),
    'ToBase64': () => import('./impl/conversion/ToBase64.tsx'),
    'ToBase85': () => import('./impl/conversion/ToBase85.tsx'),
    'ToBCD': () => import('./impl/conversion/ToBCD.tsx'),
    'ToHex': () => import('./impl/conversion/ToHex.tsx'),
    'XMLBeautify': () => import('./impl/conversion/XMLBeautify.tsx'),
    'XMLMinify': () => import('./impl/conversion/XMLMinify.tsx'),
    'YAMLBeautify': () => import('./impl/conversion/YAMLBeautify.tsx'),

}

export type AppOpMapKeyType = keyof typeof AppOperationMap;



export default appToolInfoObj

