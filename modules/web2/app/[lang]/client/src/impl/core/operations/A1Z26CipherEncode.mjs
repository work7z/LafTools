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
 * @author Jarmo van Lenthe [github.com/jarmovanlenthe]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";
import { DELIM_OPTIONS } from "../lib/Delim.mjs";

/**
 * A1Z26 Cipher Encode operation
 */
class A1Z26CipherEncode extends Operation {
  /**
   * A1Z26CipherEncode constructor
   */
  constructor() {
    super();

    this.name = "A1Z26 Cipher Encode";
    this.module = "Ciphers";
    this.description =
      "Converts alphabet characters into their corresponding alphabet order number.<br><br>e.g. <code>a</code> becomes <code>1</code> and <code>b</code> becomes <code>2</code>.<br><br>Non-alphabet characters are dropped.";
    this.infoURL = "";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: DELIM_OPTIONS,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const delim = Utils.charRep(args[0] || "Space");
    let output = "";

    const sanitizedinput = input.toLowerCase(),
      charcode = Utils.strToCharcode(sanitizedinput);

    for (let i = 0; i < charcode.length; i++) {
      const ordinal = charcode[i] - 96;

      if (ordinal > 0 && ordinal <= 26) {
        output += ordinal.toString(10) + delim;
      }
    }
    return output.slice(0, -delim.length);
  }
}

export default A1Z26CipherEncode;
