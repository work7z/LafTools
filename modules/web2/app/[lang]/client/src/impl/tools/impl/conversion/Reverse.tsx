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
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from "./_constants.tsx";

/**
 * Reverse operation
 */
class Reverse extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'text',
      config: {
        "module": "Default",
        "description": "Reverses the input string.",
        "infoURL": null,
        "inputType": "byteArray",
        "outputType": "byteArray",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "By",
            "type": "option",
            "value": [
              "Byte",
              "Character",
              "Line"
            ],
            "defaultIndex": 1
          }
        ]
      },
      nousenouseID: 'reverse',
      optName: Dot("f7Fp-L9V-", "Reverse"),
      infoURL: "https://en.wikipedia.org/wiki/Reverse_Polish_notation",
      optDescription: Dot("wmuD_KXJ2", "Reverses the input string."),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "dlroW olleH",
    }
  }
  /**
   * Reverse constructor
   */
  constructor() {
    super();

    this.module = "Default";
    this.inputType = "byteArray";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "By",
        type: "option",
        value: ["Byte", "Character", "Line"],
        defaultIndex: 1,
      },
    ];
  }

  /**
   * @param {byteArray} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    let i;
    if (args[0] === "Line") {
      const lines: any = [];
      let line: any = [],
        result: any = [];
      for (i = 0; i < input.length; i++) {
        if (input[i] === 0x0a) {
          lines.push(line);
          line = [];
        } else {
          line.push(input[i]);
        }
      }
      lines.push(line);
      lines.reverse();
      for (i = 0; i < lines.length; i++) {
        result = result.concat(lines[i]);
        result.push(0x0a);
      }
      return result.slice(0, input.length);
    } else if (args[0] === "Character") {
      const inputString = Utils.byteArrayToUtf8(input);
      let result = "";
      for (let i = inputString.length - 1; i >= 0; i--) {
        const c = inputString.charCodeAt(i);
        if (i > 0 && 0xdc00 <= c && c <= 0xdfff) {
          const c2 = inputString.charCodeAt(i - 1);
          if (0xd800 <= c2 && c2 <= 0xdbff) {
            // surrogates
            result += inputString.charAt(i - 1);
            result += inputString.charAt(i);
            i--;
            continue;
          }
        }
        result += inputString.charAt(i);
      }
      return Utils.strToUtf8ByteArray(result);
    } else {
      return input.reverse();
    }
  }
}

export default Reverse;
