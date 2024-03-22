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

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import { runHash } from "../../../core/lib/Hash.mjs";

/**
 * MD4 operation
 */
class MD4 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      config: {
        "module": "Crypto",
        "description": "The MD4 (Message-Digest 4) algorithm is a cryptographic hash function developed by Ronald Rivest in 1990. The digest length is 128 bits. The algorithm has influenced later designs, such as the MD5, SHA-1 and RIPEMD algorithms.<br><br>The security of MD4 has been severely compromised.",
        "infoURL": "https://wikipedia.org/wiki/MD4",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      id: 'md4',
      optName: Dot("md4.text.192d3", "Generate {0} Hash", "MD4"),
      optDescription: Dot(
        "md4.desc.1039",
        "This operation hashes data into an {0} hash.",
        "MD4"
      ),
      infoURL: 'https://en.wikipedia.org/wiki/MD4',
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "b2a5cc34fc21a764ae2fad94d56fadf6",
    }
  }
  /**
   * MD4 constructor
   */
  constructor() {
    super();

    this.name = "MD4";
    this.module = "Crypto";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [];

  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return runHash("md4", input);
  }
}

export default MD4;
