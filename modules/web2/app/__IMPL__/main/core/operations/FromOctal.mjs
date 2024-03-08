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
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";
import { DELIM_OPTIONS } from "../lib/Delim.mjs";

/**
 * From Octal operation
 */
class FromOctal extends Operation {
  /**
   * FromOctal constructor
   */
  constructor() {
    super();

    this.name = "From Octal";
    this.module = "Default";
    this.description =
      "Converts an octal byte string back into its raw value.<br><br>e.g. <code>316 223 316 265 316 271 316 254 40 317 203 316 277 317 205</code> becomes the UTF-8 encoded string <code>Γειά σου</code>";
    this.infoURL = "https://wikipedia.org/wiki/Octal";
    this.inputType = "string";
    this.outputType = "byteArray";
    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: DELIM_OPTIONS,
      },
    ];
    this.checks = [
      {
        pattern:
          "^(?:[0-7]{1,2}|[123][0-7]{2})(?: (?:[0-7]{1,2}|[123][0-7]{2}))*$",
        flags: "",
        args: ["Space"],
      },
      {
        pattern:
          "^(?:[0-7]{1,2}|[123][0-7]{2})(?:,(?:[0-7]{1,2}|[123][0-7]{2}))*$",
        flags: "",
        args: ["Comma"],
      },
      {
        pattern:
          "^(?:[0-7]{1,2}|[123][0-7]{2})(?:;(?:[0-7]{1,2}|[123][0-7]{2}))*$",
        flags: "",
        args: ["Semi-colon"],
      },
      {
        pattern:
          "^(?:[0-7]{1,2}|[123][0-7]{2})(?::(?:[0-7]{1,2}|[123][0-7]{2}))*$",
        flags: "",
        args: ["Colon"],
      },
      {
        pattern:
          "^(?:[0-7]{1,2}|[123][0-7]{2})(?:\\n(?:[0-7]{1,2}|[123][0-7]{2}))*$",
        flags: "",
        args: ["Line feed"],
      },
      {
        pattern:
          "^(?:[0-7]{1,2}|[123][0-7]{2})(?:\\r\\n(?:[0-7]{1,2}|[123][0-7]{2}))*$",
        flags: "",
        args: ["CRLF"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const delim = Utils.charRep(args[0] || "Space");
    if (input.length === 0) return [];
    return input.split(delim).map((val) => parseInt(val, 8));
  }
}

export default FromOctal;
