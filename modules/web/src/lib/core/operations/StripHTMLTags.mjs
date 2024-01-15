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
import Utils from "../Utils.mjs";

/**
 * Strip HTML tags operation
 */
class StripHTMLTags extends Operation {

    /**
     * StripHTMLTags constructor
     */
    constructor() {
        super();

        this.name = "Strip HTML tags";
        this.module = "Default";
        this.description = "Removes all HTML tags from the input.";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Remove indentation",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Remove excess line breaks",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern:  "(</html>|</div>|</body>)",
                flags:  "i",
                args:   [true, true]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [removeIndentation, removeLineBreaks] = args;

        input = Utils.stripHtmlTags(input);

        if (removeIndentation) {
            input = input.replace(/\n[ \f\t]+/g, "\n");
        }

        if (removeLineBreaks) {
            input = input
                .replace(/^\s*\n/, "") // first line
                .replace(/(\n\s*){2,}/g, "\n"); // all others
        }

        return input;
    }

}

export default StripHTMLTags;
