// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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
import { Dot, getXHostname } from "@/app/__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NavCategory as NavCategory } from "./nav/nav-category";
import { getAppIcon } from "@/app/__CORE__/config/imgconfig";
import { ClosableText } from "@/app/__CORE__/components/ClosableText";
import RedirectToOtherBanner from "@/app/__CORE__/components/RedirectToOtherBanner/index";
import { border_clz, border_clz_top, row_pad_clz } from "@/app/__CORE__/meta/styles";
import LightDarkButton from "@/app/__CORE__/components/LightDarkButton";
import GitHubButton from "@/app/__CORE__/components/GitHubButton";
import SysBreadCrumbs from './cpt/cpt-breadcrumbs'
// import {

// } from '../../../../../../types'
import { GitHubRepoIssueLink } from "@/app/__CORE__/meta/constants";
import Footer from "@/app/__CORE__/containers/Footer";
import PossiblePathname from "@/app/__CORE__/components/PossiblePathname";
import {
    getCategoryList as getCategoryList,
    fn_rightNav,
    getSubCategoryList,
    fn_rightCategoryArr

} from "@/app/[lang]/client/src/impl/tools/d_portal";
import { CategorySearchProps, ToolSearchDetail, getSearchDetailBySearchProps } from "@/app/[lang]/page";
import { URL_SUBCATEGORY_GO_PATH } from "@/app/__CORE__/meta/url";
import { fmtURL_ToolSubPage } from "@/app/__CORE__/meta/common";
import NavTop from "./nav/nav-top";
import NavSubCategory from './nav/nav-subcategory'
import NavBanner from "./nav/nav-banner";
export type LabelHrefType = {
    label: string | JSX.Element,
    id?: string,
    href?: string
}
export type NavigatorPassProp = CategorySearchProps & {
    children: JSX.Element
}

export default (props: NavigatorPassProp) => {
    let toolSearchDetail: ToolSearchDetail = getSearchDetailBySearchProps(props)
    let { children } = props;
    return (
        <div className={'  bg-slate-50 dark:bg-slate-800 pb-10'}>
            <div className={row_pad_clz}>
                <div className="flex flex-row flex-wrap py-2 items-center justify-between">
                    <div>
                        <SysBreadCrumbs toolSearchDetail={toolSearchDetail} />
                    </div>
                    <div>
                        <NavCategory {...props} nav={[
                            {
                                href: fmtURL_ToolSubPage(['opt?action=favourite']),
                                label: Dot("be-Favourite-it", "Add to Favourites")
                            },
                            {
                                href: fmtURL_ToolSubPage(['opt?action=share-this-page']),
                                label: Dot("share-this-page", "Share this Page")
                            },
                            {
                                href: GitHubRepoIssueLink,
                                label: Dot("BJbgR", "Report a Problem")
                            }
                        ]}></NavCategory>
                    </div>
                </div>
                {children}
            </div>
        </div>

    )
}