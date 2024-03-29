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

/**
 * Bit shift right operation
 */
class BitShiftRight extends Operation {
  /**
   * BitShiftRight constructor
   */
  constructor() {
    super();

    this.name = "Bit shift right";
    this.module = "Default";
    this.description =
      "Shifts the bits in each byte towards the right by the specified amount.<br><br><i>Logical shifts</i> replace the leftmost bits with zeros.<br><i>Arithmetic shifts</i> preserve the most significant bit (MSB) of the original byte keeping the sign the same (positive or negative).";
    this.infoURL = "https://wikipedia.org/wiki/Bitwise_operation#Bit_shifts";
    this.inputType = "ArrayBuffer";
    this.outputType = "ArrayBuffer";
    this.args = [
      {
        name: "Amount",
        type: "number",
        value: 1,
      },
      {
        name: "Type",
        type: "option",
        value: ["Logical shift", "Arithmetic shift"],
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   */
  run(input, args) {
    const amount = args[0],
      type = args[1],
      mask = type === "Logical shift" ? 0 : 0x80;
    input = new Uint8Array(input);

    return input.map((b) => {
      return (b >>> amount) ^ (b & mask);
    }).buffer;
  }

  /**
   * Highlight Bit shift right
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    return pos;
  }

  /**
   * Highlight Bit shift right in reverse
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    return pos;
  }
}

export default BitShiftRight;
