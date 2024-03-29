// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 14 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Ryan Laf <work7z@outlook.com>
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

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import { runHash } from "../../../core/lib/Hash.mjs";

/**
 * MD2 operation
 */
class MD2 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'md5',
      config: {
        "module": "Crypto",
        "description": "The MD2 (Message-Digest 2) algorithm is a cryptographic hash function developed by Ronald Rivest in 1989. The algorithm is optimized for 8-bit computers.<br><br>Although MD2 is no longer considered secure, even as of 2014, it remains in use in public key infrastructures as part of certificates generated with MD2 and RSA. The message digest algorithm consists, by default, of 18 rounds.",
        "infoURL": "https://wikipedia.org/wiki/MD2_(cryptography)",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Rounds",
            "type": "number",
            "value": 18,
            "min": 0
          }
        ]
      },
      infoURL: 'https://en.wikipedia.org/wiki/MD2_(cryptography)',
      nousenouseID: 'md2',
      optName: Dot("md2.text.192d3", "Generate {0} Hash", "MD2"),
      optDescription: Dot(
        "md2.desc.1039",
        "This operation hashes data into an {0} hash.",
        "MD2"
      ),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "315f7c67223f01fb7cab4b95100e872e",
    }
  }
  /**
   * MD2 constructor
   */
  constructor() {
    super();

    this.name = "MD2";
    this.module = "Crypto";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Rounds",
        type: "number",
        value: 18,
        min: 0,
      },
    ];


  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return runHash("md2", input, { rounds: args[0] });
  }
}

export default MD2;
