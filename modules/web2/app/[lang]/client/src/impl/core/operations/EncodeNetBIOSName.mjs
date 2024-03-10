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
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * Encode NetBIOS Name operation
 */
class EncodeNetBIOSName extends Operation {
  /**
   * EncodeNetBIOSName constructor
   */
  constructor() {
    super();

    this.name = "Encode NetBIOS Name";
    this.module = "Default";
    this.description =
      "NetBIOS names as seen across the client interface to NetBIOS are exactly 16 bytes long. Within the NetBIOS-over-TCP protocols, a longer representation is used.<br><br>There are two levels of encoding. The first level maps a NetBIOS name into a domain system name.  The second level maps the domain system name into the 'compressed' representation required for interaction with the domain name system.<br><br>This operation carries out the first level of encoding. See RFC 1001 for full details.";
    this.infoURL = "https://wikipedia.org/wiki/NetBIOS";
    this.inputType = "byteArray";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "Offset",
        type: "number",
        value: 65,
      },
    ];
  }

  /**
   * @param {byteArray} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const output = [],
      offset = args[0];

    if (input.length <= 16) {
      const len = input.length;
      input.length = 16;
      input.fill(32, len, 16);
      for (let i = 0; i < input.length; i++) {
        output.push((input[i] >> 4) + offset);
        output.push((input[i] & 0xf) + offset);
      }
    }

    return output;
  }
}

export default EncodeNetBIOSName;
