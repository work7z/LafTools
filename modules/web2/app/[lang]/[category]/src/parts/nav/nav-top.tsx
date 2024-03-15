

import _ from "lodash";
import React, { } from "react";
import { Dot, getXHostname } from "@/app/__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NavCategory as NavCategory } from "../nav/nav-category";
import { getAppIcon } from "@/app/__CORE__/config/imgconfig";
import { ClosableText } from "@/app/__CORE__/components/ClosableText";
import RedirectToOtherBanner from "@/app/__CORE__/components/RedirectToOtherBanner/index";
import { border_clz, border_clz_top, row_pad_clz } from "@/app/__CORE__/meta/styles";
import LightDarkButton from "@/app/__CORE__/components/LightDarkButton";
import GitHubButton from "@/app/__CORE__/components/GitHubButton";
import SysBreadCrumbs from '../cpt/cpt-breadcrumbs'
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
import { CategorySearchProps } from "@/app/[lang]/page";
import { URL_SUBCATEGORY_GO_PATH } from "@/app/__CORE__/meta/url";
import { fmtURL_ToolSubPage } from "@/app/__CORE__/meta/common";
import { NavigatorPassProp } from "..";

export default (props: NavigatorPassProp) => {
    let rightNav = fn_rightNav()
    let categoryList = getCategoryList()

    return <div className={
        border_clz + ' py-2 sticky top-0 bg-white dark:bg-slate-800 z-50'
    } style={{
    }}>
        <div className={row_pad_clz + ' items-center justify-between flex flex-row '}>
            <NavCategory activeId={props.params.category || categoryList[0].id} {...props} nav={categoryList}></NavCategory>
            <NavCategory {...props} extraLeft={
                <div className="flex items-center">
                    <LightDarkButton />
                    <GitHubButton></GitHubButton>
                </div>
            } nav={rightNav}></NavCategory>
        </div>
    </div>
}