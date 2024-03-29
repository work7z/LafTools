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
import { INPUT_DELIM_OPTIONS } from "../lib/Delim.mjs";

/**
 * Head operation
 */
class Head extends Operation {
  /**
   * Head constructor
   */
  constructor() {
    super();

    this.name = "Head";
    this.module = "Default";
    this.description =
      "Like the UNIX head utility.<br>Gets the first n lines.<br>You can select all but the last n lines by entering a negative value for n.<br>The delimiter can be changed so that instead of lines, fields (i.e. commas) are selected instead.";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: INPUT_DELIM_OPTIONS,
      },
      {
        name: "Number",
        type: "number",
        value: 10,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    let delimiter = args[0];
    const number = args[1];

    delimiter = Utils.charRep(delimiter);
    const splitInput = input.split(delimiter);

    return splitInput
      .filter((line, lineIndex) => {
        lineIndex += 1;

        if (number < 0) {
          return lineIndex <= splitInput.length + number;
        } else {
          return lineIndex <= number;
        }
      })
      .join(delimiter);
  }
}

export default Head;
