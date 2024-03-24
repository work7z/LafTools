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

import Operation, { OptDetail } from "../../../core/Operation.tsx";
import JSSHA3 from "js-sha3";
import OperationError from "../../../core/errors/OperationError.mjs";
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils.tsx";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from "./_constants.tsx";

/**
 * SHA3 operation
 */
class SHA3 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'sha',

      config: {
        "module": "Crypto",
        "description": "The SHA-3 (Secure Hash Algorithm 3) hash functions were released by NIST on August 5, 2015. Although part of the same series of standards, SHA-3 is internally quite different from the MD5-like structure of SHA-1 and SHA-2.<br><br>SHA-3 is a subset of the broader cryptographic primitive family Keccak designed by Guido Bertoni, Joan Daemen, Michaël Peeters, and Gilles Van Assche, building upon RadioGatún.",
        "infoURL": "https://wikipedia.org/wiki/SHA-3",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Size",
            "type": "option",
            "value": [
              "512",
              "384",
              "256",
              "224"
            ]
          }
        ]
      },
      optDescription: Dot("OMrIvzpf5", "The SHA-3 (Secure Hash Algorithm 3) hash functions were released by NIST on August 5, 2015. Although part of the same series of standards, SHA-3 is internally quite different from the MD5-like structure of SHA-1 and SHA-2.<br><br>SHA-3 is a subset of the broader cryptographic primitive family Keccak designed by Guido Bertoni, Joan Daemen, Micha\xebl Peeters, and Gilles Van Assche, building upon RadioGat\xfan."),
      infoURL: "https://wikipedia.org/wiki/SHA-3",
      id: "sha3",
      optName: "SHA3",
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db022587179b985c200",
    }
  }
  /**
   * SHA3 constructor
   */
  constructor() {
    super();

    this.name = "SHA3";
    this.module = "Crypto";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Size",
        type: "option",
        value: ["512", "384", "256", "224"],
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const size = parseInt(args[0], 10);
    let algo;

    switch (size) {
      case 224:
        algo = JSSHA3.sha3_224;
        break;
      case 384:
        algo = JSSHA3.sha3_384;
        break;
      case 256:
        algo = JSSHA3.sha3_256;
        break;
      case 512:
        algo = JSSHA3.sha3_512;
        break;
      default:
        throw new OperationError("Invalid size");
    }

    return algo(input);
  }
}

export default SHA3;
