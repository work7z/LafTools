// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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
 * @author crespyl [peter@crespyl.net]
 * @copyright Peter Jacobs 2021
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";

import {
  COMPRESSION_OUTPUT_FORMATS,
  COMPRESSION_FUNCTIONS,
} from "../lib/LZString.mjs";

/**
 * LZString Compress operation
 */
class LZStringCompress extends Operation {
  /**
   * LZStringCompress constructor
   */
  constructor() {
    super();

    this.name = "LZString Compress";
    this.module = "Compression";
    this.description = "Compress the input with lz-string.";
    this.infoURL = "https://pieroxy.net/blog/pages/lz-string/index.html";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Compression Format",
        type: "option",
        defaultIndex: 0,
        value: COMPRESSION_OUTPUT_FORMATS,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const compress = COMPRESSION_FUNCTIONS[args[0]];
    if (compress) {
      return compress(input);
    } else {
      throw new OperationError("Unable to find compression function");
    }
  }
}

export default LZStringCompress;
