// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


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
import { Dot, getXHostname } from "../__CORE__/utils/TranslationUtils";
import Link from "next/link";

import {
    Callout,
    PanelStack,
    ProgressBar,
    AnchorButton,
    Tooltip,
    Dialog,
    Drawer,
    Overlay,
    Alert,
    RadioGroup,
    MenuItem,
    Radio,
    ButtonGroup,
    TextArea,
    HotkeysProvider,
    Intent,
    Position,
    Toaster,
    Checkbox,
    NumericInput,
    FormGroup,
    HTMLSelect,
    ControlGroup,
    InputGroup,
    Navbar,
    NavbarHeading,
    NonIdealState,
    NavbarDivider,
    NavbarGroup,
    Alignment,
    Classes,
    Icon,
    Card,
    Elevation,
    Button,
    Popover,
    Menu,
    MenuDivider,
    Tabs,
    Tab,
} from "@blueprintjs/core";
import { NavItem } from "./navItem";
import { getAppIcon } from "../__CORE__/config/imgconfig";
import { ClosableText } from "../__CORE__/components/ClosableText";
import EnglishVersionBanner from "../__CORE__/components/EnglishVersionBanner";
import { border_clz, row_pad_clz } from "./styles";
import { fmtURL_Server } from "../__CORE__/utils/routeUtils";


export type LabelHrefType = {
    label: string,
    href: string
}


export default (props) => {
    let fmt_Category = (x: string) => {
        return fmtURL_Server(`/category/${x}`)
    }
    let leftNav: LabelHrefType[] = [
        {
            label: Dot("G2dvTUljF", "Tools"),
            href: fmt_Category('/tools')
        },
        {
            label: Dot("n28g4di0L", "Manuals"),
            href: fmt_Category('/manuals')
        },
        {
            label: Dot("AvsWiJHLZ", "Resources"),
            href: fmt_Category('/resources'),
        },
        {
            label: Dot("ymyfghy1r", "Notes"),
            href: fmt_Category('/notes')
        }
    ]
    // TODO: update the /v2 to actual path
    let rightNav: LabelHrefType[] = [
        {
            label: Dot("str.login", "Login"),
            href: '/v2/zh-hans/nav/form/sign-in'
        },
        {
            label: Dot("str.register", "Register"),
            href: '/v2/zh-hans/nav/form/sign-up'
        },
        {
            label: Dot("str.usercentre", "User Centre"),
            href: '/v2/zh-hans/nav/overview'
        }
    ]
    let leftCategoryArr: LabelHrefType[] = [
        {
            label: Dot("str.formatter", "Formatters"),
            href: '/formatters'
        },
        {
            label: Dot("str.codecs", "Codecs"),
            href: '/codecs'
        },
        {
            label: Dot("str.converters", "Converters"),
            href: '/converters'
        },
        {
            label: Dot("str.parsers", "Parsers"),
            href: '/parsers'
        }
    ]
    let hostname = getXHostname()
    return <div className="">
        <div className={
            border_clz + ' py-2 '
        } style={{
        }}>
            <div className={row_pad_clz + '  justify-between flex flex-row '}>
                <NavItem nav={leftNav}></NavItem>
                <NavItem nav={rightNav}></NavItem>
            </div>
        </div>
        {
            hostname == 'laf-tools.com' ? <EnglishVersionBanner></EnglishVersionBanner> : ''
        }
        <div className={border_clz + " py-3 p-4 relative bg-slate-50"}>
            <div className={row_pad_clz + ' z-20 flex flex-row items-center relative'}>
                <div className="mx-2 mr-3">
                    <img src={getAppIcon()} width={40}></img>
                </div>
                <div>
                    <h1 className="text-lg m-0">{Dot("OyZLZokUQ", "Empower Development with LafTools!")}</h1>
                    <h2 className="text-xs  text-slate-600 mt-[-2px] mb-1 items-center m-0 space-x-1 flex flex-row ">
                        <div>laf-tools.com</div>
                        <div>•</div>
                        <div className="small-text">{Dot("quality-first", "Quality First")}</div>
                        <div>•</div>
                        <div className="small-text">{Dot("forever-foss", "Forever FOSS!")}</div>
                    </h2>
                </div>
                <div className=" absolute right-0 top-[-3px] text-right ">
                    <div className=" text-gray-600 dark:text-gray-400 ">
                        <div className="w-full space-y-[3px]">
                            {
                                // <ClosableText closeKey={
                                //     "JLKtYELFf"
                                // }
                                //     text={"Switch to English version of LafTools."}
                                // >
                                // </ClosableText>
                            }
                            <ClosableText
                                closeKey='QUxFMltus'
                                text={Dot(
                                    "pqs7y3",
                                    "Kindly consider registering this webpage as a PWA to have full keymap support."
                                )}
                            ></ClosableText>
                            <ClosableText
                                closeKey='QUxFMltus'
                                text={Dot(
                                    "1edeTuxV",
                                    "Kindly use the latest version of Chrome or Edge for the best experience."
                                )}
                            ></ClosableText>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <div className="absolute left-0 top-0 w-full h-full pattern-cross  dark:pattern-cross pattern-slate-300 dark:pattern-gray-700 pattern-bg-transparent pattern-opacity-30 pattern-size-8"></div>
            </div> */}
        </div>
        <div className={border_clz + "  bg-cyan-600  "}>
            <div className={row_pad_clz + ' flex-justify-between '}>
                <div>
                    {
                        leftCategoryArr.map(x => {
                            return <Link href={x.href} className=" white-anchor-text    ">{x.label}</Link>
                        })
                    }
                </div>
                <div>
                    {
                        leftCategoryArr.map(x => {
                            return <Link href={x.href} className={" white-anchor-text    last:pr-0"}>{x.label}</Link>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}