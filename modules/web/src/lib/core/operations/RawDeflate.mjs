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
import {COMPRESSION_TYPE} from "../lib/Zlib.mjs";
var rawdeflate = require( "zlibjs/bin/rawdeflate.min.js");

const Zlib = rawdeflate.Zlib;

const RAW_COMPRESSION_TYPE_LOOKUP = {
    "Fixed Huffman Coding":   Zlib.RawDeflate.CompressionType.FIXED,
    "Dynamic Huffman Coding": Zlib.RawDeflate.CompressionType.DYNAMIC,
    "None (Store)":           Zlib.RawDeflate.CompressionType.NONE,
};

/**
 * Raw Deflate operation
 */
class RawDeflate extends Operation {

    /**
     * RawDeflate constructor
     */
    constructor() {
        super();

        this.name = "Raw Deflate";
        this.module = "Compression";
        this.description = "Compresses data using the deflate algorithm with no headers.";
        this.infoURL = "https://wikipedia.org/wiki/DEFLATE";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [
            {
                name: "Compression type",
                type: "option",
                value: COMPRESSION_TYPE
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        const deflate = new Zlib.RawDeflate(new Uint8Array(input), {
            compressionType: RAW_COMPRESSION_TYPE_LOOKUP[args[0]]
        });
        return new Uint8Array(deflate.compress()).buffer;
    }

}

export default RawDeflate;
