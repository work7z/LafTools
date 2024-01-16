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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
// import gunzip from "zlibjs/bin/gunzip.min.js";
var gunzip = require("zlibjs/bin/gunzip.min.js");


const Zlib = gunzip.Zlib;

/**
 * Gunzip operation
 */
class Gunzip extends Operation {

    /**
     * Gunzip constructor
     */
    constructor() {
        super();

        this.name = "Gunzip";
        this.module = "Compression";
        this.description = "Decompresses data which has been compressed using the deflate algorithm with gzip headers.";
        this.infoURL = "https://wikipedia.org/wiki/Gzip";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.args = [];
        this.checks = [
            {
                pattern: "^\\x1f\\x8b\\x08",
                flags: "",
                args: []
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {File}
     */
    run(input, args) {
        const gzipObj = new Zlib.Gunzip(new Uint8Array(input));
        return new Uint8Array(gzipObj.decompress()).buffer;
    }

}

export default Gunzip;
