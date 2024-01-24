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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";
import forge from "node-forge";
import OperationError from "../errors/OperationError.mjs";
import { Blowfish } from "../lib/Blowfish.mjs";

/**
 * Blowfish Encrypt operation
 */
class BlowfishEncrypt extends Operation {
  /**
   * BlowfishEncrypt constructor
   */
  constructor() {
    super();

    this.name = "Blowfish Encrypt";
    this.module = "Ciphers";
    this.description =
      "Blowfish is a symmetric-key block cipher designed in 1993 by Bruce Schneier and included in a large number of cipher suites and encryption products. AES now receives more attention.<br><br><b>IV:</b> The Initialization Vector should be 8 bytes long. If not entered, it will default to 8 null bytes.";
    this.infoURL = "https://wikipedia.org/wiki/Blowfish_(cipher)";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Key",
        type: "toggleString",
        value: "",
        toggleValues: ["Hex", "UTF8", "Latin1", "Base64"],
      },
      {
        name: "IV",
        type: "toggleString",
        value: "",
        toggleValues: ["Hex", "UTF8", "Latin1", "Base64"],
      },
      {
        name: "Mode",
        type: "option",
        value: ["CBC", "CFB", "OFB", "CTR", "ECB"],
      },
      {
        name: "Input",
        type: "option",
        value: ["Raw", "Hex"],
      },
      {
        name: "Output",
        type: "option",
        value: ["Hex", "Raw"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const key = Utils.convertToByteString(args[0].string, args[0].option),
      iv = Utils.convertToByteString(args[1].string, args[1].option),
      mode = args[2],
      inputType = args[3],
      outputType = args[4];

    if (key.length !== 8) {
      throw new OperationError(`Invalid key length: ${key.length} bytes

Blowfish uses a key length of 8 bytes (64 bits).`);
    }

    input = Utils.convertToByteString(input, inputType);

    const cipher = Blowfish.createCipher(key, mode);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(input));
    cipher.finish();

    if (outputType === "Hex") {
      return cipher.output.toHex();
    } else {
      return cipher.output.getBytes();
    }
  }
}

export default BlowfishEncrypt;
