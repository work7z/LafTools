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
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Chi Square operation
 */
class ChiSquare extends Operation {

    /**
     * ChiSquare constructor
     */
    constructor() {
        super();

        this.name = "Chi Square";
        this.module = "Default";
        this.description = "Calculates the Chi Square distribution of values.";
        this.infoURL = "https://wikipedia.org/wiki/Chi-squared_distribution";
        this.inputType = "ArrayBuffer";
        this.outputType = "number";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        const data = new Uint8Array(input);
        const distArray = new Array(256).fill(0);
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            distArray[data[i]]++;
        }

        for (let i = 0; i < distArray.length; i++) {
            if (distArray[i] > 0) {
                total += Math.pow(distArray[i] - data.length / 256, 2) / (data.length / 256);
            }
        }

        return total;
    }

}

export default ChiSquare;
