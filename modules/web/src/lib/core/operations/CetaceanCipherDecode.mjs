// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
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
 * @author dolphinOnKeys [robin@weird.io]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Cetacean Cipher Decode operation
 */
class CetaceanCipherDecode extends Operation {

    /**
     * CetaceanCipherDecode constructor
     */
    constructor() {
        super();

        this.name = "Cetacean Cipher Decode";
        this.module = "Ciphers";
        this.description = "Decode Cetacean Cipher input. <br/><br/>e.g. <code>EEEEEEEEEeeEeEEEEEEEEEEEEeeEeEEe</code> becomes <code>hi</code>";
        this.infoURL = "https://hitchhikers.fandom.com/wiki/Dolphins";
        this.inputType = "string";
        this.outputType = "string";

        this.checks = [
            {
                pattern: "^(?:[eE]{16,})(?: [eE]{16,})*$",
                flags: "",
                args: []
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const binaryArray = [];
        for (const char of input) {
            if (char === " ") {
                binaryArray.push(...[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
            } else {
                binaryArray.push(char === "e" ? 1 : 0);
            }
        }

        const byteArray = [];

        for (let i = 0;  i < binaryArray.length; i += 16) {
            byteArray.push(binaryArray.slice(i, i + 16).join(""));
        }

        return byteArray.map(byte =>
            String.fromCharCode(parseInt(byte, 2))
        ).join("");
    }
}

export default CetaceanCipherDecode;
