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
import OperationError from "../errors/OperationError.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * To Charcode operation
 */
class ToCharcode extends Operation {
  /**
   * ToCharcode constructor
   */
  constructor() {
    super();

    this.name = "To Charcode";
    this.module = "Default";
    this.description =
      "Converts text to its unicode character code equivalent.<br><br>e.g. <code>Γειά σου</code> becomes <code>0393 03b5 03b9 03ac 20 03c3 03bf 03c5</code>";
    this.infoURL = "https://wikipedia.org/wiki/Plane_(Unicode)";
    this.inputType = "string";
    this.outputType = "string";
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
   * @returns {string}
   *
   * @throws {OperationError} if base argument out of range
   */
  run(input, args) {
    const delim = Utils.charRep(args[0] || "Space"),
      base = args[1];
    let output = "",
      padding,
      ordinal;

    if (base < 2 || base > 36) {
      throw new OperationError("Error: Base argument must be between 2 and 36");
    }

    const charcode = Utils.strToCharcode(input);
    for (let i = 0; i < charcode.length; i++) {
      ordinal = charcode[i];

      if (base === 16) {
        if (ordinal < 256) padding = 2;
        else if (ordinal < 65536) padding = 4;
        else if (ordinal < 16777216) padding = 6;
        else if (ordinal < 4294967296) padding = 8;
        else padding = 2;

        if (padding > 2 && isWorkerEnvironment())
          self.setOption("attemptHighlight", false);

        output += Utils.hex(ordinal, padding) + delim;
      } else {
        if (isWorkerEnvironment()) self.setOption("attemptHighlight", false);
        output += ordinal.toString(base) + delim;
      }
    }

    return output.slice(0, -delim.length);
  }
}

export default ToCharcode;
