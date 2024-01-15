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
 * @author bwhitn [brian.m.whitney@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import cptable from "codepage";

/**
 * Citrix CTX1 Decode operation
 */
class CitrixCTX1Decode extends Operation {

    /**
     * CitrixCTX1Decode constructor
     */
    constructor() {
        super();

        this.name = "Citrix CTX1 Decode";
        this.module = "Encodings";
        this.description = "Decodes strings in a Citrix CTX1 password format to plaintext.";
        this.infoURL = "https://www.reddit.com/r/AskNetsec/comments/1s3r6y/citrix_ctx1_hash_decoding/";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = new Uint8Array(input);
        if (input.length % 4 !== 0) {
            throw new OperationError("Incorrect hash length");
        }
        const revinput = input.reverse();
        const result = [];
        let temp = 0;
        for (let i = 0; i < revinput.length; i += 2) {
            if (i + 2 >= revinput.length) {
                temp = 0;
            } else {
                temp = ((revinput[i + 2] - 0x41) & 0xf) ^ (((revinput[i + 3]- 0x41) << 4) & 0xf0);
            }
            temp = (((revinput[i] - 0x41) & 0xf) ^ (((revinput[i + 1] - 0x41) << 4) & 0xf0)) ^ 0xa5 ^ temp;
            result.push(temp);
        }
        // Decodes a utf-16le string
        return cptable.utils.decode(1200, result.reverse());
    }

}

export default CitrixCTX1Decode;
