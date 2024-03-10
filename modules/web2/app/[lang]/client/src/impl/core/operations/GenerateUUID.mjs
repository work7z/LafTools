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
// import crypto from 'crypto';
var crypto = require("crypto");

/**
 * Generate UUID operation
 */
class GenerateUUID extends Operation {
  /**
   * GenerateUUID constructor
   */
  constructor() {
    super();

    this.name = "Generate UUID";
    this.module = "Crypto";
    this.description =
      "Generates an RFC 4122 version 4 compliant Universally Unique Identifier (UUID), also known as a Globally Unique Identifier (GUID).<br><br>A version 4 UUID relies on random numbers, in this case generated using <code>window.crypto</code> if available and falling back to <code>Math.random</code> if not.";
    this.infoURL = "https://wikipedia.org/wiki/Universally_unique_identifier";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const buf = new Uint32Array(4).map(() => {
      return crypto.randomBytes(4).readUInt32BE(0, true);
    });
    let i = 0;
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (buf[i >> 3] >> ((i % 8) * 4)) & 0xf,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        i++;
        return v.toString(16);
      },
    );
  }
}

export default GenerateUUID;
