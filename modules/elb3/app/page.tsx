import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebsiteName } from "./__CORE__/common/config";
import { TopNav } from "./__CORE__/containers/TopNav";
import CenterPart from "./__CORE__/containers/CenterPart";
import CardPanel from './__CORE__/components/CardPanel'
import NodeHorizontalBar from "./__CORE__/containers/TabGroupHorizontalBar";
import _, { random } from "lodash";
import UserPanel from "./__CORE__/containers/UserSideBar";
import { useParams, useSearchParams } from "next/navigation";
import InnerHome from './home'
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { PageProps } from './__CORE__/types/pages'
import getAuthInfo, { AuthInfo } from "./__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";

type SearchParamType = Partial<{
    tabs: string
}>

export type AuthInfoProps = {} & { authInfo: AuthInfo }
export type CombindSearchProps = PageProps<{}, SearchParamType>

export default async function Home(props: { searchParams: SearchParamType }) {
    let { searchParams } = props
    let combindSearchProps: CombindSearchProps = {
        params: {},
        searchParams,
    }
    return <InnerHome combindSearchProps={combindSearchProps}></InnerHome>
}


export async function generateMetadata(
    Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: getWebsiteName(),
    };
}

