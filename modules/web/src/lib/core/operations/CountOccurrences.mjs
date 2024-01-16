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

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * Count occurrences operation
 */
class CountOccurrences extends Operation {

    /**
     * CountOccurrences constructor
     */
    constructor() {
        super();

        this.name = "Count occurrences";
        this.module = "Default";
        this.description = "Counts the number of times the provided string occurs in the input.";
        this.inputType = "string";
        this.outputType = "number";
        this.args = [
            {
                "name": "Search string",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Regex", "Extended (\\n, \\t, \\x...)", "Simple string"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        let search = args[0].string;
        const type = args[0].option;

        if (type === "Regex" && search) {
            try {
                const regex = new RegExp(search, "gi"),
                    matches = input.match(regex);
                return matches.length;
            } catch (err) {
                return 0;
            }
        } else if (search) {
            if (type.indexOf("Extended") === 0) {
                search = Utils.parseEscapedChars(search);
            }
            return input.count(search);
        } else {
            return 0;
        }
    }

}

export default CountOccurrences;
