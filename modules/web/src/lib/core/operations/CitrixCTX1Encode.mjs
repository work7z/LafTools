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
 * @author bwhitn [brian.m.whitney@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import cptable from "codepage";

/**
 * Citrix CTX1 Encode operation
 */
class CitrixCTX1Encode extends Operation {
  /**
   * CitrixCTX1Encode constructor
   */
  constructor() {
    super();

    this.name = "Citrix CTX1 Encode";
    this.module = "Encodings";
    this.description = "Encodes strings to Citrix CTX1 password format.";
    this.infoURL =
      "https://www.reddit.com/r/AskNetsec/comments/1s3r6y/citrix_ctx1_hash_decoding/";
    this.inputType = "string";
    this.outputType = "byteArray";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const utf16pass = Array.from(cptable.utils.encode(1200, input));
    const result = [];
    let temp = 0;
    for (let i = 0; i < utf16pass.length; i++) {
      temp = utf16pass[i] ^ 0xa5 ^ temp;
      result.push(((temp >>> 4) & 0xf) + 0x41);
      result.push((temp & 0xf) + 0x41);
    }

    return result;
  }
}

export default CitrixCTX1Encode;
