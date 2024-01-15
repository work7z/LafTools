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
import BigNumber from "bignumber.js";
import OperationError from "../errors/OperationError.mjs";

/**
 * From Base operation
 */
class FromBase extends Operation {

    /**
     * FromBase constructor
     */
    constructor() {
        super();

        this.name = "From Base";
        this.module = "Default";
        this.description = "Converts a number to decimal from a given numerical base.";
        this.infoURL = "https://wikipedia.org/wiki/Radix";
        this.inputType = "string";
        this.outputType = "BigNumber";
        this.args = [
            {
                "name": "Radix",
                "type": "number",
                "value": 36
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {BigNumber}
     */
    run(input, args) {
        const radix = args[0];
        if (radix < 2 || radix > 36) {
            throw new OperationError("Error: Radix argument must be between 2 and 36");
        }

        const number = input.replace(/\s/g, "").split(".");
        let result = new BigNumber(number[0], radix);

        if (number.length === 1) return result;

        // Fractional part
        for (let i = 0; i < number[1].length; i++) {
            const digit = new BigNumber(number[1][i], radix);
            result += digit.div(Math.pow(radix, i+1));
        }

        return result;
    }

}

export default FromBase;
