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
 * @author bwhitn [brian.m.whitney@outlook.com]
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import { mean, createNumArray } from "../lib/Arithmetic.mjs";
import { ARITHMETIC_DELIM_OPTIONS } from "../lib/Delim.mjs";
import BigNumber from "bignumber.js";

/**
 * Mean operation
 */
class Mean extends Operation {
  /**
   * Mean constructor
   */
  constructor() {
    super();

    this.name = "Mean";
    this.module = "Default";
    this.description =
      "Computes the mean (average) of a number list. If an item in the string is not a number it is excluded from the list.<br><br>e.g. <code>0x0a 8 .5 .5</code> becomes <code>4.75</code>";
    this.infoURL = "https://wikipedia.org/wiki/Arithmetic_mean";
    this.inputType = "string";
    this.outputType = "BigNumber";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: ARITHMETIC_DELIM_OPTIONS,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {BigNumber}
   */
  run(input, args) {
    const val = mean(createNumArray(input, args[0]));
    return BigNumber.isBigNumber(val) ? val : new BigNumber(NaN);
  }
}

export default Mean;
