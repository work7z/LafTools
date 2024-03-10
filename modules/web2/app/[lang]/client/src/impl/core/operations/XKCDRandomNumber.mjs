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
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * XKCD Random Number operation
 */
class XKCDRandomNumber extends Operation {
  /**
   * XKCDRandomNumber constructor
   */
  constructor() {
    super();

    this.name = "XKCD Random Number";
    this.module = "Default";
    this.description =
      "RFC 1149.5 specifies 4 as the standard IEEE-vetted random number.";
    this.infoURL = "https://xkcd.com/221/";
    this.inputType = "string";
    this.outputType = "number";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {number}
   */
  run(input, args) {
    return 4; // chosen by fair dice roll.
    // guaranteed to be random.
  }
}

export default XKCDRandomNumber;
