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

import { get } from "lodash"
import { getI18nDynamically } from "./i18n-action"
import { useEffect, useState } from "react"
import { getLocalePrefix_Client } from "./cRouteUtils"
import TranslationUtils, { Dot } from "./cTranslationUtils"
import { useInitFunctionOnceOnly } from "../hooks/cache"

export type ShareClienti18nKeys = {
    smsCode: string,
    other: string,
}

export let loadDOT = (str: string): () => ReturnType<typeof useTTT2> => {
    return () => useTTT2(str);
}

export let useTTT2 = function (ltID: string): (id: string, enText: string, ...args: any[]) => string {
    let crtLabelI18n = getLocalePrefix_Client().langIni18n
    // let [mapData, onMapData] = useState({})
    let [ctn, onCtn] = useState(0)
    useInitFunctionOnceOnly(() => {
        fetch(`/static/lang/extra/${ltID}/${crtLabelI18n}.json?t=${Date.now()}`).then((v) => v.json()).then((v) => {
            // window['ok2'] = v;
            if (!TranslationUtils.LangMap[crtLabelI18n]) {
                TranslationUtils.LangMap[crtLabelI18n] = {}
            }
            TranslationUtils.LangMap[crtLabelI18n] = {
                ...TranslationUtils.LangMap[crtLabelI18n],
                ...v
            }
            onCtn(ctn + 1)
        })
    }, [ltID, crtLabelI18n])
    return Dot
    // return (id: string, text: string, args: string[]) => {
    //     return text;
    // }
}

export let useTTT = function (obj: Partial<ShareClienti18nKeys>): Partial<ShareClienti18nKeys>[] {
    let [val, onVal] = useState<Partial<ShareClienti18nKeys> | null>(obj)
    useEffect(() => {
        (async () => {
            let v = await getI18nDynamically(obj)
            onVal(v as Partial<ShareClienti18nKeys>)
        })()
    }, [])

    return [val as Partial<ShareClienti18nKeys>]
}