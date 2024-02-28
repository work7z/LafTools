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
 * @author dolphinOnKeys [robin@weird.io]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import { toBinary } from "../lib/Binary.mjs";

/**
 * Cetacean Cipher Encode operation
 */
class CetaceanCipherEncode extends Operation {
  /**
   * CetaceanCipherEncode constructor
   */
  constructor() {
    super();

    this.name = "Cetacean Cipher Encode";
    this.module = "Ciphers";
    this.description =
      "Converts any input into Cetacean Cipher. <br/><br/>e.g. <code>hi</code> becomes <code>EEEEEEEEEeeEeEEEEEEEEEEEEeeEeEEe</code>";
    this.infoURL = "https://hitchhikers.fandom.com/wiki/Dolphins";
    this.inputType = "string";
    this.outputType = "string";
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const result = [];
    const charArray = input.split("");

    charArray.map((character) => {
      if (character === " ") {
        result.push(character);
      } else {
        const binaryArray = toBinary(character.charCodeAt(0), "None", 16).split(
          "",
        );
        result.push(
          binaryArray.map((str) => (str === "1" ? "e" : "E")).join(""),
        );
      }
    });

    return result.join("");
  }
}

export default CetaceanCipherEncode;
