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
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import { toHexFast } from "../lib/Hex.mjs";

/**
 * GOST hash operation
 */
class GOSTHash extends Operation {

    /**
     * GOSTHash constructor
     */
    constructor() {
        super();

        this.name = "GOST Hash";
        this.module = "Hashing";
        this.description = "The GOST hash function, defined in the standards GOST R 34.11-94 and GOST 34.311-95 is a 256-bit cryptographic hash function. It was initially defined in the Russian national standard GOST R 34.11-94 <i>Information Technology – Cryptographic Information Security – Hash Function</i>. The equivalent standard used by other member-states of the CIS is GOST 34.311-95.<br><br>This function must not be confused with a different Streebog hash function, which is defined in the new revision of the standard GOST R 34.11-2012.<br><br>The GOST hash function is based on the GOST block cipher.";
        this.infoURL = "https://wikipedia.org/wiki/GOST_(hash_function)";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Algorithm",
                type: "argSelector",
                value: [
                    {
                        name: "GOST 28147 (1994)",
                        off: [1],
                        on: [2]
                    },
                    {
                        name: "GOST R 34.11 (Streebog, 2012)",
                        on: [1],
                        off: [2]
                    }
                ]
            },
            {
                name: "Digest length",
                type: "option",
                value: ["256", "512"]
            },
            {
                name: "sBox",
                type: "option",
                value: ["E-TEST", "E-A", "E-B", "E-C", "E-D", "E-SC", "E-Z", "D-TEST", "D-A", "D-SC"]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [version, length, sBox] = args;

        const versionNum = version === "GOST 28147 (1994)" ? 1994 : 2012;
        const algorithm = {
            name: versionNum === 1994 ? "GOST 28147" : "GOST R 34.10",
            version: versionNum,
            mode: "HASH"
        };

        if (versionNum === 1994) {
            algorithm.sBox = sBox;
        } else {
            algorithm.length = parseInt(length, 10);
        }

        try {
            const gostDigest = new GostDigest(algorithm);

            return toHexFast(gostDigest.digest(input));
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default GOSTHash;
