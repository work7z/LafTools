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
import Utils from "../Utils.mjs";
import { bitOp, add, BITWISE_OP_DELIMS } from "../lib/BitwiseOp.mjs";

/**
 * ADD operation
 */
class ADD extends Operation {
  /**
   * ADD constructor
   */
  constructor() {
    super();

    this.name = "ADD";
    this.module = "Default";
    this.description =
      "ADD the input with the given key (e.g. <code>fe023da5</code>), MOD 255";
    this.infoURL =
      "https://wikipedia.org/wiki/Bitwise_operation#Bitwise_operators";
    this.inputType = "byteArray";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "Key",
        type: "toggleString",
        value: "",
        toggleValues: BITWISE_OP_DELIMS,
      },
    ];
  }

  /**
   * @param {byteArray} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const key = Utils.convertToByteArray(args[0].string || "", args[0].option);

    return bitOp(input, key, add);
  }

  /**
   * Highlight ADD
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
   * Highlight ADD in reverse
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

export default ADD;
