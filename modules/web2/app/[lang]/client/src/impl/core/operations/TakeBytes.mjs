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
 * Take bytes operation
 */
class TakeBytes extends Operation {
  /**
   * TakeBytes constructor
   */
  constructor() {
    super();

    this.name = "Take bytes";
    this.module = "Default";
    this.description =
      "Takes a slice of the specified number of bytes from the data. Negative values are allowed.";
    this.inputType = "ArrayBuffer";
    this.outputType = "ArrayBuffer";
    this.args = [
      {
        name: "Start",
        type: "number",
        value: 0,
      },
      {
        name: "Length",
        type: "number",
        value: 5,
      },
      {
        name: "Apply to each line",
        type: "boolean",
        value: false,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   *
   * @throws {OperationError} if invalid value
   */
  run(input, args) {
    let start = args[0],
      length = args[1];
    const applyToEachLine = args[2];

    if (!applyToEachLine) {
      if (start < 0) {
        // Take from the end
        start = input.byteLength + start;
      }

      if (length < 0) {
        // Flip start point
        start = start + length;
        if (start < 0) {
          start = input.byteLength + start;
          length = start - length;
        } else {
          length = -length;
        }
      }

      return input.slice(start, start + length);
    }

    // Split input into lines
    const data = new Uint8Array(input);
    const lines = [];
    let line = [],
      i;

    for (i = 0; i < data.length; i++) {
      if (data[i] === 0x0a) {
        lines.push(line);
        line = [];
      } else {
        line.push(data[i]);
      }
    }
    lines.push(line);

    let output = [];
    let s = start,
      l = length;
    for (i = 0; i < lines.length; i++) {
      if (s < 0) {
        // Take from the end
        s = lines[i].length + s;
      }

      if (l < 0) {
        // Flip start point
        s = s + l;
        if (s < 0) {
          s = lines[i].length + s;
          l = s - l;
        } else {
          l = -l;
        }
      }
      output = output.concat(lines[i].slice(s, s + l));
      output.push(0x0a);
      s = start;
      l = length;
    }
    return new Uint8Array(output.slice(0, output.length - 1)).buffer;
  }
}

export default TakeBytes;
