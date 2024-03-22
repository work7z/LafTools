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
 * MD5 operation
 */
class MD5 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      config: {
        "module": "Crypto",
        "description": "MD5 (Message-Digest 5) is a widely used hash function. It has been used in a variety of security applications and is also commonly used to check the integrity of files.<br><br>However, MD5 is not collision resistant and it isn't suitable for applications like SSL/TLS certificates or digital signatures that rely on this property.",
        "infoURL": "https://wikipedia.org/wiki/MD5",
        "inputType": "ArrayBuffer",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      infoURL: 'https://en.wikipedia.org/wiki/MD5',
      id: 'md5',
      optName: Dot("md5.textiDjMIo", "Generate {0} Hash", "MD5"),
      optDescription: Dot(
        "md5.desc.rxsHq",
        "This operation hashes data into an {0} hash.",
        "MD5"
      ),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "ed076287532e86365e841e92bfc50d8c"
    }
  }
  /**
   * MD5 constructor
   */
  constructor() {
    super();

    this.name = "MD5";
    this.module = "Crypto";
    // this.infoURL = "";
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
    return runHash("md5", input);
  }
}

export default MD5;
