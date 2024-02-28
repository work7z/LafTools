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
import cptable from "codepage";
import { CHR_ENC_CODE_PAGES } from "../lib/ChrEnc.mjs";

/**
 * Encode text operation
 */
class EncodeText extends Operation {
  /**
   * EncodeText constructor
   */
  constructor() {
    super();

    this.name = "Encode text";
    this.module = "Encodings";
    this.description = [
      "Encodes text into the chosen character encoding.",
      "<br><br>",
      "Supported charsets are:",
      "<ul>",
      Object.keys(CHR_ENC_CODE_PAGES)
        .map((e) => `<li>${e}</li>`)
        .join("\n"),
      "</ul>",
    ].join("\n");
    this.infoURL = "https://wikipedia.org/wiki/Character_encoding";
    this.inputType = "string";
    this.outputType = "ArrayBuffer";
    this.args = [
      {
        name: "Encoding",
        type: "option",
        value: Object.keys(CHR_ENC_CODE_PAGES),
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   */
  run(input, args) {
    const format = CHR_ENC_CODE_PAGES[args[0]];
    const encoded = cptable.utils.encode(format, input);
    return new Uint8Array(encoded).buffer;
  }
}

export default EncodeText;
