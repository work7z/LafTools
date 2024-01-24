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

import { Dot } from "../../../../utils/TranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'
import Operation from "../../../core/Operation.mjs";
import { runHash } from "../../../core/lib/Hash.mjs";

/**
 * MD5 operation
 */
class MD5 extends Operation {
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

    this.id = 'md5'
    this.name = Dot("md5.textiDjMIo", "Generate {0} Hash", "MD5");
    this.description = Dot(
      "md5.desc.rxsHq",
      "This operation hashes data into an {0} hash.",
      "MD5"
    );
    this.exampleInput = TEXT_INPUT_EXAMPLE_HELLO_WORLD
    this.exampleOutput = "ed076287532e86365e841e92bfc50d8c"
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
