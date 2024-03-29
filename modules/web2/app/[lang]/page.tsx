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
import { notFound, useParams, useSearchParams } from "next/navigation";
import InnerHome from '../home'
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { PageProps, PortalDefinitionType, TopMainCategoryNavList } from '@/app/__CORE__/meta/pages'
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import { Dot, getXSubPath, isChineseByXLocal } from "../__CORE__/utils/TranslationUtils";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";

import { getAppIcon, getAppKeywords } from "../__CORE__/config/imgconfig";

import SubCategoryPage, { CombindSearchProps } from '@/app/[lang]/[category]/page'
import { satisfies } from "semver";
import { getCategoryList as getCategoryList, getToolSubCategory, PortalDefinitionTbabGroup } from "./[category]/types";
export default async function Home(props: CombindSearchProps) {
    return <SubCategoryPage {...props} />
}
export type CategorySearchProps = PageProps<{
    subCategory: string,
    category: string,
    id: string
}, {}>;

export type ToolSearchDetail = {
    searchToolItem: PortalDefinitionTbabGroup,
    targetSubCategory: PortalDefinitionType,
    topCategoryNavItem: TopMainCategoryNavList
}
export let getSearchDetailBySearchProps = (props: CategorySearchProps): ToolSearchDetail => {
    let topCategoryNavList = getCategoryList()
    let topCategoryNavItem = topCategoryNavList.find(x => x.id == props.params.category)
    if (_.isNil(topCategoryNavItem)) {
        // notFound()
        topCategoryNavItem = topCategoryNavList[0]
    }
    let subCategory = props.params.subCategory;
    let toolsPortalDefinitons = getToolSubCategory()
    if (_.isEmpty(subCategory)) {
        if (toolsPortalDefinitons.length == 0) {
            notFound()
        } else {
            subCategory = toolsPortalDefinitons[0].id
        }
    }
    let targetSubCategory = toolsPortalDefinitons.find(x => x.id == subCategory)
    if (!targetSubCategory) {
        notFound()
    }

    let searchToolId = props.params.id;
    if (!searchToolId) {
        if (!targetSubCategory) {
            notFound()
        }
        if (!targetSubCategory.subTabs || targetSubCategory.subTabs?.length == 0) {
            notFound()
        } else {
            searchToolId = targetSubCategory.subTabs![0].id
        }
    }
    let searchToolItem = (targetSubCategory.subTabs || []).find(x => x.id == searchToolId)
    if (!searchToolItem) {
        notFound()
    }
    return {
        searchToolItem,
        targetSubCategory,
        topCategoryNavItem,
    }
}

export let generateMetadata = async function (props: CategorySearchProps): Promise<Metadata> {
    // fn
    let fn = (obj: Partial<Metadata>) => {
        return _.merge({
            icons: [
                getAppIcon()
            ],
            title: Dot("title-laftools", "LafTools - The Leading All-In-One ToolBox for Programmers"),
            description: Dot("iZXig7E2JF", "LafTools offers a comprehensive suite of development utilities including codecs, formatters, image processing tools, and computer resource management solutions. Designed to streamline and enhance your development workflow, LafTools is your go-to resource for efficient, high-quality software development."),
            keywords: getAppKeywords(),
        } satisfies Metadata, obj)
    };
    let result = fn({})
    let title: string[] = [];

    let { searchToolItem, targetSubCategory, topCategoryNavItem } = getSearchDetailBySearchProps(props)

    // title push
    targetSubCategory && targetSubCategory?.seoTitle && title.push(targetSubCategory?.seoTitle)
    title.push(Dot("laftoolstitle", "Free Online LafTools"))
    title.push(searchToolItem.label + " - " + targetSubCategory.label)
    // keywords
    result.keywords = (targetSubCategory?.seoKeywords ? [
        ...(targetSubCategory?.subTabs || []).map(x => x.label || 'N/A'),
        ...targetSubCategory?.seoKeywords,
    ] : []) || []
    result.title = (
        title.reverse().join(" | ")
    )
    if (isCensorShipForWebsiteMode()) {
        result.title = 'LafTools程序员工具箱'
    }
    return result;
}

export let isCensorShipForWebsiteMode = () => {
    return false
    // return true && isChineseByXLocal();
}

export type { CombindSearchProps, AuthInfoProps } from './[category]/page'