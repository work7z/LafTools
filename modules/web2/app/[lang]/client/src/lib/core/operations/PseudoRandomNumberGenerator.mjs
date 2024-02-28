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
import forge from "node-forge";
import BigNumber from "bignumber.js";
import { isWorkerEnvironment } from "../Utils.mjs";

/**
 * Pseudo-Random Number Generator operation
 */
class PseudoRandomNumberGenerator extends Operation {
  /**
   * PseudoRandomNumberGenerator constructor
   */
  constructor() {
    super();

    this.name = "Pseudo-Random Number Generator";
    this.module = "Ciphers";
    this.description =
      "A cryptographically-secure pseudo-random number generator (PRNG).<br><br>This operation uses the browser's built-in <code>crypto.getRandomValues()</code> method if available. If this cannot be found, it falls back to a Fortuna-based PRNG algorithm.";
    this.infoURL = "https://wikipedia.org/wiki/Pseudorandom_number_generator";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Number of bytes",
        type: "number",
        value: 32,
      },
      {
        name: "Output as",
        type: "option",
        value: ["Hex", "Integer", "Byte array", "Raw"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [numBytes, outputAs] = args;

    let bytes;

    if (isWorkerEnvironment() && self.crypto) {
      bytes = new ArrayBuffer(numBytes);
      const CHUNK_SIZE = 65536;
      for (let i = 0; i < numBytes; i += CHUNK_SIZE) {
        self.crypto.getRandomValues(
          new Uint8Array(bytes, i, Math.min(numBytes - i, CHUNK_SIZE)),
        );
      }
      bytes = Utils.arrayBufferToStr(bytes);
    } else {
      bytes = forge.random.getBytesSync(numBytes);
    }

    let value = new BigNumber(0),
      i;

    switch (outputAs) {
      case "Hex":
        return forge.util.bytesToHex(bytes);
      case "Integer":
        for (i = bytes.length - 1; i >= 0; i--) {
          value = value.times(256).plus(bytes.charCodeAt(i));
        }
        return value.toFixed();
      case "Byte array":
        return JSON.stringify(Utils.strToCharcode(bytes));
      case "Raw":
      default:
        return bytes;
    }
  }
}

export default PseudoRandomNumberGenerator;
