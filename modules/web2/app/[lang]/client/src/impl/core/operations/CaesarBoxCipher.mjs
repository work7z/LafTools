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
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * Caesar Box Cipher operation
 */
class CaesarBoxCipher extends Operation {
  /**
   * CaesarBoxCipher constructor
   */
  constructor() {
    super();

    this.name = "Caesar Box Cipher";
    this.module = "Ciphers";
    this.description =
      "Caesar Box is a transposition cipher used in the Roman Empire, in which letters of the message are written in rows in a square (or a rectangle) and then, read by column.";
    this.infoURL = "https://www.dcode.fr/caesar-box-cipher";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Box Height",
        type: "number",
        value: 1,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const tableHeight = args[0];
    const tableWidth = Math.ceil(input.length / tableHeight);
    while (input.indexOf(" ") !== -1) input = input.replace(" ", "");
    for (let i = 0; i < tableHeight * tableWidth - input.length; i++) {
      input += "\x00";
    }
    let result = "";
    for (let i = 0; i < tableHeight; i++) {
      for (let j = i; j < input.length; j += tableHeight) {
        if (input.charAt(j) !== "\x00") {
          result += input.charAt(j);
        }
      }
    }
    return result;
  }
}

export default CaesarBoxCipher;
