

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
    let leftCategoryArr = getSubCategoryList()
    let rightCategoryArr = fn_rightCategoryArr()
    let subCategory = props.params.subCategory
    return (
        <div className={border_clz + "   dark:bg-sky-900 bg-sky-600 "}>
            <div className={row_pad_clz + ' flex-justify-between '}>
                <div>
                    {
                        leftCategoryArr.map(x => {
                            return <Link data-navid={x.id} href={fmtURL_ToolSubPage([URL_SUBCATEGORY_GO_PATH, x.id])} className={
                                " white-anchor-text anchor-text-for-blue    " + (
                                    x.id == subCategory ? ' active ' : ''
                                )
                            }>{x.label}</Link>
                        })
                    }
                </div>
                <div className="flex flex-row items-center">
                    {
                        rightCategoryArr.map(x => {
                            return <Link href={x.href + ""} className={" white-anchor-text anchor-text-for-blue "}>{x.label}</Link>
                        })
                    }
                </div>
            </div>
            {/* overlap */}
            <div>
                {
                    leftCategoryArr.map(x => {
                        return <div data-bindnavid={x.id} className='absolute left-2 top-2'>this is {x.id}/{x.label}</div>
                    })
                }
            </div>
        </div>

    )
}