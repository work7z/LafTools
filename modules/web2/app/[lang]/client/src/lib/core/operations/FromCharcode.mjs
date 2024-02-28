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
import { DELIM_OPTIONS } from "../lib/Delim.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * From Charcode operation
 */
class FromCharcode extends Operation {
  /**
   * FromCharcode constructor
   */
  constructor() {
    super();

    this.name = "From Charcode";
    this.module = "Default";
    this.description =
      "Converts unicode character codes back into text.<br><br>e.g. <code>0393 03b5 03b9 03ac 20 03c3 03bf 03c5</code> becomes <code>Γειά σου</code>";
    this.infoURL = "https://wikipedia.org/wiki/Plane_(Unicode)";
    this.inputType = "string";
    this.outputType = "ArrayBuffer";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: DELIM_OPTIONS,
      },
      {
        name: "Base",
        type: "number",
        value: 16,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   *
   * @throws {OperationError} if base out of range
   */
  run(input, args) {
    const delim = Utils.charRep(args[0] || "Space"),
      base = args[1];
    let bites = input.split(delim),
      i = 0;

    if (base < 2 || base > 36) {
      throw new OperationError("Error: Base argument must be between 2 and 36");
    }

    if (input.length === 0) {
      return new ArrayBuffer();
    }

    if (base !== 16 && isWorkerEnvironment())
      self.setOption("attemptHighlight", false);

    // Split into groups of 2 if the whole string is concatenated and
    // too long to be a single character
    if (bites.length === 1 && input.length > 17) {
      bites = [];
      for (i = 0; i < input.length; i += 2) {
        bites.push(input.slice(i, i + 2));
      }
    }

    let latin1 = "";
    for (i = 0; i < bites.length; i++) {
      latin1 += Utils.chr(parseInt(bites[i], base));
    }
    return Utils.strToArrayBuffer(latin1);
  }
}

export default FromCharcode;
