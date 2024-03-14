import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebsiteName } from "@/app/__CORE__/common/config";
import { TopNav } from "@/app/__CORE__/containers/TopNav";
import CenterPart from "@/app/__CORE__/containers/CenterPart";
import CardPanel from '@/app/__CORE__/components/CardPanel'
import NodeHorizontalBar from "@/app/__CORE__/containers/TabGroupHorizontalBar";
import _, { random } from "lodash";
import { notFound, useParams, useSearchParams } from "next/navigation";
import InnerHome from '../../../home'
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { PageProps } from '@/app/__CORE__/types/pages'
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { Dot } from "../../../__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";
import ToolPart from '@/app/[lang]/portal/src/tools'
import { getAppIcon, getAppKeywords } from "../../../__CORE__/config/imgconfig";
import Tools, { generateMetadata as toolMetaDataFn } from '@/app/[lang]/page'


export type AuthInfoProps = { authInfo: AuthInfo }
export type CombindSearchProps = PageProps<any, any>

export default async function Home(props: CombindSearchProps) {
    let authInfo = await getAuthInfo()
    notFound()
    return (
        <main>
            <div>{Dot("Abi2k2cP7", "Sorry, this page is not yet finished so far.")}</div>
        </main>
    )
}


export let generateMetadata = async function (props): Promise<Metadata> {
    return {
        ...toolMetaDataFn(props as any),
        title: Dot("N9bCERU1Q", "Internal Operation Page for LafTools"),
        keywords: [],
    };
}

