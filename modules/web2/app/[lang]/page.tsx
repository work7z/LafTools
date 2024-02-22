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


export type AuthInfoProps = { authInfo: AuthInfo }
export type CombindSearchProps = PageProps<any, any>

export default async function Home(props:CombindSearchProps) {
    return <div className='ph-2' style={{padding:'10px'}}>LafTools 在线工具箱</div>
    return <InnerHome combindSearchProps={props}></InnerHome>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: getWebsiteName(),
    };
}

