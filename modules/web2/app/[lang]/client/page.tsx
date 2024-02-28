/* tslint:disable:no-unused-variable */
import _ from "lodash";
import React, { } from "react";
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { PageProps } from '@/app/__CORE__/types/pages'
import Entry from "./client";
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
        title: Dot("QkJ-TOduip6z_", "LafTools IDE"),
        description: Dot("8OqB7hN1s", "This page provides an IDE UI style for LafTools, a higher level of abstraction for LafTools."),
        keywords: [
            Dot("s-fxP80Dd", "LafTools IDE"),
            Dot("FLsbFsOZq", "IDE"),
            ...getAppKeywords(),
        ]
    };
}

