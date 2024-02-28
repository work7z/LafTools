/* tslint:disable:no-unused-variable */
import _ from "lodash";
import React, { } from "react";
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { PageProps } from '@/app/__CORE__/types/pages'
import { CombindSearchProps } from "../page";
import Entry from "./entry";

export default async function ClientPage(props: CombindSearchProps) {
    let authInfo = await getAuthInfo()
    return (
        <main>
            <Entry></Entry>
        </main>
    )
}
