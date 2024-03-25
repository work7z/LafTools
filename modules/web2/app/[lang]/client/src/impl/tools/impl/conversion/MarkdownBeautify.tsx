// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
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
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

// write a class for MarkdownBeautify like CSSBeautify
export default class MarkdownBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            relatedID: 'text',
            config: {
                "module": "Code",
                "description": "Indents and prettifies Markdown document.",
                "infoURL": null,
                "inputType": "string",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("istqwi", "Indent string"),
                        "type": "binaryShortString",
                        "value": "\\t"
                    }
                ]
            },
            nousenouseID: 'mdbeautify',
            optName: Dot("3TMOUkhZl", "Format {0}", "Markdown"),
            optDescription: Dot(
                "md2aO2NaJITm",
                "Indents and prettifies Markdown document.",
            ),
            infoURL: "https://www.markdownguide.org/",
            exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
            exampleOutput: "Hello, world!\n=============\n"
        }
    }

    /**
     * MarkdownBeautify constructor
     */
    constructor() {
        super();

        this.module = "Code";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": Dot("isti", "Indent string"),
                "type": "binaryShortString",
                "value": "\\t"
            }
        ];

    }

    run() {
        // implement the run method
    }
}

