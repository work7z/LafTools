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
import JSSHA3 from "js-sha3";
import OperationError from "../errors/OperationError.mjs";

/**
 * Keccak operation
 */
class Keccak extends Operation {
  /**
   * Keccak constructor
   */
  constructor() {
    super();

    this.name = "Keccak";
    this.module = "Crypto";
    this.description =
      "The Keccak hash algorithm was designed by Guido Bertoni, Joan Daemen, Micha\xebl Peeters, and Gilles Van Assche, building upon RadioGat\xfan. It was selected as the winner of the SHA-3 design competition.<br><br>This version of the algorithm is Keccak[c=2d] and differs from the SHA-3 specification.";
    this.infoURL = "https://wikipedia.org/wiki/SHA-3";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Size",
        type: "option",
        value: ["512", "384", "256", "224"],
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const size = parseInt(args[0], 10);
    let algo;

    switch (size) {
      case 224:
        algo = JSSHA3.keccak224;
        break;
      case 384:
        algo = JSSHA3.keccak384;
        break;
      case 256:
        algo = JSSHA3.keccak256;
        break;
      case 512:
        algo = JSSHA3.keccak512;
        break;
      default:
        throw new OperationError("Invalid size");
    }

    return algo(input);
  }
}

export default Keccak;
