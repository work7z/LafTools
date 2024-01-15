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
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Power Set operation
 */
class PowerSet extends Operation {

    /**
     * Power set constructor
     */
    constructor() {
        super();

        this.name = "Power Set";
        this.module = "Default";
        this.description = "Calculates all the subsets of a set.";
        this.infoURL = "https://wikipedia.org/wiki/Power_set";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Item delimiter",
                type: "binaryString",
                value: ","
            },
        ];
    }

    /**
     * Generate the power set
     *
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        [this.itemDelimiter] = args;
        // Split and filter empty strings
        const inputArray = input.split(this.itemDelimiter).filter(a => a);

        if (inputArray.length) {
            return this.runPowerSet(inputArray);
        }

        return "";
    }

    /**
     * Return the power set of the inputted set.
     *
     * @param {Object[]} a
     * @returns {Object[]}
     */
    runPowerSet(a) {
        // empty array items getting picked up
        a = a.filter(i => i.length);
        if (!a.length) {
            return [];
        }

        /**
         * Decimal to binary function
         * @param {*} dec
         */
        const toBinary = (dec) => (dec >>> 0).toString(2);
        const result = new Set();
        // Get the decimal number to make a binary as long as the input
        const maxBinaryValue = parseInt(Number(a.map(i => "1").reduce((p, c) => p + c)), 2);
        // Make an array of each binary number from 0 to maximum
        const binaries = [...Array(maxBinaryValue + 1).keys()]
            .map(toBinary)
            .map(i => i.padStart(toBinary(maxBinaryValue).length, "0"));

        // XOR the input with each binary to get each unique permutation
        binaries.forEach((binary) => {
            const split = binary.split("");
            result.add(a.filter((item, index) => split[index] === "1"));
        });

        // map for formatting & put in length order.
        return [...result]
            .map(r => r.join(this.itemDelimiter)).sort((a, b) => a.length - b.length)
            .map(i => `${i}\n`).join("");
    }
}

export default PowerSet;
