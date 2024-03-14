'use server'

import { LabelHrefType } from "@/app/[lang]/navigator"
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
            id: '/encoding',
            subTabs: [
                {
                    id: "urlencoder",
                    label: Dot("mhWk4dtqid", "URL Encoder"),
                },
                {
                    id: 'base64',
                    label: Dot("2Y2Y2Y2Y2", "Base64"),
                },
                {
                    id: 'escape',
                    label: Dot("2Y2Y2Y2Y2", "Escape"),
                },
                {
                    id: 'unescape',
                    label: Dot("2Y2Y2Y2Y2", "Unescape"),
                },
                {
                    id: 'encodeuri',
                    label: Dot("2Y2Y2Y2Y2", "Encode URI"),
                },
                {
                    id: 'decodeuri',
                    label: Dot("2Y2Y2Y2Y2", "Decode URI"),
                },
            ]
        },
        {
            label: Dot("str.converters", "Converters"),
            id: '/converters',
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
            id: '/parsers',
            subTabs: [
                {
                    id: 'sqlparser',
                    label: Dot("2Yq2eqY2Y2", "SQL Parser"),
                },
            ]
        },
        {
            label: Dot("IEFy5k39X", "Generators"),
            id: '/generator',
            subTabs: [
                {
                    id: 'uuid',
                    label: Dot("qwe", "UUID Generator"),
                },
                {
                    id: 'guid',
                    label: Dot("eeqw", "GUID Generator"),
                },
                {
                    id: 'random',
                    label: Dot("eqw", "Random Generator"),
                },
            ]
        },
    ].map(x => {
        return x
    })
    return toolsPortalDefinitions;
}
