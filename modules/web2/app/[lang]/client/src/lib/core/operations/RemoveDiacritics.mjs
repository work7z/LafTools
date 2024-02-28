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
 * @author Klaxon [klaxon@veyr.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * Remove Diacritics operation
 */
class RemoveDiacritics extends Operation {
  /**
   * RemoveDiacritics constructor
   */
  constructor() {
    super();

    this.name = "Remove Diacritics";
    this.module = "Default";
    this.description =
      "Replaces accented characters with their latin character equivalent. Accented characters are made up of Unicode combining characters, so unicode text formatting such as strikethroughs and underlines will also be removed.";
    this.infoURL = "https://wikipedia.org/wiki/Diacritic";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    // reference: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/37511463
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}

export default RemoveDiacritics;
