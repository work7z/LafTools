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
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils.tsx";
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
 * From BCD operation
 */
class FromBCD extends Operation {
  /**
   * FromBCD constructor
   */
  constructor() {
    super();

    this.name = "From BCD";
    this.module = "Default";
    this.description = Dot("0YKce", "Converts a Binary-Coded Decimal (BCD) string to a decimal number.")
    this.inputType = "string";
    this.outputType = "BigNumber";
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
        name: "Input format",
        type: "option",
        value: FORMAT,
      },
    ];
    this.checks = [
      {
        pattern: "^(?:\\d{4} ){3,}\\d{4}$",
        flags: "",
        args: ["8 4 2 1", true, false, "Nibbles"],
      },
    ];
    this.exampleInput = "0001 0010 0011 0100";
    this.exampleOutput = "1234";
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {BigNumber}
   */
  run(input, args) {
    const encoding = ENCODING_LOOKUP[args[0]],
      packed = args[1],
      signed = args[2],
      inputFormat = args[3],
      nibbles: any = [];

    let output = "",
      byteArray;

    // Normalise the input
    switch (inputFormat) {
      case "Nibbles":
      case "Bytes":
        input = input.replace(/\s/g, "");
        for (let i = 0; i < input.length; i += 4) {
          nibbles.push(parseInt(input.substr(i, 4), 2));
        }
        break;
      case "Raw":
      default:
        byteArray = new Uint8Array(Utils.strToArrayBuffer(input));
        byteArray.forEach((b) => {
          nibbles.push(b >>> 4);
          nibbles.push(b & 15);
        });
        break;
    }

    if (!packed) {
      // Discard each high nibble
      for (let i = 0; i < nibbles.length; i++) {
        nibbles.splice(i, 1); // lgtm [js/loop-iteration-skipped-due-to-shifting]
      }
    }

    if (signed) {
      const sign = nibbles.pop();
      if (sign === 13 || sign === 11) {
        // Negative
        output += "-";
      }
    }

    nibbles.forEach((n) => {
      if (isNaN(n)) throw new OperationError("Invalid input");
      const val = encoding.indexOf(n);
      if (val < 0)
        throw new OperationError(
          `Value ${Utils.bin(n, 4)} is not in the encoding scheme`,
        );
      output += val.toString();
    });

    return new BigNumber(output);
  }
}

export default FromBCD;
