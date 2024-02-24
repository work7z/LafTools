'use client'

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Dot } from "../__CORE__/utils/cTranslationUtils";
import { NavItem } from "./navItem";
import { GitHubRepoIssueLink } from "../__CORE__/types/constants";
import { fmt_ToolSubPage } from "./tool-definitions";

export default function App() {

    return (
        <Breadcrumbs size={"sm"}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Music</BreadcrumbItem>
        <BreadcrumbItem>Artist</BreadcrumbItem>
        <BreadcrumbItem>Album</BreadcrumbItem>
        <BreadcrumbItem>Song</BreadcrumbItem>
    </Breadcrumbs>
);
}
