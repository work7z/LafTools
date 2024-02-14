'use server'
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebsiteName } from "../../common/config";
import { TopNav } from "../TopNav";
import CenterPart from "../CenterPart";
import CardPanel from '../../components/CardPanel'
import NodeHorizontalBar from "../TabGroupHorizontalBar";
import _, { random } from "lodash";
import UserPanel from "../UserPanel";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { AuthInfoProps, CombindSearchProps } from "@/app/page";
import { getCookie } from "cookies-next";
import getAuthInfo, { AuthInfo } from "./actions/handleAuthInfo";
import Footer from "../Footer";

export type Jsx_fn_type = (props: AuthInfoProps) => any;

export default async (props: {
    combindSearchProps: CombindSearchProps & { rounded?: boolean }
} & { jsx_main: Jsx_fn_type, rightJSX?: Jsx_fn_type }) => {

    let authInfo = await getAuthInfo()
    let jsx_center = <div className=" flex flex-row space-x-4 ">
        {props.jsx_main ? props.jsx_main({ authInfo }) : ''}
        <div
            style={{
                width: '290px'
            }}
            className="space-y-2"
        >
            {
                props.rightJSX ? props.rightJSX({ authInfo }) : <UserPanel authInfo={authInfo} {...props.combindSearchProps}></UserPanel>
            }
        </div>
    </div >
    return (<main className="" ><div>
        <TopNav></TopNav>
        <CenterPart children={jsx_center as any} />
        <Footer authInfo={authInfo}></Footer>
    </div>
    </main>);
}

