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
import OperationError from "../errors/OperationError.mjs";
import JSSHA3 from "js-sha3";

/**
 * Shake operation
 */
class Shake extends Operation {

    /**
     * Shake constructor
     */
    constructor() {
        super();

        this.name = "Shake";
        this.module = "Crypto";
        this.description = "Shake is an Extendable Output Function (XOF) of the SHA-3 hash algorithm, part of the Keccak family, allowing for variable output length/size.";
        this.infoURL = "https://wikipedia.org/wiki/SHA-3#Instances";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Capacity",
                "type": "option",
                "value": ["256", "128"]
            },
            {
                "name": "Size",
                "type": "number",
                "value": 512
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const capacity = parseInt(args[0], 10),
            size = args[1];
        let algo;

        if (size < 0)
            throw new OperationError("Size must be greater than 0");

        switch (capacity) {
            case 128:
                algo = JSSHA3.shake128;
                break;
            case 256:
                algo = JSSHA3.shake256;
                break;
            default:
                throw new OperationError("Invalid size");
        }

        return algo(input, size);
    }

}

export default Shake;
