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
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Permutate String operation
 */
class GetAllCasings extends Operation {

    /**
     * GetAllCasings constructor
     */
    constructor() {
        super();

        this.name = "Get All Casings";
        this.module = "Default";
        this.description = "Outputs all possible casing variations of a string.";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const length = input.length;
        const max = 1 << length;
        input = input.toLowerCase();
        let result = "";

        for (let i = 0; i < max; i++) {
            const temp = input.split("");
            for (let j = 0; j < length; j++) {
                if (((i >> j) & 1) === 1) {
                    temp[j] = temp[j].toUpperCase();
                }
            }
            result += temp.join("") + "\n";
        }
        return result.slice(0, -1);
    }
}

export default GetAllCasings;
