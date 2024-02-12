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
import { useParams, useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { CombindSearchProps } from "@/app/page";

export default (props: {
    combindSearchProps: CombindSearchProps & { rounded?: boolean }
} & { children: any, rightJSX?: any }) => {
    return (
        <main className="" >
            <div className=" flex flex-row space-x-4 ">
                {props.children}
                <div
                    style={{
                        width: '290px'
                    }}
                    className="space-y-2"
                >
                    {
                        props.rightJSX || <CardPanel><UserPanel {...props.combindSearchProps}></UserPanel></CardPanel>
                    }
                </div>
            </div >
        </main >
    );
}

