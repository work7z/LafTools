// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 24 Feb 2024
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

'use client'

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils";
import { loadDOT } from "@/app/__CORE__/utils/i18n-types";
import { NavigatorPassProp } from "..";
import { fmtURL_Client } from "@/app/__CORE__/utils/cRouteUtils";
import { URL_SUBCATEGORY_GO_PATH, URL_TOOL_CATEGORY } from "@/app/__CORE__/meta/url";
import { fmtURL_ToolSubPageClient } from "@/app/__CORE__/meta/client";
import { ToolSearchDetail } from "@/app/[lang]/page";

let a = loadDOT("EiVD4")

export default function (props: { toolSearchDetail: ToolSearchDetail }) {
    a()
    return (
        <Breadcrumbs size={"sm"}>
            <BreadcrumbItem href={fmtURL_Client([])}>{Dot("Ln0dR", "Home")}</BreadcrumbItem>
            <BreadcrumbItem href={fmtURL_ToolSubPageClient([URL_TOOL_CATEGORY])}>{Dot("thAvhgee7", "Universal Tools")}</BreadcrumbItem>
            <BreadcrumbItem href={fmtURL_ToolSubPageClient([URL_TOOL_CATEGORY, URL_SUBCATEGORY_GO_PATH, props.toolSearchDetail.targetSubCategory.id])}>{props.toolSearchDetail.targetSubCategory.label}</BreadcrumbItem>
            <BreadcrumbItem href={
                fmtURL_ToolSubPageClient([URL_TOOL_CATEGORY, URL_SUBCATEGORY_GO_PATH, props.toolSearchDetail.targetSubCategory.id, props.toolSearchDetail.searchToolItem.id])
            }>{props.toolSearchDetail.searchToolItem.label}</BreadcrumbItem>
        </Breadcrumbs>
    );
}
