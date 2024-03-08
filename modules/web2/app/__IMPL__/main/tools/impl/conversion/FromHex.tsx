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

import { fromHex, FROM_HEX_DELIM_OPTIONS } from "../../../core/lib/Hex.mjs";

import Operation from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import Utils from "../../../core/Utils.mjs";
import { alphabetName, ALPHABET_OPTIONS } from "../../../core/lib/Base85.mjs";
import { Dot } from "../@/app/[lang]/client/src/utils//cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'

/**
 * From Hex operation
 */
class FromHex extends Operation {
  /**
   * FromHex constructor
   */
  constructor() {
    super();

    this.name = "From Hex";
    this.module = "Default";
    this.description =
      Dot("gms7_9n5v", "Converts a hexadecimal byte string back into its raw value.");
    this.infoURL = "https://wikipedia.org/wiki/Hexadecimal";
    this.inputType = "string";
    this.outputType = "byteArray";


    this.exampleInput = 'ce 93 ce b5 ce b9 ce ac 20 cf 83 ce bf cf 85 0a'
    this.exampleOutput = 'Γειά σου'


    this.args = [
      {
        name: "Delimiter",
        type: "option",
        value: FROM_HEX_DELIM_OPTIONS,
      },
    ];
    this.checks = [
      {
        pattern: "^(?:[\\dA-F]{2})+$",
        flags: "i",
        args: ["None"],
      },
      {
        pattern: "^[\\dA-F]{2}(?: [\\dA-F]{2})*$",
        flags: "i",
        args: ["Space"],
      },
      {
        pattern: "^[\\dA-F]{2}(?:,[\\dA-F]{2})*$",
        flags: "i",
        args: ["Comma"],
      },
      {
        pattern: "^[\\dA-F]{2}(?:;[\\dA-F]{2})*$",
        flags: "i",
        args: ["Semi-colon"],
      },
      {
        pattern: "^[\\dA-F]{2}(?::[\\dA-F]{2})*$",
        flags: "i",
        args: ["Colon"],
      },
      {
        pattern: "^[\\dA-F]{2}(?:\\n[\\dA-F]{2})*$",
        flags: "i",
        args: ["Line feed"],
      },
      {
        pattern: "^[\\dA-F]{2}(?:\\r\\n[\\dA-F]{2})*$",
        flags: "i",
        args: ["CRLF"],
      },
      {
        pattern: "^(?:0x[\\dA-F]{2})+$",
        flags: "i",
        args: ["0x"],
      },
      {
        pattern: "^0x[\\dA-F]{2}(?:,0x[\\dA-F]{2})*$",
        flags: "i",
        args: ["0x with comma"],
      },
      {
        pattern: "^(?:\\\\x[\\dA-F]{2})+$",
        flags: "i",
        args: ["\\x"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    const delim = args[0] || "Auto";
    return fromHex(input, delim, 2);
  }

  /**
   * Highlight to Hex
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlight(pos, args) {
    if (args[0] === "Auto") return false;
    const delim = Utils.charRep(args[0] || "Space"),
      len = delim === "\r\n" ? 1 : delim.length,
      width = len + 2;

    // 0x and \x are added to the beginning if they are selected, so increment the positions accordingly
    if (delim === "0x" || delim === "\\x") {
      if (pos[0].start > 1) pos[0].start -= 2;
      else pos[0].start = 0;
      if (pos[0].end > 1) pos[0].end -= 2;
      else pos[0].end = 0;
    }

    pos[0].start = pos[0].start === 0 ? 0 : Math.round(pos[0].start / width);
    pos[0].end = pos[0].end === 0 ? 0 : Math.ceil(pos[0].end / width);
    return pos;
  }

  /**
   * Highlight from Hex
   *
   * @param {Object[]} pos
   * @param {number} pos[].start
   * @param {number} pos[].end
   * @param {Object[]} args
   * @returns {Object[]} pos
   */
  highlightReverse(pos, args) {
    const delim = Utils.charRep(args[0] || "Space"),
      len = delim === "\r\n" ? 1 : delim.length;

    pos[0].start = pos[0].start * (2 + len);
    pos[0].end = pos[0].end * (2 + len) - len;

    // 0x and \x are added to the beginning if they are selected, so increment the positions accordingly
    if (delim === "0x" || delim === "\\x") {
      pos[0].start += 2;
      pos[0].end += 2;
    }
    return pos;
  }
}

export default FromHex;
