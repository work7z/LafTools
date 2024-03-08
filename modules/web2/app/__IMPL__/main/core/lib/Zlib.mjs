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
 * Zlib exports.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

// import zlibAndGzip from "zlibjs/bin/zlib_and_gzip.min.js";
var zlibAndGzip = require("zlibjs/bin/zlib_and_gzip.min.js");

const Zlib = zlibAndGzip.Zlib;

export const COMPRESSION_TYPE = ["Dynamic Huffman Coding", "Fixed Huffman Coding", "None (Store)"];
export const INFLATE_BUFFER_TYPE = ["Adaptive", "Block"];
export const ZLIB_COMPRESSION_TYPE_LOOKUP = {
    "Fixed Huffman Coding":   Zlib.Deflate.CompressionType.FIXED,
    "Dynamic Huffman Coding": Zlib.Deflate.CompressionType.DYNAMIC,
    "None (Store)":           Zlib.Deflate.CompressionType.NONE,
};
