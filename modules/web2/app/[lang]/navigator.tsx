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


import _ from "lodash";
import React, { } from "react";
import { Dot, getXHostname } from "../__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NavItem } from "./navItem";
import { getAppIcon } from "../__CORE__/config/imgconfig";
import { ClosableText } from "../__CORE__/components/ClosableText";
import EnglishVersionBanner from "../__CORE__/components/EnglishVersionBanner";
import { border_clz, border_clz_top, row_pad_clz } from "./styles";
import LightDarkButton from "../__CORE__/components/LightDarkButton";
import GitHubButton from "../__CORE__/components/GitHubButton";
import SysBreadCrumbs from './breadcrumbs'
import {
    fn_leftNav,
    fn_rightNav,
    fn_leftCategoryArr,
    fn_rightCategoryArr,
    fmt_ToolSubPage
} from './tool-definitions'
import { GitHubRepoIssueLink } from "../__CORE__/types/constants";
import Footer from "../__CORE__/containers/Footer";

export type LabelHrefType = {
    label: string | JSX.Element,
    href: string
}
export type NavigatorPassProp = {
    children: JSX.Element
}

export default (props: NavigatorPassProp) => {
    let { children } = props;
    let leftNav = fn_leftNav()
    let rightNav = fn_rightNav()
    let leftCategoryArr = fn_leftCategoryArr()
    let rightCategoryArr = fn_rightCategoryArr()
    let hostname = getXHostname()
    return <div className="">
        <div className={
            border_clz + ' py-2 sticky top-0 bg-white dark:bg-slate-800 z-50'
        } style={{
        }}>
            <div className={row_pad_clz + ' items-center justify-between flex flex-row '}>
                <NavItem nav={leftNav}></NavItem>
                <NavItem extraLeft={
                    <div className="flex items-center">
                        <LightDarkButton />
                        <GitHubButton></GitHubButton>
                    </div>
                } nav={rightNav}></NavItem>
            </div>
        </div>
        {
            hostname == 'laf-tools.com' ? <EnglishVersionBanner></EnglishVersionBanner> : ''
        }
        <div className={border_clz + " py-3 p-4 relative bg-slate-50 dark:bg-slate-900"}>
            <div className={row_pad_clz + ' z-20 flex flex-row items-center relative'}>
                <div className="mx-2 mr-3">
                    <img src={getAppIcon()} width={40}></img>
                </div>
                <div>
                    <h1 className="text-lg m-0">{Dot("OyZLZokUQ", "Empower Development with LafTools!")}</h1>
                    <h2 className="text-xs  text-slate-600 dark:text-slate-300 mt-[-2px] mb-1 items-center m-0 space-x-1 flex flex-row ">
                        <div>laf-tools.com</div>
                        <div>•</div>
                        <div className="small-text">{Dot("quality-first", "Quality First")}</div>
                        <div>•</div>
                        <div className="small-text">{Dot("forever-foss", "Forever FOSS")}</div>
                    </h2>
                </div>
                <div className=" absolute right-0 bottom-0  ">
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

                            {/* <ClosableText
                                closeKey='G6epZQCK-'
                                text={Dot(
                                    "pqs7y3",
                                    "Kindly consider registering this webpage as a PWA to have full keymap support."
                                )}
                            ></ClosableText> */}
                            <ClosableText
                                // goText={Dot("V2A74ySoN","View")}
                                // goLink="/"
                                closeKey='QUxFMltus'
                                text={"[1] " + Dot(
                                    "C_qzLO7yw",
                                    "Please use Chrome, Firefox, or Edge for the best experience."
                                )}
                            ></ClosableText>
                            <ClosableText
                                goText={Dot("CqFdiBu6M", "View")}
                                goLink="https://github.com/work7z/LafTools/"
                                closeKey="L49HJwuJz"
                                text={"[2] " +
                                    Dot("giveas3tar", "Give us a star on GitHub if you like LafTools.")
                                }
                            ></ClosableText>
                            <ClosableText
                                goText={Dot("Ezsn81tfc", "View")}
                                goLink="https://sys.laf-tools.com"
                                closeKey="XDp3Meed-"
                                text={"[3] " + Dot("BQs6go-dk", "Free Download LafTools for Windows, Linux, and macOS.")}
                            // Dot("QvBKp9BBp", "Learn more about the development planning of LafTools.")
                            >
                            </ClosableText>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <div className="absolute left-0 top-0 w-full h-full pattern-cross  dark:pattern-cross pattern-slate-300 dark:pattern-gray-700 pattern-bg-transparent pattern-opacity-30 pattern-size-8"></div>
            </div> */}
        </div>
        <div className={border_clz + "  bg-cyan-600 dark:bg-cyan-950 "}>
            <div className={row_pad_clz + ' flex-justify-between '}>
                <div>
                    {
                        leftCategoryArr.map(x => {
                            return <Link href={x.href} className=" white-anchor-text    ">{x.label}</Link>
                        })
                    }
                </div>
                <div className="flex flex-row items-center">
                    {
                        rightCategoryArr.map(x => {
                            return <Link href={x.href} className={" white-anchor-text "}>{x.label}</Link>
                        })
                    }
                </div>
            </div>
        </div>
        <div className={' min-h-screen bg-slate-50 dark:bg-slate-800'}>
            <div className={row_pad_clz}>
                <div className="flex flex-row flex-wrap py-2 items-center justify-between">
                    <div>
                        <SysBreadCrumbs />
                    </div>
                    <div>
                        <NavItem nav={[
                            {
                                href: fmt_ToolSubPage('/favourite'),
                                label: Dot("be-Favourite-it", "Add to Favourites")
                            },
                            {
                                href: fmt_ToolSubPage('/share-this-page'),
                                label: Dot("share-this-page", "Share this Page")
                            },
                            {
                                href: GitHubRepoIssueLink,
                                label: Dot("BJbgR", "Report a Problem")
                            }
                        ]}></NavItem>
                    </div>
                </div>

                {children}
            </div>
        </div>


        {/** footer */}
        <div className={
            border_clz_top + " min-h-20 "
        }>

            <Footer />
        </div>
    </div>
}