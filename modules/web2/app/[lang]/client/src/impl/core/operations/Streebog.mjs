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
 * @author mshwed [m@ttshwed.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import GostDigest from "../vendor/gost/gostDigest.mjs";
import { toHexFast } from "../lib/Hex.mjs";

/**
 * Streebog operation
 */
class Streebog extends Operation {
  /**
   * Streebog constructor
   */
  constructor() {
    super();

    this.name = "Streebog";
    this.module = "Hashing";
    this.description =
      "Streebog is a cryptographic hash function defined in the Russian national standard GOST R 34.11-2012 <i>Information Technology \u2013 Cryptographic Information Security \u2013 Hash Function</i>. It was created to replace an obsolete GOST hash function defined in the old standard GOST R 34.11-94, and as an asymmetric reply to SHA-3 competition by the US National Institute of Standards and Technology.";
    this.infoURL = "https://wikipedia.org/wiki/Streebog";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Digest length",
        type: "option",
        value: ["256", "512"],
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [length] = args;

    const algorithm = {
      version: 2012,
      mode: "HASH",
      length: parseInt(length, 10),
    };

    try {
      const gostDigest = new GostDigest(algorithm);

      return toHexFast(gostDigest.digest(input));
    } catch (err) {
      throw new OperationError(err);
    }
  }
}

export default Streebog;
