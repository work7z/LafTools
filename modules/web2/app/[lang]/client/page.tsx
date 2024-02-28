/* tslint:disable:no-unused-variable */
import _ from "lodash";
import React, { } from "react";
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { PageProps } from '@/app/__CORE__/types/pages'
import Entry from "./entry";
import { Metadata } from "next/types";
import { getAppIcon, getAppKeywords } from "@/app/__CORE__/config/imgconfig";
import { Dot } from "./src/utils/TranslationUtils";
import { CombindSearchProps } from "../page";

export default async function ClientPage(props: CombindSearchProps) {
    let authInfo = await getAuthInfo()
    return (
        <main>
            <Entry />
        </main>
    )
}
export let generateMetadata = async function (): Promise<Metadata> {
    return {
        icons: [
            getAppIcon()
        ],
        title: Dot("QkJ-qwhki", "LafTools with Classical UI Style", 'LafTools'),
        description: Dot("CZ5ZU__AFJF", "This page provide a client UI style for LafTools, a higher level of abstraction for LafTools."),
        keywords: getAppKeywords()
    };
}

