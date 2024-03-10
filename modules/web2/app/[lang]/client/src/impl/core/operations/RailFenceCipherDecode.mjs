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
 * @author Flavio Diez [flaviofdiez+cyberchef@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";

/**
 * Rail Fence Cipher Decode operation
 */
class RailFenceCipherDecode extends Operation {
  /**
   * RailFenceCipherDecode constructor
   */
  constructor() {
    super();

    this.name = "Rail Fence Cipher Decode";
    this.module = "Ciphers";
    this.description =
      "Decodes Strings that were created using the Rail fence Cipher provided a key and an offset";
    this.infoURL = "https://wikipedia.org/wiki/Rail_fence_cipher";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Key",
        type: "number",
        value: 2,
      },
      {
        name: "Offset",
        type: "number",
        value: 0,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [key, offset] = args;

    const cipher = input;

    if (key < 2) {
      throw new OperationError("Key has to be bigger than 2");
    } else if (key > cipher.length) {
      throw new OperationError(
        "Key should be smaller than the cipher's length",
      );
    }

    if (offset < 0) {
      throw new OperationError("Offset has to be a positive integer");
    }

    const cycle = (key - 1) * 2;
    const plaintext = new Array(cipher.length);

    let j = 0;
    let x, y;

    for (y = 0; y < key; y++) {
      for (x = 0; x < cipher.length; x++) {
        if ((y + x + offset) % cycle === 0 || (y - x - offset) % cycle === 0) {
          plaintext[x] = cipher[j++];
        }
      }
    }

    return plaintext.join("").trim();
  }
}

export default RailFenceCipherDecode;
