// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 25 Feb 2024
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

/* tslint:disable:no-unused-variable */
import _ from "lodash";
import React, { } from "react";
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { PageProps } from '@/app/__CORE__/types/pages'
// import Entry from "./client";
import { Metadata } from "next/types";
import { getAppIcon, getAppKeywords } from "@/app/__CORE__/config/imgconfig";
// import {  } from "./src/utils/TranslationUtils";
import { CombindSearchProps } from "../page";
import dynamic from "next/dynamic";
import { fmtURL_Server } from "@/app/__CORE__/utils/routeUtils";
import { Dot, getXLocaleStrInRSC } from "@/app/__CORE__/utils/TranslationUtils";
import { isDevEnv } from "@/app/__CORE__/hooks/env";
import PassClientValue from './pass'
import PageLoadingEffect from "@/app/__CORE__/containers/PageLoadingEffect";
const EntryWrapper = dynamic(() => import('./client'), { ssr: false, loading: () => <PageLoadingEffect /> })

let cachedLangMap: { [key: string]: string } = {}
let getCachedValueIfNot = (key: string, fn: () => string) => {
    if (cachedLangMap[key] && !isDevEnv()) {
        return cachedLangMap[key]
    }
    cachedLangMap[key] = fn()
    return cachedLangMap[key]
}

export default async function ClientPage(props: CombindSearchProps) {
    return (
        <main>
            <EntryWrapper />
        </main>
    )
}
export let generateMetadata = async function (): Promise<Metadata> {
    let title = Dot("QkJ-TOduip6z_", "LafTools IDE")
    return {
        icons: [
            getAppIcon()
        ],
        title: title,
        description: Dot("8OqB7hN1s", "This page provides an IDE UI style for LafTools, a higher level of abstraction for LafTools."),
        keywords: [
            Dot("s-fxP80Dd", "LafTools IDE"),
            Dot("FLsbFsOZq", "IDE"),
            ...getAppKeywords(),
        ]
    };
}

