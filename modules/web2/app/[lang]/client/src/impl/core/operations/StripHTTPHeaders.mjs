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

/**
 * Strip HTTP headers operation
 */
class StripHTTPHeaders extends Operation {
  /**
   * StripHTTPHeaders constructor
   */
  constructor() {
    super();

    this.name = "Strip HTTP headers";
    this.module = "Default";
    this.description =
      "Removes HTTP headers from a request or response by looking for the first instance of a double newline.";
    this.infoURL =
      "https://wikipedia.org/wiki/Hypertext_Transfer_Protocol#Message_format";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
    this.checks = [
      {
        pattern: "^HTTP(.|\\s)+?(\\r?\\n){2}",
        flags: "",
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
    let headerEnd = input.indexOf("\r\n\r\n");
    headerEnd = headerEnd < 0 ? input.indexOf("\n\n") + 2 : headerEnd + 4;

    return headerEnd < 2 ? input : input.slice(headerEnd, input.length);
  }
}

export default StripHTTPHeaders;
