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
 * @author MikeCAT
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";

/**
 * ROT13 Brute Force operation.
 */
class ROT13BruteForce extends Operation {
  /**
   * ROT13BruteForce constructor
   */
  constructor() {
    super();

    this.name = "ROT13 Brute Force";
    this.module = "Default";
    this.description =
      "Try all meaningful amounts for ROT13.<br><br>Optionally you can enter your known plaintext (crib) to filter the result.";
    this.infoURL = "https://wikipedia.org/wiki/ROT13";
    this.inputType = "byteArray";
    this.outputType = "string";
    this.args = [
      {
        name: "Rotate lower case chars",
        type: "boolean",
        value: true,
      },
      {
        name: "Rotate upper case chars",
        type: "boolean",
        value: true,
      },
      {
        name: "Rotate numbers",
        type: "boolean",
        value: false,
      },
      {
        name: "Sample length",
        type: "number",
        value: 100,
      },
      {
        name: "Sample offset",
        type: "number",
        value: 0,
      },
      {
        name: "Print amount",
        type: "boolean",
        value: true,
      },
      {
        name: "Crib (known plaintext string)",
        type: "string",
        value: "",
      },
    ];
  }

  /**
   * @param {byteArray} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [
      rotateLower,
      rotateUpper,
      rotateNum,
      sampleLength,
      sampleOffset,
      printAmount,
      crib,
    ] = args;
    const sample = input.slice(sampleOffset, sampleOffset + sampleLength);
    const cribLower = crib.toLowerCase();
    const lowerStart = "a".charCodeAt(0),
      upperStart = "A".charCodeAt(0),
      numStart = "0".charCodeAt(0);
    const result = [];
    for (let amount = 1; amount < 26; amount++) {
      const rotated = sample.slice();
      for (let i = 0; i < rotated.length; i++) {
        if (
          rotateLower &&
          lowerStart <= rotated[i] &&
          rotated[i] < lowerStart + 26
        ) {
          rotated[i] = ((rotated[i] - lowerStart + amount) % 26) + lowerStart;
        } else if (
          rotateUpper &&
          upperStart <= rotated[i] &&
          rotated[i] < upperStart + 26
        ) {
          rotated[i] = ((rotated[i] - upperStart + amount) % 26) + upperStart;
        } else if (
          rotateNum &&
          numStart <= rotated[i] &&
          rotated[i] < numStart + 10
        ) {
          rotated[i] = ((rotated[i] - numStart + amount) % 10) + numStart;
        }
      }
      const rotatedString = Utils.byteArrayToUtf8(rotated);
      if (rotatedString.toLowerCase().indexOf(cribLower) >= 0) {
        const rotatedStringEscaped = Utils.escapeWhitespace(rotatedString);
        if (printAmount) {
          const amountStr = "Amount = " + (" " + amount).slice(-2) + ": ";
          result.push(amountStr + rotatedStringEscaped);
        } else {
          result.push(rotatedStringEscaped);
        }
      }
    }
    return result.join("\n");
  }
}

export default ROT13BruteForce;
