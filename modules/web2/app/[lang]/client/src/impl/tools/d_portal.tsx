'use server'

import { LabelHrefType } from "@/app/[lang]/tools/navigator"
import { Dot } from "@/app/__CORE__/utils/TranslationUtils"
import { fmtURL_Server } from "@/app/__CORE__/utils/routeUtils"

export type PortalDefinitionTbabGroup = {
    id: string,
    label: string
}
export type PortalDefinitionType = {
    label: string,
    id: string,
    subTabs?: PortalDefinitionTbabGroup[]

}
export let getToolsPortalDefinitions = (): PortalDefinitionType[] => {
    let toolsPortalDefinitions: PortalDefinitionType[] = [
        {
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
            subTabs: [
                {
                    id: 'sqlparser',
                    label: Dot("2Yq2eqY2Y2", "SQL Parser"),
                },
            ]
        },
        {
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
    ].map(x => {
        return x
    })
    return toolsPortalDefinitions;
}

export let fn_leftNav = (): LabelHrefType[] => {
    let leftNav: LabelHrefType[] = [
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

export let fn_leftCategoryArr = (): PortalDefinitionType[] => {
    let leftCategoryArr: PortalDefinitionType[] = getToolsPortalDefinitions()
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