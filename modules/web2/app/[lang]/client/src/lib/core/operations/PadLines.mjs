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
 * Pad lines operation
 */
class PadLines extends Operation {
  /**
   * PadLines constructor
   */
  constructor() {
    super();

    this.name = "Pad lines";
    this.module = "Default";
    this.description =
      "Add the specified number of the specified character to the beginning or end of each line";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Position",
        type: "option",
        value: ["Start", "End"],
      },
      {
        name: "Length",
        type: "number",
        value: 5,
      },
      {
        name: "Character",
        type: "binaryShortString",
        value: " ",
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [position, len, chr] = args,
      lines = input.split("\n");
    let output = "",
      i = 0;

    if (position === "Start") {
      for (i = 0; i < lines.length; i++) {
        output += lines[i].padStart(lines[i].length + len, chr) + "\n";
      }
    } else if (position === "End") {
      for (i = 0; i < lines.length; i++) {
        output += lines[i].padEnd(lines[i].length + len, chr) + "\n";
      }
    }

    return output.slice(0, output.length - 1);
  }
}

export default PadLines;
