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

import Operation from "../Operation.tsx";

/**
 * ROT13 operation.
 */
class ROT13 extends Operation {
  /**
   * ROT13 constructor
   */
  constructor() {
    super();

    this.name = "ROT13";
    this.module = "Default";
    this.description =
      "A simple caesar substitution cipher which rotates alphabet characters by the specified amount (default 13).";
    this.infoURL = "https://wikipedia.org/wiki/ROT13";
    this.inputType = "byteArray";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "Rotate lower case chars",
        type: "boolean",
        value: true,
      },
      {
        name: "Rotate upper case chars",
        type: "boolean",
        value: true,
      },
      {
        name: "Rotate numbers",
        type: "boolean",
        value: false,
      },
      {
        name: "Amount",
        type: "number",
        value: 13,
      },
    ];
  }

  /**
   * @param {byteArray} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const output = input,
      rot13Lowercase = args[0],
      rot13Upperacse = args[1],
      rotNumbers = args[2];
    let amount = args[3],
      chr;

    if (amount) {
      if (amount < 0) {
        amount = 26 - (Math.abs(amount) % 26);
      }

      for (let i = 0; i < input.length; i++) {
        chr = input[i];
        if (rot13Upperacse && chr >= 65 && chr <= 90) {
          // Upper case
          chr = (chr - 65 + amount) % 26;
          output[i] = chr + 65;
        } else if (rot13Lowercase && chr >= 97 && chr <= 122) {
          // Lower case
          chr = (chr - 97 + amount) % 26;
          output[i] = chr + 97;
        } else if (rotNumbers && chr >= 48 && chr <= 57) {
          // Numbers
          chr = (chr - 48 + amount) % 10;
          output[i] = chr + 48;
        }
      }
    }
    return output;
  }

  /**
   * Highlight ROT13
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
   * Highlight ROT13 in reverse
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

export default ROT13;