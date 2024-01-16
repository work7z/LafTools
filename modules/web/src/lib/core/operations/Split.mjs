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
import {SPLIT_DELIM_OPTIONS, JOIN_DELIM_OPTIONS} from "../lib/Delim.mjs";

/**
 * Split operation
 */
class Split extends Operation {

    /**
     * Split constructor
     */
    constructor() {
        super();

        this.name = "Split";
        this.module = "Default";
        this.description = "Splits a string into sections around a given delimiter.";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Split delimiter",
                "type": "editableOptionShort",
                "value": SPLIT_DELIM_OPTIONS
            },
            {
                "name": "Join delimiter",
                "type": "editableOptionShort",
                "value": JOIN_DELIM_OPTIONS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const splitDelim = args[0],
            joinDelim = args[1],
            sections = input.split(splitDelim);

        return sections.join(joinDelim);
    }

}

export default Split;
