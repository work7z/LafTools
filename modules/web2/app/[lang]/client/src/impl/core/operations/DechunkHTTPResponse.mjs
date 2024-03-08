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
 * @author sevzero [sevzero@protonmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * Dechunk HTTP response operation
 */
class DechunkHTTPResponse extends Operation {
  /**
   * DechunkHTTPResponse constructor
   */
  constructor() {
    super();

    this.name = "Dechunk HTTP response";
    this.module = "Default";
    this.description =
      "Parses an HTTP response transferred using Transfer-Encoding: Chunked";
    this.infoURL = "https://wikipedia.org/wiki/Chunked_transfer_encoding";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
    this.checks = [
      {
        pattern: "^[0-9A-F]+\r\n",
        flags: "i",
        args: [],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const chunks = [];
    let chunkSizeEnd = input.indexOf("\n") + 1;
    const lineEndings = input.charAt(chunkSizeEnd - 2) === "\r" ? "\r\n" : "\n";
    const lineEndingsLength = lineEndings.length;
    let chunkSize = parseInt(input.slice(0, chunkSizeEnd), 16);
    while (!isNaN(chunkSize)) {
      chunks.push(input.slice(chunkSizeEnd, chunkSize + chunkSizeEnd));
      input = input.slice(chunkSizeEnd + chunkSize + lineEndingsLength);
      chunkSizeEnd = input.indexOf(lineEndings) + lineEndingsLength;
      chunkSize = parseInt(input.slice(0, chunkSizeEnd), 16);
    }
    return chunks.join("") + input;
  }
}

export default DechunkHTTPResponse;
