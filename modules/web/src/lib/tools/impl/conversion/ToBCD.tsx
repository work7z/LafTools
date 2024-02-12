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
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import { Dot } from "../../../../utils/TranslationUtils.tsx";
import Operation from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import OperationError from "../../../core/errors/OperationError.mjs";
import {
  ENCODING_SCHEME,
  ENCODING_LOOKUP,
  FORMAT,
} from "../../../core/lib/BCD.mjs";
import BigNumber from "bignumber.js";

/**
 * To BCD operation
 */
class ToBCD extends Operation {
  /**
   * ToBCD constructor
   */
  constructor() {
    super();

    this.name = "To BCD";
    this.module = "Default";
    // this.description =;
    this.infoURL = "https://wikipedia.org/wiki/Binary-coded_decimal";
    this.inputType = "BigNumber";
    this.outputType = "string";
    this.args = [
      {
        name: "Scheme",
        type: "option",
        value: ENCODING_SCHEME,
      },
      {
        name: "Packed",
        type: "boolean",
        value: true,
      },
      {
        name: "Signed",
        type: "boolean",
        value: false,
      },
      {
        name: "Output format",
        type: "option",
        value: FORMAT,
      },
    ];

    this.description = Dot("98KcL","Converts a decimal number to Binary-Coded Decimal (BCD).");
    this.exampleInput="1234";
    this.exampleOutput = "0001 0010 0011 0100";
  }

  /**
   * @param {BigNumber} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    if (input.isNaN()) throw new OperationError("Invalid input");
    if (!input.integerValue(BigNumber.ROUND_DOWN).isEqualTo(input))
      throw new OperationError("Fractional values are not supported by BCD");

    const encoding:any = ENCODING_LOOKUP[args[0]],
      packed = args[1],
      signed = args[2],
      outputFormat = args[3];

    // Split input number up into separate digits
    const digits = input.toFixed().split("");

    if (digits[0] === "-" || digits[0] === "+") {
      digits.shift();
    }

    let nibbles:any = [];

    digits.forEach((d) => {
      const n = parseInt(d, 10);
      nibbles.push(encoding[n]);
    });

    if (signed) {
      if (packed && digits.length % 2 === 0) {
        // If there are an even number of digits, we add a leading 0 so
        // that the sign nibble doesn't sit in its own byte, leading to
        // ambiguity around whether the number ends with a 0 or not.
        nibbles.unshift(encoding[0]);
      }

      nibbles.push(input > 0 ? 12 : 13);
      // 12 ("C") for + (credit)
      // 13 ("D") for - (debit)
    }

    let bytes:any = [];

    if (packed) {
      let encoded = 0,
        little = false;

      nibbles.forEach((n) => {
        encoded ^= little ? n : n << 4;
        if (little) {
          bytes.push(encoded);
          encoded = 0;
        }
        little = !little;
      });

      if (little) bytes.push(encoded);
    } else {
      bytes = nibbles;

      // Add null high nibbles
      nibbles = nibbles
        .map((n) => {
          return [0, n];
        })
        .reduce((a, b) => {
          return a.concat(b);
        });
    }

    // Output
    switch (outputFormat) {
      case "Nibbles":
        return nibbles
          .map((n) => {
            return n.toString(2).padStart(4, "0");
          })
          .join(" ");
      case "Bytes":
        return bytes
          .map((b) => {
            return b.toString(2).padStart(8, "0");
          })
          .join(" ");
      case "Raw":
      default:
        return Utils.byteArrayToChars(bytes);
    }
  }
}

export default ToBCD;