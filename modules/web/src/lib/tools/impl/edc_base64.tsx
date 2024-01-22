// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 18 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import { Dot } from "../../../utils/TranslationUtils";
import Operation from "../../core/Operation.mjs";
import FromBase64 from "./conversion/FromBase64.js";
import ToBase64 from "./conversion/ToBase64.js";

import { ToolHandler, ToolMetaInfo } from "../handler";

export default class Base64Handler extends ToolHandler {
    getMetaInfo(): ToolMetaInfo {
        return {
            exampleType: "text-short",
            description: Dot(
                "0Ceqru",
                "Base64 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers.",
            ),
            infoURL: 'https://wikipedia.org/wiki/Base64'
        }
    }
    getOperations(): Operation[] {
        return (
            [
                new ToBase64(),
                new FromBase64(),
            ]
        )
    }
}