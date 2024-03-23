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

/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */
import vkbeautify from "vkbeautify";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * XML Beautify operation
 */
class XMLBeautify extends Operation {
    public getOptDetail(): OptDetail {
        return {
            config: {
                "module": "Code",
                "description": "Indents and prettifies HTML code.",
                "infoURL": null,
                "inputType": "string",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": Dot("isti", "Indent string"),
                        "type": "binaryShortString",
                        "value": "\\t"
                    }
                ]
            },
            id: 'html-beautify',
            optName: Dot("yMZW-figFKsdf", "Format {0}", "HTML"),
            infoURL: 'https://en.wikipedia.org/wiki/HTML',
            optDescription: Dot(
                "html-beautify.desc.2a5f9",
                "Beautifies the input XML by adding indentation and line breaks to make it easier to read."
            ),
            exampleInput: `<!DOCTYPE html><html><head><title>Page Title</title></head><body><h1>This is a Heading</h1><p>This is a paragraph.</p></body></html>`,
            exampleOutput: `<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>Page Title</title>\n\t</head>\n\t<body>\n\t\t<h1>This is a Heading</h1>\n\t\t<p>This is a paragraph.</p>\n\t</body>\n</html>`,
        }
    }

    /**
     * XMLBeautify constructor
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

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const indentStr = args[0];

        return vkbeautify.xml(input, indentStr);
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "html",
            outputLang: "html"
        }
    }

}

export default XMLBeautify;
