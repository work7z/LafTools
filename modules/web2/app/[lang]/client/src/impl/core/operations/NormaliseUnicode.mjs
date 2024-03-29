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
 * @author Matthieu [m@tthieu.xyz]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import { UNICODE_NORMALISATION_FORMS } from "../lib/ChrEnc.mjs";
import unorm from "unorm";

/**
 * Normalise Unicode operation
 */
class NormaliseUnicode extends Operation {
  /**
   * NormaliseUnicode constructor
   */
  constructor() {
    super();

    this.name = "Normalise Unicode";
    this.module = "Encodings";
    this.description =
      "Transform Unicode characters to one of the Normalisation Forms";
    this.infoURL =
      "https://wikipedia.org/wiki/Unicode_equivalence#Normal_forms";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Normal Form",
        type: "option",
        value: UNICODE_NORMALISATION_FORMS,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [normalForm] = args;

    switch (normalForm) {
      case "NFD":
        return unorm.nfd(input);
      case "NFC":
        return unorm.nfc(input);
      case "NFKD":
        return unorm.nfkd(input);
      case "NFKC":
        return unorm.nfkc(input);
      default:
        throw new OperationError("Unknown Normalisation Form");
    }
  }
}

export default NormaliseUnicode;
