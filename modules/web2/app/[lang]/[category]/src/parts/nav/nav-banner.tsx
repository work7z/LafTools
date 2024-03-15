
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
    let hostname = getXHostname()
    let isLocalname = (hostname: string) => {
        return hostname == "localhost" || hostname == "127.0.0.1" || hostname == '0.0.0.0'
    }

    return <div className={border_clz + " py-3 p-4 relative bg-slate-50 dark:bg-slate-900"}>
        <div className={row_pad_clz + ' z-20 flex flex-row items-center relative'}>
            <div className="mx-2 mr-3">
                <img src={getAppIcon()} width={40}></img>
            </div>
            <div>
                <h1 className="text-lg m-0">{Dot("OyZLZokUQ", "Empower Development with LafTools!")}</h1>
                <h2 className="text-xs pl-[2px] text-slate-600 dark:text-slate-300 mt-[-2px] mb-1 items-center m-0 space-x-1 flex flex-row ">
                    <div>
                        <PossiblePathname />
                    </div>
                    <div>•</div>
                    <div className="small-text">{Dot("quality-first", "High Quality First")}</div>
                    <div>•</div>
                    <div className="small-text">{Dot("forever-foss", "Forever FOSS")}</div>
                </h2>
            </div>
            <div className=" absolute right-0 bottom-0  ">
                <div className=" text-gray-600 dark:text-gray-400 ">
                    <div className="w-full space-y-[3px]">
                        <ClosableText
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
                            goLink="https://sys.laftools.dev"
                            closeKey="XDp3Meed-"
                            text={"[3] " + Dot("BQs6go-dk", "Free Download LafTools for Windows, Linux, and macOS.")}
                        >
                        </ClosableText>
                    </div>
                </div>
            </div>
        </div>
    </div>
}