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
 * lz-string exports.
 *
 * @author crespyl [peter@crespyl.net]
 * @copyright Peter Jacobs 2021
 * @license Apache-2.0
 */

import LZString from "lz-string";

export const COMPRESSION_OUTPUT_FORMATS = ["default", "UTF16", "Base64"];
export const COMPRESSION_FUNCTIONS = {
    "default": LZString.compress,
    "UTF16":   LZString.compressToUTF16,
    "Base64":  LZString.compressToBase64,
};
export const DECOMPRESSION_FUNCTIONS = {
    "default": LZString.decompress,
    "UTF16":   LZString.decompressFromUTF16,
    "Base64":  LZString.decompressFromBase64,
};
