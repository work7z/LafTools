// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Author: Ryan Laf <get>
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

import Operation from "../Operation.mjs";
import * as esprima from "esprima";

/**
 * JavaScript Parser operation
 */
class JavaScriptParser extends Operation {

    /**
     * JavaScriptParser constructor
     */
    constructor() {
        super();

        this.name = "JavaScript Parser";
        this.module = "Code";
        this.description = "Returns an Abstract Syntax Tree for valid JavaScript code.";
        this.infoURL = "https://wikipedia.org/wiki/Abstract_syntax_tree";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Location info",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Range info",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Include tokens array",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Include comments array",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Report errors and try to continue",
                "type": "boolean",
                "value": false
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [parseLoc, parseRange, parseTokens, parseComment, parseTolerant] = args,
            options = {
                loc:      parseLoc,
                range:    parseRange,
                tokens:   parseTokens,
                comment:  parseComment,
                tolerant: parseTolerant
            };
        let result = {};

        result = esprima.parseScript(input, options);
        return JSON.stringify(result, null, 2);
    }

}

export default JavaScriptParser;
