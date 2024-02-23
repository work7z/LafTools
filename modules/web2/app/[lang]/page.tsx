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
import UserPanel from "@/app/__CORE__/containers/UserSideBar";
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


export type AuthInfoProps = { authInfo: AuthInfo }
export type CombindSearchProps = PageProps<any, any>

export default async function Home(props: CombindSearchProps) {
    let authInfo = await getAuthInfo()
    return (
        <main>
            <NavigatorPage></NavigatorPage>
        </main>
    )
}


export let rootMetaDataFn = async function (): Promise<Metadata> {
    return {
        title: Dot("title-laftools", "LafTools - The Leading All-In-One ToolBox for Programmers"),
        description: Dot("iZXig7E2JF", "LafTools offers a comprehensive suite of development utilities including codecs, formatters, image processing tools, and computer resource management solutions. Designed to streamline and enhance your development workflow, LafTools is your go-to resource for efficient, high-quality software development."),
        keywords: [
            Dot("wi28h5_S2", "Codecs"),
            Dot("Jbor69IBw", "Formatters"),
            Dot("t8DUz20a-", "JSON Formatter"),
            Dot("2S_7EVIsK", "JSON Validator"),
            Dot("Ibzs2-Ho1", "XML Formatter"),
            Dot("Ibzs2-Ho1", "XML Validator"),
            Dot("Ibzs2-Ho1", "CSV Tools"),
            Dot("9b_7a0feb", "MD5"),
            Dot("9b_7a0fdf", "SHA256"),
            Dot("9b_7a0fqwe", "Base64 Encoder"),
            Dot("9b_7a0sdf", "Base64 Decoder"),
            Dot("q0zA1kML_", "Online Toolbox"),
            Dot("jr_7Y98yZ", "LafTools"),
        ],
    };
}

export let generateMetadata = rootMetaDataFn