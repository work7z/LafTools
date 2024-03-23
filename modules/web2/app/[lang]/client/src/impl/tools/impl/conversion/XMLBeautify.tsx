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
                "description": "Indents and prettifies XML code.",
                "infoURL": null,
                "inputType": "string",
                "outputType": "string",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": "Indent string",
                        "type": "binaryShortString",
                        "value": "\\t"
                    }
                ]
            },
            id: 'xml-beautify',
            optName: Dot("yMZW-GEgf", "Format {0}", 'XML'),
            infoURL: 'https://en.wikipedia.org/wiki/XML',
            optDescription: Dot(
                "xml-beautify.desc.2a5f9",
                "This operation formats XML data to improve readability by adding proper indentation, line breaks, and ensuring well-formed structure.",
                ""
            ),
            exampleInput: `<unformatted>    <data>        <item1>value1</item1><item2>value2</item2>    </data></unformatted>`,
            exampleOutput: `<?xml version:"1.0" encoding:"UTF-8"?>
<unformatted>
    <data>
        <item1>value1</item1>
        <item2>value2</item2>
    </data>
</unformatted>`,
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
                "name": "Indent string",
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
            inputLang: "xml",
            outputLang: "xml"
        }
    }

}

export default XMLBeautify;
