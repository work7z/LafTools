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

import Operation from "../Operation.tsx";
import CryptoJS from "crypto-js";
import { format } from "../lib/Ciphers.mjs";

/**
 * RC4 operation
 */
class RC4 extends Operation {
  /**
   * RC4 constructor
   */
  constructor() {
    super();

    this.name = "RC4";
    this.module = "Ciphers";
    this.description =
      "RC4 (also known as ARC4) is a widely-used stream cipher designed by Ron Rivest. It is used in popular protocols such as SSL and WEP. Although remarkable for its simplicity and speed, the algorithm's history doesn't inspire confidence in its security.";
    this.infoURL = "https://wikipedia.org/wiki/RC4";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Passphrase",
        type: "toggleString",
        value: "",
        toggleValues: [
          "UTF8",
          "UTF16",
          "UTF16LE",
          "UTF16BE",
          "Latin1",
          "Hex",
          "Base64",
        ],
      },
      {
        name: "Input format",
        type: "option",
        value: [
          "Latin1",
          "UTF8",
          "UTF16",
          "UTF16LE",
          "UTF16BE",
          "Hex",
          "Base64",
        ],
      },
      {
        name: "Output format",
        type: "option",
        value: [
          "Latin1",
          "UTF8",
          "UTF16",
          "UTF16LE",
          "UTF16BE",
          "Hex",
          "Base64",
        ],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const message = format[args[1]].parse(input),
      passphrase = format[args[0].option].parse(args[0].string),
      encrypted = CryptoJS.RC4.encrypt(message, passphrase);

    return encrypted.ciphertext.toString(format[args[2]]);
  }

  /**
   * Highlight RC4
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    return pos;
  }

  /**
   * Highlight RC4 in reverse
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    return pos;
  }
}

export default RC4;
