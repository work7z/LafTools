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
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";
import forge from "node-forge";

/**
 * DES Encrypt operation
 */
class DESEncrypt extends Operation {
  /**
   * DESEncrypt constructor
   */
  constructor() {
    super();

    this.name = "DES Encrypt";
    this.module = "Ciphers";
    this.description =
      "DES is a previously dominant algorithm for encryption, and was published as an official U.S. Federal Information Processing Standard (FIPS). It is now considered to be insecure due to its small key size.<br><br><b>Key:</b> DES uses a key length of 8 bytes (64 bits).<br>Triple DES uses a key length of 24 bytes (192 bits).<br><br>You can generate a password-based key using one of the KDF operations.<br><br><b>IV:</b> The Initialization Vector should be 8 bytes long. If not entered, it will default to 8 null bytes.<br><br><b>Padding:</b> In CBC and ECB mode, PKCS#7 padding will be used.";
    this.infoURL = "https://wikipedia.org/wiki/Data_Encryption_Standard";
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
      iv = Utils.convertToByteArray(args[1].string, args[1].option),
      [, , mode, inputType, outputType] = args;

    if (key.length !== 8) {
      throw new OperationError(`Invalid key length: ${key.length} bytes

DES uses a key length of 8 bytes (64 bits).
Triple DES uses a key length of 24 bytes (192 bits).`);
    }
    if (iv.length !== 8 && mode !== "ECB") {
      throw new OperationError(`Invalid IV length: ${iv.length} bytes

DES uses an IV length of 8 bytes (64 bits).
Make sure you have specified the type correctly (e.g. Hex vs UTF8).`);
    }

    input = Utils.convertToByteString(input, inputType);

    const cipher = forge.cipher.createCipher("DES-" + mode, key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(input));
    cipher.finish();

    return outputType === "Hex"
      ? cipher.output.toHex()
      : cipher.output.getBytes();
  }
}

export default DESEncrypt;
