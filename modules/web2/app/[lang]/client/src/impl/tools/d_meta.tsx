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
import Operation from "../core/Operation.tsx";
import { AppOpFnMapTypeKeys } from "./g_optlist.tsx";
import { satisfies } from "semver";


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

// NOTE: key is the language type or just a prefered id
// let us say we can show related tools for a given tool based on its lang type or prefered id
export const AppToolConversionIdCollectionSet = {
    json: ['JSONBeautify', 'JSONMinify', 'CSVToJSON'],
    javascript: ['JavaScriptBeautify', 'JavaScriptMinify'],
    css: ['CSSBeautify', 'CSSMinify'],
    sql: ['SQLBeautify', 'SQLMinify'],
    bcd: ['ToBCD', 'FromBCD'],
    hex: ['ToHex', 'FromHex'],
    text: ['RemoveWhitespace', 'Tail', 'Reverse', 'RemoveLineNumbers'],
    beautify: ['JSONBeautify', 'JavaScriptBeautify', 'CSSBeautify', 'XMLBeautify', 'YAMLBeautify', 'SQLBeautify', 'HTMLBeautify'],
    xml: ['XMLBeautify', 'XMLMinify'],
    yaml: ['YAMLBeautify'],
    // typescript: ['TypeScriptBeautify', 'JavaScriptBeautify', 'JavaScriptMinify'],
    base32: ['FromBase32', 'ToBase32', 'MD5'],
    base64: ['FromBase64', 'ToBase64', 'MD5'],
    base45: ['FromBase45', 'ToBase45', 'MD5'],
    base58: ['FromBase58', 'ToBase58', 'MD5'],
    base62: ['FromBase62', 'ToBase62', 'MD5'],
    base85: ['FromBase85', 'ToBase85', 'MD5'],
    md5: ['MD2', 'MD4', 'MD6', 'SHA3', 'MD5'],
    sha: ['SHA0', 'SHA1', 'SHA2', 'SHA3', 'MD5'],
    nothing: [],
} satisfies { [key: string]: AppOpFnMapTypeKeys[] }

// using infer to get the type of the keys for AppToolConversionIdCollectionSet
export type AppToolConversionIdCollectionSetType = keyof typeof AppToolConversionIdCollectionSet

export type AppToolKeyType = keyof typeof appToolInfoObj;

export type AppOpDetail = {
    optName: string
    optDescription: string
}

export type AppOpFnMapType = { [key: string]: (p: { Dot: DotType }) => AppOpDetail }

export const TOOL_CONVER_FILENAME_TO_ID_MAP: { [key: string]: string } = {}

export let loadConversionTSXById = async (id: string): Promise<Operation> => {
    let a = await import(`./impl/conversion/${id}.tsx`)
    let o: Operation = new a['default']()
    TOOL_CONVER_FILENAME_TO_ID_MAP[id] = o.getOptDetail().id
    return o
}





export default appToolInfoObj

