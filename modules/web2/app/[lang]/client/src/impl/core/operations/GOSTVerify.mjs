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
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { toHexFast } from "../lib/Hex.mjs";
import {
  CryptoGost,
  GostEngine,
} from "@wavesenterprise/crypto-gost-js/index.js";

/**
 * GOST Verify operation
 */
class GOSTVerify extends Operation {
  /**
   * GOSTVerify constructor
   */
  constructor() {
    super();

    this.name = "GOST Verify";
    this.module = "Ciphers";
    this.description =
      "Verify the signature of a plaintext message using one of the GOST block ciphers. Enter the signature in the MAC field.";
    this.infoURL = "https://wikipedia.org/wiki/GOST_(block_cipher)";
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
        name: "MAC",
        type: "toggleString",
        value: "",
        toggleValues: ["Hex", "UTF8", "Latin1", "Base64"],
      },
      {
        name: "Input type",
        type: "option",
        value: ["Raw", "Hex"],
      },
      {
        name: "Algorithm",
        type: "argSelector",
        value: [
          {
            name: "GOST 28147 (Magma, 1989)",
            off: [5],
            on: [6],
          },
          {
            name: "GOST R 34.12 (Kuznyechik, 2015)",
            on: [5],
            off: [6],
          },
        ],
      },
      {
        name: "Block length",
        type: "option",
        value: ["64", "128"],
      },
      {
        name: "sBox",
        type: "option",
        value: [
          "E-TEST",
          "E-A",
          "E-B",
          "E-C",
          "E-D",
          "E-SC",
          "E-Z",
          "D-TEST",
          "D-A",
          "D-SC",
        ],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  async run(input, args) {
    const [keyObj, ivObj, macObj, inputType, version, length, sBox] = args;

    const key = toHexFast(
      Utils.convertToByteArray(keyObj.string, keyObj.option),
    );
    const iv = toHexFast(Utils.convertToByteArray(ivObj.string, ivObj.option));
    const mac = toHexFast(
      Utils.convertToByteArray(macObj.string, macObj.option),
    );
    input =
      inputType === "Hex" ? input : toHexFast(Utils.strToArrayBuffer(input));

    const versionNum = version === "GOST 28147 (Magma, 1989)" ? 1989 : 2015;
    const blockLength = versionNum === 1989 ? 64 : parseInt(length, 10);
    const sBoxVal = versionNum === 1989 ? sBox : null;

    const algorithm = {
      version: versionNum,
      length: blockLength,
      mode: "MAC",
      sBox: sBoxVal,
      macLength: mac.length * 4,
    };

    try {
      const Hex = CryptoGost.coding.Hex;
      if (iv) algorithm.iv = Hex.decode(iv);

      const cipher = GostEngine.getGostCipher(algorithm);
      const out = cipher.verify(
        Hex.decode(key),
        Hex.decode(mac),
        Hex.decode(input),
      );

      return out ? "The signature matches" : "The signature does not match";
    } catch (err) {
      throw new OperationError(err);
    }
  }
}

export default GOSTVerify;
