'use client'

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Dot } from "../__CORE__/utils/cTranslationUtils";
import { NavItem } from "./navItem";
import { GitHubRepoIssueLink } from "../__CORE__/types/constants";
import { fmt_ToolSubPage } from "./tool-definitions";
import { loadDOT } from "../__CORE__/utils/i18n-types";

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
