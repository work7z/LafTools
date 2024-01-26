// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
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

/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */
import { Dot } from "../../../../utils/TranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'
import Operation from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "../../../../utils/GlobalUtils.tsx";
import escodegen from "escodegen";
import * as esprima from "esprima";
import OperationError from "../../../core/errors/OperationError.mjs";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * JavaScript Beautify operation
 */
class JavaScriptBeautify extends Operation {

    /**
     * JavaScriptBeautify constructor
     */
    constructor() {
        super();

        this.name = "JavaScript Beautify";
        this.module = "Code";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Indent string",
                "type": "binaryShortString",
                "value": "\\t"
            },
            {
                "name": "Quotes",
                "type": "option",
                "value": ["Auto", "Single", "Double"]
            },
            {
                "name": "Semicolons before closing braces",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Include comments",
                "type": "boolean",
                "value": true
            }
        ];


        this.id = 'jsbeautify'
        this.name = Dot("6UICxHzVR.name", "Beautify {0}", "JavaScript");
        this.description = Dot(
            "WFUWzv_px",
            "Parses and pretty prints valid JavaScript code. Also works with JavaScript Object Notation (JSON).",
        );
        this.exampleInput = "let a = 1; let b = 2; let obj = {a: 1, b: 2};"
        this.exampleOutput = "let a = 1;\nlet b = 2; //;\nlet obj = {\n    a: 1,\n    b: 2\n};\n";
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const beautifyIndent = args[0] || "\\t",
            quotes = args[1].toLowerCase(),
            [, , beautifySemicolons, beautifyComment] = args;
        let result = "",
            AST;

        try {
            AST = esprima.parseScript(input, {
                range: true,
                tokens: true,
                comment: true
            });

            const options = {
                format: {
                    indent: {
                        style: beautifyIndent
                    },
                    quotes: quotes,
                    semicolons: beautifySemicolons,
                },
                comment: beautifyComment
            };

            if (options.comment)
                AST = escodegen.attachComments(AST, AST.comments, AST.tokens);

            result = escodegen.generate(AST, options);
        } catch (e) {
            // Leave original error so the user can see the detail
            throw new OperationError("Unable to parse JavaScript.<br>" + e.message);
        }
        return result;
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "javascript",
            outputLang: "javascript",
        }
    }
}

export default JavaScriptBeautify;
