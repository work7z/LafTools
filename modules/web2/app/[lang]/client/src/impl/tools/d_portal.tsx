// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 14 Mar 2024
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

import { LabelHrefType } from "@/app/[lang]/[category]/src/parts"
import { getAppIcon, getAppKeywords } from "@/app/__CORE__/config/imgconfig"
import { Dot } from "@/app/__CORE__/utils/TranslationUtils"
import { fmtURL_Server } from "@/app/__CORE__/utils/routeUtils"
import { Metadata } from "next"
import { cache } from "react"
import appToolInfoObj, { AppToolKeyType } from "./d_meta"
import COMMON_FN_REF from "./common_ref"

COMMON_FN_REF.Dot = Dot

export type PortalDefinitionTbabGroup = {
    id: string, // sub tab id, will be used in the URL as path variable (:id)
    toolId?: AppToolKeyType, // it's coming from d_meta
    label?: string // overwrite the label from tool definition if needed
}
export type SEOMetaData = {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[]
}
export type PortalDefinitionType = SEOMetaData & {
    label: string,
    longLabel: string,
    id: string,
    subTabs?: PortalDefinitionTbabGroup[]
}
export let getToolSubCategory = ((): PortalDefinitionType[] => {
    let toolsPortalDefinitions: PortalDefinitionType[] = [
        {
            seoTitle: Dot("format.code.seo", "Format {0} Code", 'JSON/JS/YAML/CSS/C#/SQL'),
            seoKeywords: [
                Dot("formatjavascript", "Format JavaScript"),
                Dot("formatjson", "Format JSON"),
                Dot("formatyaml", "Format YAML"),
                Dot("formatcss", "Format CSS"),
                Dot("formatcsharp", "Format YAML"),
                "preittier",
                "formatter",
                "lint"
            ],
            seoDescription: Dot("seo.description.format", "Efficiently format your code online with our free tool. Supports multiple languages including JSON, JS, YAML, CSS, C#, and SQL. Improve readability and maintain a consistent coding style across your project."),
            label: Dot("str.formatter", "Formatters"),
            longLabel: Dot("str.formatters.long", "Quick Code Formatters"),
            id: 'formatters',
            subTabs: [
                {
                    id: "jsonformatter",
                    toolId: "JSONBeautify",
                    label: Dot("pkprvdA2O", "JSON Formatter"),
                },
                {
                    id: 'javascriptformatter',
                    toolId: 'JavaScriptBeautify',
                    label: Dot("2Y2Y2qY2", "JavaScript Formatter"),
                },
                {
                    id: 'htmlformatter',
                    toolId: 'HTMLBeautify',
                    label: Dot("2Y2eqY2Y2Y2", "HTML Formatter"),
                },
                {
                    id: "xmlformatter",
                    toolId: 'XMLBeautify',
                    label: Dot("v2YyGqwy2Yh", "XML Formatter"),
                },
                {
                    id: 'yamlformatter',
                    toolId: 'YAMLBeautify',
                    label: Dot("h2Y2Y2Yeq2Y", "YAML Formatter"),
                },
                {
                    id: 'cssformatter',
                    toolId: 'CSSBeautify',
                    label: Dot("2Yd2Y2Y2Y2", "CSS Formatter"),
                },
                {
                    id: 'sqlformatter',
                    toolId: "SQLBeautify",
                    label: Dot("2Y2Y2eqY2Y2", "SQL Formatter"),
                },
                // do same for JSONMinify, JavaScriptMinify, HTMLMinify, XMLMinify, YAMLMinify, CSSMinify, SQLMinify, remember to add affix to the id of Dot
                {
                    id: "jsonminify",
                    toolId: "JSONMinify",
                    label: Dot("pkprdvdA2O", "JSON Minifier"),
                },
                {
                    id: "xmlminify",
                    toolId: 'XMLMinify',
                    label: Dot("v2wy2Yh", "XML Minifier"),
                },
                {
                    id: 'javascriptminify',
                    toolId: 'JavaScriptMinify',
                    label: Dot("2Y2Y2qdqY2", "JavaScript Minifier"),
                },
                {
                    id: 'htmlminify',
                    // toolId: 'HTMLMinify',
                    label: Dot("2Y2eq2", "HTML Minifier"),
                },
                {
                    id: 'yamlminify',
                    // toolId: 'YAMLMinify',
                    label: Dot("h2Y2Y2Yeqdqw2Y", "YAML Minifier"),
                },
                {
                    id: 'cssminify',
                    toolId: 'CSSMinify',
                    label: Dot("2Ye2Y2Y2", "CSS Minifier"),
                },
                {
                    id: 'sqlminify',
                    toolId: "SQLMinify",
                    label: Dot("2Y2YY2", "SQL Minifier"),
                },
                // do same for MarkdownBeautify, TypeScriptBeautify, GraphQLBeautify, SCSSBeautify, LessBeautify
                {
                    id: 'markdownformatter',
                    toolId: "MarkdownBeautify",
                    label: Dot("2Y2Y2qYd2Y2", "Markdown Formatter"),
                },
                {
                    id: 'typescriptformatter',
                    toolId: "TypeScriptBeautify",
                    label: Dot("2Y2Y2qqY2Y2", "TypeScript Formatter"),
                },
                {
                    id: 'graphqlformatter',
                    toolId: "GraphQLBeautify",
                    label: Dot("2Ye2dqeY2qY2Y2", "GraphQL Formatter"),
                },
                {
                    id: 'scssformatter',
                    toolId: "SCSSBeautify",
                    label: Dot("2Y2Y2eeeqY2Y2", "{0} Formatter", "SCSS"),
                },
                {
                    id: 'lessformatter',
                    toolId: "LessBeautify",
                    label: Dot("2Ye2Yqw2qY2Y2", "{0} Formatter", "Less"),
                },
            ]
        },
        {
            label: Dot("str.codecs", "Codecs"),
            longLabel: Dot("str.codecs.long", "Encryption and Decryption Tools"),
            id: 'codecs',
            seoTitle: Dot("codecs.seo", "Online Codecs - Base64, URL Encoder, MD5, SHA1, SHA256, SHA512"),
            seoKeywords: [
                "base64",
                "url encoder",
                "md5",
                "sha1",
                "sha256",
                "sha512",
                "online codecs",
                "free codecs",
                "secure codecs"
            ],
            seoDescription: Dot("seo.description.codecs", "Use our free online codecs to encode and decode your data. Supports Base64, URL Encoder, MD5, SHA1, SHA256, SHA512."),
            subTabs: [
                {
                    id: 'base64',
                    toolId: 'edc_base64',
                    label: Dot("2Y2Y2Y2Y2", "Base64"),
                },
                {
                    id: "urlencoder",
                    // toolId: "edc_urlencoder",
                    label: Dot("mdhWk4dtid", "URL Encoder"),
                },
                {
                    id: "md5",
                    toolId: "md5",
                    label: Dot("eTJ2EDLfW", "MD5 Hash"),
                },
                {
                    id: "sha1",
                    toolId: "SHA1",
                    label: Dot("8RYY_Y4sb", "SHA1 Hash"),
                },
                {
                    id: "sha256",
                    toolId: "SHA2", // provide extra configuration
                    label: Dot("HAdpbfboS", "SHA256 Hash"),
                },
                {
                    id: "sha512",
                    toolId: "SHA3",
                    // toolId: 'sha3'
                    label: Dot("fyA5IVtOU", "SHA512 Hash"),
                },
            ]
        },
        {
            seoTitle: Dot("encoding.seo", "Online Encoding Tools - URL Encoder, Base64, Escape, Unescape, Encode URI, Decode URI"),
            seoKeywords: [
                "url encoder",
                "base64",
                "escape",
                "unescape",
                "encode uri",
                "decode uri",
                "online encoding",
                "free encoding",
                "secure encoding"
            ],
            seoDescription: Dot("seo.description.encoding", "Use our free online encoding tools to encode and decode your data. Supports URL Encoder, Base64, Escape, Unescape, Encode URI, Decode URI."),
            label: Dot("mhWk4ddtid", "Encoding"),
            longLabel: Dot("mhWk4ddtid.long", "Encoding and Decoding Tools"),
            id: 'encoding',
            subTabs: [
                {
                    id: 'base64',
                    toolId: 'edc_base64',
                    label: Dot("2Y2Y2Yd2Y2", "Base64"),
                },
                {
                    id: 'escape',
                    // toolId: 'escape',
                    label: Dot("2Y2Y2qY2Y2", "Escape"),
                },
                {
                    id: 'unescape',
                    // toolId: 'unescape',
                    label: Dot("2Y2Y2wY2Y2", "Unescape"),
                },
                {
                    id: 'encodeuri',
                    // toolId: 'encodeuri',
                    label: Dot("2Y2eY2Y2Y2", "Encode URI"),
                },
                {
                    id: 'decodeuri',
                    // toolId: 'decodeuri',
                    label: Dot("2Y2Ye2Y2Y2", "Decode URI"),
                },
                {
                    id: "urlencoder",
                    // toolId: "urlencoder",
                    label: Dot("mhWk4dtqid", "URL Encoder"),
                },
                {
                    id: 'base32',
                    toolId: 'edc_base32',
                },
                {
                    id: 'base45',
                    toolId: 'edc_base45',
                },
                {
                    id: 'base58',
                    toolId: 'edc_base58',
                },
                {
                    id: 'base62',
                    toolId: 'edc_base62',
                },
                {
                    id: 'base85',
                    toolId: 'edc_base85',
                },

            ]
        },
        {
            label: Dot("str.converters", "Converters"),
            longLabel: Dot("HxTXHD3lc", "Convert Data Between Different Formats"),
            seoTitle: Dot("converters.seo", "Online Data Converters - JSON to XML, JSON to CSV, JSON to YAML, XML to JSON, YAML to JSON"),
            seoKeywords: [
                "json to xml",
                "json to csv",
                "json to yaml",
                "xml to json",
                "yaml to json",
                "online converters",
                "free converters",
                "secure converters"
            ],
            seoDescription: Dot("seo.description.converters", "Use our free online converters to convert your data between different formats. Supports JSON to XML, JSON to CSV, JSON to YAML, XML to JSON, YAML to JSON."),
            id: 'converters',
            subTabs: [
                {
                    id: 'json2xml',
                    label: Dot("json2xml.t", "JSON to XML")
                },
                {
                    id: 'json2csv',
                    label: Dot("json2csv.t", "JSON to CSV")
                },
                {
                    id: 'json2yaml',
                    label: Dot("json2yaml.t", "JSON to YAML")
                },
                {
                    id: 'xml2json',
                    label: Dot("xml2json.t", "XML to JSON")
                },
                {
                    id: 'yaml2json',
                    label: Dot("yaml2json.t", "YAML to JSON")
                },
            ]
        },
        {
            label: Dot("str.parsers", "Parsers"),
            longLabel: Dot("str.parsers.long", "Parse and Analyze Common Data Formats"),
            id: 'parsers',
            seoTitle: Dot("parsers.seo", "Online SQL Parser"),
            seoKeywords: [
                "sql parser",
                "online sql parser",
                "free sql parser",
                "secure sql parser"
            ],
            seoDescription: Dot("seo.description.parsers", "Use our free online SQL parser to parse your SQL queries and improve your database performance."),
            subTabs: [
                {
                    id: 'sqlparser',
                    label: Dot("2Yq2eqY2Y2", "SQL Parser"),
                },
            ]
        },
        {
            seoTitle: Dot("generators.seo", "Online Generators - UUID Generator, GUID Generator, Random Generator"),
            seoKeywords: [
                "uuid generator",
                "guid generator",
                "random generator",
                "online generators",
                "free generators",
                "secure generators"
            ],
            seoDescription: Dot("seo.description.generators", "Use our free online generators to generate UUIDs, GUIDs, and random values for your applications."),
            label: Dot("IEFy5k39X", "Generators"),
            longLabel: Dot("IEFy5k39X.long", "Generate Code, UUIDs, GUIDs, and Random Values"),
            id: 'generator',
            subTabs: [
                {
                    id: 'uuid',
                    label: Dot("qwwqee", "UUID Generator"),
                },
                {
                    id: 'guid',
                    label: Dot("qeeqw", "GUID Generator"),
                },
                {
                    id: 'random',
                    label: Dot("eqwwew", "Random Generator"),
                },
            ]
        },
    ]
    toolsPortalDefinitions.forEach(x => {
        x.subTabs = (x.subTabs || []).map(x => {
            if (!x.label && x.toolId) {
                let obj = appToolInfoObj[x.toolId]
                if (obj) {
                    x.label = obj.LabelFn(Dot)
                }
            }
            return x;
        })
    })
    return toolsPortalDefinitions;
})
export type TopMainCategoryNavList = SEOMetaData & LabelHrefType
export let getCategoryList = ((): TopMainCategoryNavList[] => {
    let leftNav: TopMainCategoryNavList[] = [
        {
            label: Dot("G2dvTUljF", "Tools"),
            id: 'tools'
        },
        {
            label: Dot("n28g4di0L", "Manuals"),
            id: 'manuals'
        },
        {
            label: Dot("AvsWiJHLZ", "Resources"),
            id: 'resources',
        },
        {
            label: Dot("ymyfghy1r", "Notes"),
            id: ('notes')
        },
        {
            label: Dot("bWQunyU10", "AI Laboratory"),
            id: ('ai-lab')
        },
    ]

    return leftNav
})

export let fn_rightNav = (): LabelHrefType[] => {
    let rightNav: LabelHrefType[] = [
        {
            label: Dot("str.login", "Login"),
            href: 'https://my.laftools.cn/v2/zh-hans/nav/form/sign-in'
        },
        {
            label: Dot("str.register", "Register"),
            href: 'https://my.laftools.cn/v2/zh-hans/nav/form/sign-up'
        },
        {
            label: Dot("str.usercentre", "User Centre"),
            href: 'https://my.laftools.cn'
        },
    ].map(x => {
        x.href = 'https://codegen.cc'
        return x
    })
    return rightNav
}

export let getSubCategoryList = (): PortalDefinitionType[] => {
    let leftCategoryArr: PortalDefinitionType[] = getToolSubCategory()
    return leftCategoryArr;
}
export let fn_rightCategoryArr = () => {
    let rightCategoryArr: LabelHrefType[] = [
        {
            label: Dot("download-local", "Free Download"),
            href: '/v2/'
        },
        {
            label: Dot("str.remarks", "Favorites"),
            href: fmtURL_Server(['/']),
        },
        {
            label: Dot("str.mostused", "Frequently-Used"),
            href: fmtURL_Server(['/']),
        }
    ]
    return rightCategoryArr
}

