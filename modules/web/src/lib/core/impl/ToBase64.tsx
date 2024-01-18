// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 18 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
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

import Operation from "../Operation.mjs";
import { toBase64, ALPHABET_OPTIONS } from "../lib/Base64.mjs";
import { Dot } from "../../../utils/TranslationUtils";

/**
 * To Base64 operation
 */
class ToBase64 extends Operation {
  /**
   * ToBase64 constructor
   */
  constructor() {
    super();

    this.id='tobase64'
    this.name = Dot("M3ytc", "Encode {0}", "Base64");
    this.module = "Default";
    this.description = Dot(
      "BGd7P9",
      "This operation encodes raw data into an ASCII Base64 string.",
    );
    // <br><br><br><br>e.g. <code>hello</code> becomes <code>aGVsbG8=</code>
    this.infoURL = "https://wikipedia.org/wiki/Base64";
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
