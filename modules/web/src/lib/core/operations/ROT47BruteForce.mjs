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
 * @author MikeCAT
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";

/**
 * ROT47 Brute Force operation.
 */
class ROT47BruteForce extends Operation {

    /**
     * ROT47BruteForce constructor
     */
    constructor() {
        super();

        this.name = "ROT47 Brute Force";
        this.module = "Default";
        this.description = "Try all meaningful amounts for ROT47.<br><br>Optionally you can enter your known plaintext (crib) to filter the result.";
        this.infoURL = "https://wikipedia.org/wiki/ROT13#Variants";
        this.inputType = "byteArray";
        this.outputType = "string";
        this.args = [
            {
                name: "Sample length",
                type: "number",
                value: 100
            },
            {
                name: "Sample offset",
                type: "number",
                value: 0
            },
            {
                name: "Print amount",
                type: "boolean",
                value: true
            },
            {
                name: "Crib (known plaintext string)",
                type: "string",
                value: ""
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [sampleLength, sampleOffset, printAmount, crib] = args;
        const sample = input.slice(sampleOffset, sampleOffset + sampleLength);
        const cribLower = crib.toLowerCase();
        const result = [];
        for (let amount = 1; amount < 94; amount++) {
            const rotated = sample.slice();
            for (let i = 0; i < rotated.length; i++) {
                if (33 <= rotated[i] && rotated[i] <= 126) {
                    rotated[i] = (rotated[i] - 33 + amount) % 94 + 33;
                }
            }
            const rotatedString = Utils.byteArrayToUtf8(rotated);
            if (rotatedString.toLowerCase().indexOf(cribLower) >= 0) {
                const rotatedStringEscaped = Utils.escapeWhitespace(rotatedString);
                if (printAmount) {
                    const amountStr = "Amount = " + (" " + amount).slice(-2) + ": ";
                    result.push(amountStr + rotatedStringEscaped);
                } else {
                    result.push(rotatedStringEscaped);
                }
            }
        }
        return result.join("\n");
    }
}

export default ROT47BruteForce;
