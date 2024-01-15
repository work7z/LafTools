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
 * @author Flavio Diez [flaviofdiez+cyberchef@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Rail Fence Cipher Encode operation
 */
class RailFenceCipherEncode extends Operation {

    /**
     * RailFenceCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "Rail Fence Cipher Encode";
        this.module = "Ciphers";
        this.description = "Encodes Strings using the Rail fence Cipher provided a key and an offset";
        this.infoURL = "https://wikipedia.org/wiki/Rail_fence_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Key",
                type: "number",
                value: 2
            },
            {
                name: "Offset",
                type: "number",
                value: 0
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [key, offset] = args;

        const plaintext = input;
        if (key < 2) {
            throw new OperationError("Key has to be bigger than 2");
        } else if (key > plaintext.length) {
            throw new OperationError("Key should be smaller than the plain text's length");
        }

        if (offset < 0) {
            throw new OperationError("Offset has to be a positive integer");
        }

        const cycle = (key - 1) * 2;
        const rows = new Array(key).fill("");

        for (let pos = 0; pos < plaintext.length; pos++) {
            const rowIdx = key - 1 - Math.abs(cycle / 2 - (pos + offset) % cycle);

            rows[rowIdx] += plaintext[pos];
        }

        return rows.join("").trim();
    }

}

export default RailFenceCipherEncode;
