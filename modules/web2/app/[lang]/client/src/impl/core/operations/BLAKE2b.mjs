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
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import blakejs from "blakejs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toBase64 } from "../lib/Base64.mjs";

/**
 * BLAKE2b operation
 */
class BLAKE2b extends Operation {
  /**
   * BLAKE2b constructor
   */
  constructor() {
    super();

    this.name = "BLAKE2b";
    this.module = "Hashing";
    this.description = `Performs BLAKE2b hashing on the input.  
        <br><br> BLAKE2b is a flavour of the BLAKE cryptographic hash function that is optimized for 64-bit platforms and produces digests of any size between 1 and 64 bytes.
        <br><br> Supports the use of an optional key.`;
    this.infoURL =
      "https://wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2b_algorithm";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Size",
        type: "option",
        value: ["512", "384", "256", "160", "128"],
      },
      {
        name: "Output Encoding",
        type: "option",
        value: ["Hex", "Base64", "Raw"],
      },
      {
        name: "Key",
        type: "toggleString",
        value: "",
        toggleValues: ["UTF8", "Decimal", "Base64", "Hex", "Latin1"],
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string} The input having been hashed with BLAKE2b in the encoding format specified.
   */
  run(input, args) {
    const [outSize, outFormat] = args;
    let key = Utils.convertToByteArray(args[2].string || "", args[2].option);
    if (key.length === 0) {
      key = null;
    } else if (key.length > 64) {
      throw new OperationError(
        [
          "Key cannot be greater than 64 bytes",
          "It is currently " + key.length + " bytes.",
        ].join("\n"),
      );
    }

    input = new Uint8Array(input);
    switch (outFormat) {
      case "Hex":
        return blakejs.blake2bHex(input, key, outSize / 8);
      case "Base64":
        return toBase64(blakejs.blake2b(input, key, outSize / 8));
      case "Raw":
        return Utils.arrayBufferToStr(
          blakejs.blake2b(input, key, outSize / 8).buffer,
        );
      default:
        return new OperationError("Unsupported Output Type");
    }
  }
}

export default BLAKE2b;
