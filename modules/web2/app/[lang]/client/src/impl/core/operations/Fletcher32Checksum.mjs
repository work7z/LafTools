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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";

/**
 * Fletcher-32 Checksum operation
 */
class Fletcher32Checksum extends Operation {
  /**
   * Fletcher32Checksum constructor
   */
  constructor() {
    super();

    this.name = "Fletcher-32 Checksum";
    this.module = "Crypto";
    this.description =
      "The Fletcher checksum is an algorithm for computing a position-dependent checksum devised by John Gould Fletcher at Lawrence Livermore Labs in the late 1970s.<br><br>The objective of the Fletcher checksum was to provide error-detection properties approaching those of a cyclic redundancy check but with the lower computational effort associated with summation techniques.";
    this.infoURL =
      "https://wikipedia.org/wiki/Fletcher%27s_checksum#Fletcher-32";
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
    let a = 0,
      b = 0;
    if (ArrayBuffer.isView(input)) {
      input = new DataView(input.buffer, input.byteOffset, input.byteLength);
    } else {
      input = new DataView(input);
    }

    for (let i = 0; i < input.byteLength - 1; i += 2) {
      a = (a + input.getUint16(i, true)) % 0xffff;
      b = (b + a) % 0xffff;
    }
    if (input.byteLength % 2 !== 0) {
      a = (a + input.getUint8(input.byteLength - 1)) % 0xffff;
      b = (b + a) % 0xffff;
    }

    return Utils.hex(((b << 16) | a) >>> 0, 8);
  }
}

export default Fletcher32Checksum;
