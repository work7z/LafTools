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

import r from "jsrsasign";
import Operation from "../Operation.tsx";

/**
 * Hex to PEM operation
 */
class HexToPEM extends Operation {
  /**
   * HexToPEM constructor
   */
  constructor() {
    super();

    this.name = "Hex to PEM";
    this.module = "PublicKey";
    this.description =
      "Converts a hexadecimal DER (Distinguished Encoding Rules) string into PEM (Privacy Enhanced Mail) format.";
    this.infoURL = "https://wikipedia.org/wiki/Privacy-Enhanced_Mail";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Header string",
        type: "string",
        value: "CERTIFICATE",
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return r.KJUR.asn1.ASN1Util.getPEMStringFromHex(
      input.replace(/\s/g, ""),
      args[0],
    );
  }
}

export default HexToPEM;
