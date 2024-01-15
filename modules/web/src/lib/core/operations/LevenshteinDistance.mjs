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
 * @author mikecat
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Levenshtein Distance operation
 */
class LevenshteinDistance extends Operation {

    /**
     * LevenshteinDistance constructor
     */
    constructor() {
        super();

        this.name = "Levenshtein Distance";
        this.module = "Default";
        this.description = "Levenshtein Distance (also known as Edit Distance) is a string metric to measure a difference between two strings that counts operations (insertions, deletions, and substitutions) on single character that are required to change one string to another.";
        this.infoURL = "https://wikipedia.org/wiki/Levenshtein_distance";
        this.inputType = "string";
        this.outputType = "number";
        this.args = [
            {
                name: "Sample delimiter",
                type: "binaryString",
                value: "\\n"
            },
            {
                name: "Insertion cost",
                type: "number",
                value: 1
            },
            {
                name: "Deletion cost",
                type: "number",
                value: 1
            },
            {
                name: "Substitution cost",
                type: "number",
                value: 1
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        const [delim, insCost, delCost, subCost] = args;
        const samples = input.split(delim);
        if (samples.length !== 2) {
            throw new OperationError("Incorrect number of samples. Check your input and/or delimiter.");
        }
        if (insCost < 0 || delCost < 0 || subCost < 0) {
            throw new OperationError("Negative costs are not allowed.");
        }
        const src = samples[0], dest = samples[1];
        let currentCost = new Array(src.length + 1);
        let nextCost = new Array(src.length + 1);
        for (let i = 0; i < currentCost.length; i++) {
            currentCost[i] = delCost * i;
        }
        for (let i = 0; i < dest.length; i++) {
            const destc = dest.charAt(i);
            nextCost[0] = currentCost[0] + insCost;
            for (let j = 0; j < src.length; j++) {
                let candidate;
                // insertion
                let optCost = currentCost[j + 1] + insCost;
                // deletion
                candidate = nextCost[j] + delCost;
                if (candidate < optCost) optCost = candidate;
                // substitution or matched character
                candidate = currentCost[j];
                if (src.charAt(j) !== destc) candidate += subCost;
                if (candidate < optCost) optCost = candidate;
                // store calculated cost
                nextCost[j + 1] = optCost;
            }
            const tempCost = nextCost;
            nextCost = currentCost;
            currentCost = tempCost;
        }

        return currentCost[currentCost.length - 1];
    }

}

export default LevenshteinDistance;
