// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 18 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
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

import Operation from "../core/Operation.tsx";
import { CodeImplMap } from "./code/types.tsx";
import { FAQItem } from "./faq/types.tsx";
import appToolInfoObj from "./d_meta.tsx";
import { AppOpFnMapTypeKeys } from "./g_optlist.tsx";
import _ from "lodash";

export type ShowExampleType = "text-short" | "text-medium" | "text-long" | "js-short" | "js-medium" | "css-short"


export type ToolMetaInfo = {
    hideCodePanel?: boolean;
    hideFAQPanel?: boolean;
    description: string;
    exampleType?: ShowExampleType
}

export abstract class ToolHandler {
    loadedOps: { [key in AppOpFnMapTypeKeys]?: Operation } = {}

    id: string = "";
    abstract getMetaInfo(): ToolMetaInfo;
    abstract getOperationsByName(): AppOpFnMapTypeKeys[]
    getOperations = (): Operation[] => {
        return _.values(this.loadedOps)
    }
    addOperation(name: string, nameFN: Operation) {
        this.loadedOps[name] = nameFN;
    }
    getFAQ = async (): Promise<() => FAQItem[]> => {
        let o = appToolInfoObj[this.id]
        if (!o.ImportFAQ) {
            return () => [];
        }
        let r = await o.ImportFAQ()
        let r2 = r.default
        return r2;
    }
    getCode = async (): Promise<() => CodeImplMap | null> => {
        let o = appToolInfoObj[this.id]
        if (!o.ImportCode) {
            return () => null;
        }
        let r = await o.ImportCode()
        let r2 = r.default
        return r2;
    }
}


export type ToolHandlerClass = typeof ToolHandler;