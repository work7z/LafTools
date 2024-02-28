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
import { useParams, useSearchParams } from "next/navigation";
import InnerHome from '../home'
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { PageProps } from '@/app/__CORE__/types/pages'
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { Dot } from "../__CORE__/utils/TranslationUtils";
import Link from "next/link";
import NavigatorPage from "./navigator";
import { NextUIProvider } from "@nextui-org/react";
import ToolPart from '@/app/[lang]/portal/src/tools'
import { getAppIcon, getAppKeywords } from "../__CORE__/config/imgconfig";


export type AuthInfoProps = { authInfo: AuthInfo }
export type CombindSearchProps = PageProps<any, any>

export let sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function Home(props: CombindSearchProps) {
    let authInfo = await getAuthInfo()
    // await sleep(3000)   
    return (
        <main>
            <NavigatorPage children={<ToolPart></ToolPart>}></NavigatorPage>
        </main>
    )
}


export let rootMetaDataFn = async function (): Promise<Metadata> {
    return {
        icons: [
            getAppIcon()
        ],
        title: Dot("title-laftools", "LafTools - The Leading All-In-One ToolBox for Programmers"),
        description: Dot("iZXig7E2JF", "LafTools offers a comprehensive suite of development utilities including codecs, formatters, image processing tools, and computer resource management solutions. Designed to streamline and enhance your development workflow, LafTools is your go-to resource for efficient, high-quality software development."),
        keywords: getAppKeywords(),
    };
}

export let generateMetadata = rootMetaDataFn