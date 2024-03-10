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
 * Reverse operation
 */
class Reverse extends Operation {
  /**
   * Reverse constructor
   */
  constructor() {
    super();

    this.name = "Reverse";
    this.module = "Default";
    this.description = "Reverses the input string.";
    this.inputType = "byteArray";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "By",
        type: "option",
        value: ["Byte", "Character", "Line"],
        defaultIndex: 1,
      },
    ];
  }

  /**
   * @param {byteArray} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    let i;
    if (args[0] === "Line") {
      const lines = [];
      let line = [],
        result = [];
      for (i = 0; i < input.length; i++) {
        if (input[i] === 0x0a) {
          lines.push(line);
          line = [];
        } else {
          line.push(input[i]);
        }
      }
      lines.push(line);
      lines.reverse();
      for (i = 0; i < lines.length; i++) {
        result = result.concat(lines[i]);
        result.push(0x0a);
      }
      return result.slice(0, input.length);
    } else if (args[0] === "Character") {
      const inputString = Utils.byteArrayToUtf8(input);
      let result = "";
      for (let i = inputString.length - 1; i >= 0; i--) {
        const c = inputString.charCodeAt(i);
        if (i > 0 && 0xdc00 <= c && c <= 0xdfff) {
          const c2 = inputString.charCodeAt(i - 1);
          if (0xd800 <= c2 && c2 <= 0xdbff) {
            // surrogates
            result += inputString.charAt(i - 1);
            result += inputString.charAt(i);
            i--;
            continue;
          }
        }
        result += inputString.charAt(i);
      }
      return Utils.strToUtf8ByteArray(result);
    } else {
      return input.reverse();
    }
  }
}

export default Reverse;
