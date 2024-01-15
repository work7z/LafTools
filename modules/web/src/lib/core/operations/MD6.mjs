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
import NodeMD6 from "node-md6";

/**
 * MD6 operation
 */
class MD6 extends Operation {

    /**
     * MD6 constructor
     */
    constructor() {
        super();

        this.name = "MD6";
        this.module = "Crypto";
        this.description = "The MD6 (Message-Digest 6) algorithm is a cryptographic hash function. It uses a Merkle tree-like structure to allow for immense parallel computation of hashes for very long inputs.";
        this.infoURL = "https://wikipedia.org/wiki/MD6";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Size",
                "type": "number",
                "value": 256
            },
            {
                "name": "Levels",
                "type": "number",
                "value": 64
            },
            {
                "name": "Key",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [size, levels, key] = args;

        if (size < 0 || size > 512)
            throw new OperationError("Size must be between 0 and 512");
        if (levels < 0)
            throw new OperationError("Levels must be greater than 0");

        return NodeMD6.getHashOfText(input, size, key, levels);
    }

}

export default MD6;
