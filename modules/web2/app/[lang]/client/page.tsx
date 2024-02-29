/* tslint:disable:no-unused-variable */
import _ from "lodash";
import React, { } from "react";
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { PageProps } from '@/app/__CORE__/types/pages'
// import Entry from "./client";
import { Metadata } from "next/types";
import { getAppIcon, getAppKeywords } from "@/app/__CORE__/config/imgconfig";
import { Dot } from "./src/utils/TranslationUtils";
import { CombindSearchProps } from "../page";
import dynamic from "next/dynamic";
import { fmtURL_Server } from "@/app/__CORE__/utils/routeUtils";
import { getXLocaleStrInRSC } from "@/app/__CORE__/utils/TranslationUtils";
import { isDevEnv } from "@/app/__CORE__/hooks/env";

const EntryWrapper = dynamic(() => import('./client'), { ssr: false })

let cachedLangMap: { [key: string]: string } = {}
let getCachedValueIfNot = (key: string, fn: () => string) => {
    if (cachedLangMap[key] && !isDevEnv()) {
        return cachedLangMap[key]
    }
    cachedLangMap[key] = fn()
    return cachedLangMap[key]
}

export default async function ClientPage(props: CombindSearchProps) {
    let xlocale = getXLocaleStrInRSC()
    let xlocaleJSON = getCachedValueIfNot("langval-" + xlocale.langIni18n, () => {
        return JSON.stringify(require("../../../public/static/lang2client/" + xlocale.langIni18n + ".json"))
    })
    return (
        <main>
            <EntryWrapper />
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.__LANG2CLIENT__ = ${(JSON.stringify(xlocaleJSON))}`
                }}></script>
        </main>
    )
}
export let generateMetadata = async function (): Promise<Metadata> {
    return {
        icons: [
            getAppIcon()
        ],
        title: Dot("QkJ-TOduip6z_", "LafTools IDE"),
        description: Dot("8OqB7hN1s", "This page provides an IDE UI style for LafTools, a higher level of abstraction for LafTools."),
        keywords: [
            Dot("s-fxP80Dd", "LafTools IDE"),
            Dot("FLsbFsOZq", "IDE"),
            ...getAppKeywords(),
        ]
    };
}

