// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 18 Jan 2024
// Second Author: LafTools Team - FX <work7z@outlook.com>
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

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import { toBase64, ALPHABET_OPTIONS } from "../../../core/lib/Base64.mjs";

/**
 * To Base64 operation
 */
class ToBase64 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'base64',
      config: {
        "module": "Default",
        "description": "Base64 is a notation for encoding arbitrary byte data using a restricted set of symbols that can be conveniently used by humans and processed by computers.<br><br>This operation encodes raw data into an ASCII Base64 string.<br><br>e.g. <code>hello</code> becomes <code>aGVsbG8=</code>",
        "infoURL": "https://wikipedia.org/wiki/Base64",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Alphabet",
            "type": "editableOption",
            "value": [
              {
                "name": "Standard (RFC 4648): A-Za-z0-9+/=",
                "value": "A-Za-z0-9+/="
              },
              {
                "name": "URL safe (RFC 4648 §5): A-Za-z0-9-_",
                "value": "A-Za-z0-9-_"
              },
              {
                "name": "Filename safe: A-Za-z0-9+-=",
                "value": "A-Za-z0-9+\\-="
              },
              {
                "name": "itoa64: ./0-9A-Za-z=",
                "value": "./0-9A-Za-z="
              },
              {
                "name": "XML: A-Za-z0-9_.",
                "value": "A-Za-z0-9_."
              },
              {
                "name": "y64: A-Za-z0-9._-",
                "value": "A-Za-z0-9._-"
              },
              {
                "name": "z64: 0-9a-zA-Z+/=",
                "value": "0-9a-zA-Z+/="
              },
              {
                "name": "Radix-64 (RFC 4880): 0-9A-Za-z+/=",
                "value": "0-9A-Za-z+/="
              },
              {
                "name": "Uuencoding: [space]-_",
                "value": " -_"
              },
              {
                "name": "Xxencoding: +-0-9A-Za-z",
                "value": "+\\-0-9A-Za-z"
              },
              {
                "name": "BinHex: !-,-0-689@A-NP-VX-Z[`a-fh-mp-r",
                "value": "!-,-0-689@A-NP-VX-Z[`a-fh-mp-r"
              },
              {
                "name": "ROT13: N-ZA-Mn-za-m0-9+/=",
                "value": "N-ZA-Mn-za-m0-9+/="
              },
              {
                "name": "UNIX crypt: ./0-9A-Za-z",
                "value": "./0-9A-Za-z"
              },
              {
                "name": "Atom128: /128GhIoPQROSTeUbADfgHijKLM+n0pFWXY456xyzB7=39VaqrstJklmNuZvwcdEC",
                "value": "/128GhIoPQROSTeUbADfgHijKLM+n0pFWXY456xyzB7=39VaqrstJklmNuZvwcdEC"
              },
              {
                "name": "Megan35: 3GHIJKLMNOPQRSTUb=cdefghijklmnopWXYZ/12+406789VaqrstuvwxyzABCDEF5",
                "value": "3GHIJKLMNOPQRSTUb=cdefghijklmnopWXYZ/12+406789VaqrstuvwxyzABCDEF5"
              },
              {
                "name": "Zong22: ZKj9n+yf0wDVX1s/5YbdxSo=ILaUpPBCHg8uvNO4klm6iJGhQ7eFrWczAMEq3RTt2",
                "value": "ZKj9n+yf0wDVX1s/5YbdxSo=ILaUpPBCHg8uvNO4klm6iJGhQ7eFrWczAMEq3RTt2"
              },
              {
                "name": "Hazz15: HNO4klm6ij9n+J2hyf0gzA8uvwDEq3X1Q7ZKeFrWcVTts/MRGYbdxSo=ILaUpPBC5",
                "value": "HNO4klm6ij9n+J2hyf0gzA8uvwDEq3X1Q7ZKeFrWcVTts/MRGYbdxSo=ILaUpPBC5"
              }
            ]
          }
        ]
      },
      id: 'tobase64',
      optName: Dot("M3ytc", "Encode {0}", "Base64"),
      optDescription: Dot(
        "BGd7P9",
        "This operation encodes raw data into an ASCII Base64 string.",
      ),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "SGVsbG8gV29ybGQh",
      infoURL: "https://en.wikipedia.org/wiki/Base64",
    }
  }
  /**
   * ToBase64 constructor
   */
  constructor() {
    super();

    this.module = "Default";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Alphabet",
        type: "editableOption",
        value: ALPHABET_OPTIONS,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const alphabet = args[0];
    return toBase64(input, alphabet);
  }

  /**
   * Highlight to Base64
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    pos[0].start = Math.floor((pos[0].start / 3) * 4);
    pos[0].end = Math.ceil((pos[0].end / 3) * 4);
    return pos;
  }

  /**
   * Highlight from Base64
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    pos[0].start = Math.ceil((pos[0].start / 4) * 3);
    pos[0].end = Math.floor((pos[0].end / 4) * 3);
    return pos;
  }
}

export default ToBase64;
