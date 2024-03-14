'use server'

import { LabelHrefType } from "@/app/[lang]/[category]/navigator"
import { getAppIcon, getAppKeywords } from "@/app/__CORE__/config/imgconfig"
import { Dot } from "@/app/__CORE__/utils/TranslationUtils"
import { fmtURL_Server } from "@/app/__CORE__/utils/routeUtils"
import { Metadata } from "next"

export type PortalDefinitionTbabGroup = {
    id: string,
    label: string
}
export type SEOMetaData = {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[]
}
export type PortalDefinitionType = SEOMetaData & {
    label: string,
    id: string,
    subTabs?: PortalDefinitionTbabGroup[]
}
export let getToolSubCategory = (): PortalDefinitionType[] => {
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
            id: 'formatters',
            subTabs: [
                {
                    id: "jsonformatter",
                    label: Dot("pkprvdA2O", "JSON Formatter"),
                },
                {
                    id: 'javascriptformatter',
                    label: Dot("2Y2Y2qY2", "JavaScript Formatter"),
                },
                {
                    id: "xmlformatter",
                    label: Dot("v2YyGqwy2Yh", "XML Formatter"),
                },
                {
                    id: 'yamlformatter',
                    label: Dot("h2Y2Y2Yeq2Y", "YAML Formatter"),
                },
                {
                    id: 'cssformatter',
                    label: Dot("2Yd2Y2Y2Y2", "CSS Formatter"),
                },
                {
                    id: 'htmlformatter',
                    label: Dot("2Y2eqY2Y2Y2", "HTML Formatter"),
                },
                {
                    id: 'sqlformatter',
                    label: Dot("2Y2Y2eqY2Y2", "SQL Formatter"),
                }
            ]
        },
        {
            label: Dot("str.codecs", "Codecs"),
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
                    label: Dot("2Y2Y2Y2Y2", "Base64"),
                },
                {
                    id: "urlencoder",
                    label: Dot("mdhWk4dtid", "URL Encoder"),
                },
                {
                    id: "md5",
                    label: Dot("eTJ2EDLfW", "MD5 Hash"),
                },
                {
                    id: "sha1",
                    label: Dot("8RYY_Y4sb", "SHA1 Hash"),
                },
                {
                    id: "sha256",
                    label: Dot("HAdpbfboS", "SHA256 Hash"),
                },
                {
                    id: "sha512",
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
            id: 'encoding',
            subTabs: [
                {
                    id: "urlencoder",
                    label: Dot("mhWk4dtqid", "URL Encoder"),
                },
                {
                    id: 'base64',
                    label: Dot("2Y2Y2Yd2Y2", "Base64"),
                },
                {
                    id: 'escape',
                    label: Dot("2Y2Y2qY2Y2", "Escape"),
                },
                {
                    id: 'unescape',
                    label: Dot("2Y2Y2wY2Y2", "Unescape"),
                },
                {
                    id: 'encodeuri',
                    label: Dot("2Y2eY2Y2Y2", "Encode URI"),
                },
                {
                    id: 'decodeuri',
                    label: Dot("2Y2Ye2Y2Y2", "Decode URI"),
                },
            ]
        },
        {
            label: Dot("str.converters", "Converters"),
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
    return toolsPortalDefinitions;
}
export type TopMainCategoryNavList = SEOMetaData & LabelHrefType
export let getCategoryList = (): TopMainCategoryNavList[] => {
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
}
// TODO: update the /v2 to actual path
export let fn_rightNav = (): LabelHrefType[] => {
    let rightNav: LabelHrefType[] = [
        {
            label: Dot("str.login", "Login"),
            href: 'https://my.laftools.dev/v2/zh-hans/nav/form/sign-in'
        },
        {
            label: Dot("str.register", "Register"),
            href: 'https://my.laftools.dev/v2/zh-hans/nav/form/sign-up'
        },
        {
            label: Dot("str.usercentre", "User Centre"),
            href: 'https://my.laftools.dev'
        },
    ]
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

