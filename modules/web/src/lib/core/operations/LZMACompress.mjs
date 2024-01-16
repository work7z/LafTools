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
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

import { compress } from "@blu3r4y/lzma";
import {isWorkerEnvironment} from "../Utils.mjs";

/**
 * LZMA Compress operation
 */
class LZMACompress extends Operation {

    /**
     * LZMACompress constructor
     */
    constructor() {
        super();

        this.name = "LZMA Compress";
        this.module = "Compression";
        this.description = "Compresses data using the Lempel\u2013Ziv\u2013Markov chain algorithm. Compression mode determines the speed and effectiveness of the compression: 1 is fastest and less effective, 9 is slowest and most effective";
        this.infoURL = "https://wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "Compression Mode",
                type: "option",
                value: [
                    "1", "2", "3", "4", "5", "6", "7", "8", "9"
                ],
                "defaultIndex": 6
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        const mode = Number(args[0]);
        return new Promise((resolve, reject) => {
            compress(new Uint8Array(input), mode, (result, error) => {
                if (error) {
                    reject(new OperationError(`Failed to compress input: ${error.message}`));
                }
                // The compression returns as an Int8Array, but we can just get the unsigned data from the buffer
                resolve(new Int8Array(result).buffer);
            }, (percent) => {
                if (isWorkerEnvironment()) self.sendStatusMessage(`Compressing input: ${(percent*100).toFixed(2)}%`);
            });
        });
    }

}

export default LZMACompress;
