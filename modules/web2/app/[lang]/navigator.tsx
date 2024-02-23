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
import { Dot } from "../__CORE__/utils/TranslationUtils";
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

// TODO: for application use, we can use iframe to simulate it (or just client import)

let tw = (x) => x
let row_pad_clz = tw`  app-minmax-size mx-auto `
let border_clz = tw`  border-b-slate-300  border-b-[1px]  `

export default (props) => {
    let nav = [
        {
            label: Dot("G2dvTUljF", "Tools"),
            href: '/tools'
        },
        {
            label: Dot("n28g4di0L", "Manuals"),
            href: '/manuals'
        },
        {
            label: Dot("AvsWiJHLZ", "Resources"),
            href: '/resources',
        },
        {
            label: Dot("ymyfghy1r", "Notes"),
            href: '/notes'
        }
    ]
    let categoryArrs = [
        {
            label: Dot("str.formatter", "Formatters"),
            href: '/formatters'
        },
        {
            label: Dot("str.codecs", "Codecs"),
            href: '/codecs'
        },
        {
            label: Dot("str.encoderdecoder", "Encoder/Decoder"),
            href: '/encode-decode'
        },
        {
            label: Dot("str.parsers", "Parsers"),
            href: '/parsers'
        }
    ]
    return <div className="">
        <div className={
            border_clz + ' py-2 '
        } style={{
        }}>
            <div className={row_pad_clz + ' flex flex-row space-x-2 font-xs '}>
                {
                    nav.map(x => {
                        return <Link href={x.href} className="text-xs">{x.label}</Link>
                    })
                }
            </div>
        </div>
        <div className={border_clz + " pt-2 p-4"}>
            <div className={row_pad_clz}>
                <h1 className="text-lg m-0">{Dot("OyZLZokUQ", "Empower Development with LafTools!")}</h1>
                <h2 className="text-md m-0">laf-tools.com</h2>
            </div>
        </div>
        <div className={border_clz + " py-2 bg-cyan-600 text-white font-semibold "}>
            <div className={row_pad_clz + ' space-x-2 '}>
                {
                    categoryArrs.map(x => {
                        return <Link href={x.href} className="text-xs text-white  ">{x.label}</Link>
                    })
                }
            </div>
        </div>
    </div>
}