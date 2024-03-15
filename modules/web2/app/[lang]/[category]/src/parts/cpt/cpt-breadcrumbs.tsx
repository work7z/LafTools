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

let a = loadDOT("EiVD4")

export default function App() {
    a()
    return (
        <Breadcrumbs size={"sm"}>
            <BreadcrumbItem>{Dot("Ln0dR", "Home")}</BreadcrumbItem>
            <BreadcrumbItem>{Dot("CnbkCMQnU", "Cyber Security")}</BreadcrumbItem>
            <BreadcrumbItem>{Dot("JXKCXTd1w", "Encrypt/Decrypt")}</BreadcrumbItem>
            <BreadcrumbItem>{Dot("tRwfVsJUY", "Hash")}</BreadcrumbItem>
            <BreadcrumbItem>{Dot("lqy0o5WUr", "MD5 Algorithm")}</BreadcrumbItem>
        </Breadcrumbs>
    );
}
