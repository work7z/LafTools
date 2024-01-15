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
import {INPUT_DELIM_OPTIONS} from "../lib/Delim.mjs";
import {caseInsensitiveSort, ipSort, numericSort, hexadecimalSort, lengthSort} from "../lib/Sort.mjs";

/**
 * Sort operation
 */
class Sort extends Operation {

    /**
     * Sort constructor
     */
    constructor() {
        super();

        this.name = "Sort";
        this.module = "Default";
        this.description = "Alphabetically sorts strings separated by the specified delimiter.<br><br>The IP address option supports IPv4 only.";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Delimiter",
                "type": "option",
                "value": INPUT_DELIM_OPTIONS
            },
            {
                "name": "Reverse",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Order",
                "type": "option",
                "value": ["Alphabetical (case sensitive)", "Alphabetical (case insensitive)", "IP address", "Numeric", "Numeric (hexadecimal)", "Length"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const delim = Utils.charRep(args[0]),
            sortReverse = args[1],
            order = args[2];
        let sorted = input.split(delim);

        if (order === "Alphabetical (case sensitive)") {
            sorted = sorted.sort();
        } else if (order === "Alphabetical (case insensitive)") {
            sorted = sorted.sort(caseInsensitiveSort);
        } else if (order === "IP address") {
            sorted = sorted.sort(ipSort);
        } else if (order === "Numeric") {
            sorted = sorted.sort(numericSort);
        } else if (order === "Numeric (hexadecimal)") {
            sorted = sorted.sort(hexadecimalSort);
        } else if (order === "Length") {
            sorted = sorted.sort(lengthSort);
        }

        if (sortReverse) sorted.reverse();
        return sorted.join(delim);
    }

}

export default Sort;
