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
 * Some parts taken from mimelib (http://github.com/andris9/mimelib)
 * @author Andris Reinman
 * @license MIT
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * From Quoted Printable operation
 */
class FromQuotedPrintable extends Operation {
  /**
   * FromQuotedPrintable constructor
   */
  constructor() {
    super();

    this.name = "From Quoted Printable";
    this.module = "Default";
    this.description =
      "Converts QP-encoded text back to standard text.<br><br>e.g. The quoted-printable encoded string <code>hello=20world</code> becomes <code>hello world</code>";
    this.infoURL = "https://wikipedia.org/wiki/Quoted-printable";
    this.inputType = "string";
    this.outputType = "byteArray";
    this.args = [];
    this.checks = [
      {
        pattern:
          "^[\\x21-\\x3d\\x3f-\\x7e \\t]{0,76}(?:=[\\da-f]{2}|=\\r?\\n)(?:[\\x21-\\x3d\\x3f-\\x7e \\t]|=[\\da-f]{2}|=\\r?\\n)*$",
        flags: "i",
        args: [],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const str = input.replace(/=(?:\r?\n|$)/g, "");

    const encodedBytesCount = (str.match(/=[\da-fA-F]{2}/g) || []).length,
      bufferLength = str.length - encodedBytesCount * 2,
      buffer = new Array(bufferLength);
    let chr,
      hex,
      bufferPos = 0;

    for (let i = 0, len = str.length; i < len; i++) {
      chr = str.charAt(i);
      if (
        chr === "=" &&
        (hex = str.substr(i + 1, 2)) &&
        /[\da-fA-F]{2}/.test(hex)
      ) {
        buffer[bufferPos++] = parseInt(hex, 16);
        i += 2;
        continue;
      }
      buffer[bufferPos++] = chr.charCodeAt(0);
    }

    return buffer;
  }
}

export default FromQuotedPrintable;
