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
 * @author MarvinJWendt [git@marvinjwendt.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * Convert to NATO alphabet operation
 */
class ConvertToNATOAlphabet extends Operation {
  /**
   * ConvertToNATOAlphabet constructor
   */
  constructor() {
    super();

    this.name = "Convert to NATO alphabet";
    this.module = "Default";
    this.description =
      "Converts characters to their representation in the NATO phonetic alphabet.";
    this.infoURL = "https://wikipedia.org/wiki/NATO_phonetic_alphabet";
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
    return input.replace(/[a-z0-9,/.]/gi, (letter) => {
      return lookup[letter.toUpperCase()];
    });
  }
}

const lookup = {
  A: "Alfa ",
  B: "Bravo ",
  C: "Charlie ",
  D: "Delta ",
  E: "Echo ",
  F: "Foxtrot ",
  G: "Golf ",
  H: "Hotel ",
  I: "India ",
  J: "Juliett ",
  K: "Kilo ",
  L: "Lima ",
  M: "Mike ",
  N: "November ",
  O: "Oscar ",
  P: "Papa ",
  Q: "Quebec ",
  R: "Romeo ",
  S: "Sierra ",
  T: "Tango ",
  U: "Uniform ",
  V: "Victor ",
  W: "Whiskey ",
  X: "X-ray ",
  Y: "Yankee ",
  Z: "Zulu ",
  0: "Zero ",
  1: "One ",
  2: "Two ",
  3: "Three ",
  4: "Four ",
  5: "Five ",
  6: "Six ",
  7: "Seven ",
  8: "Eight ",
  9: "Nine ",
  ",": "Comma ",
  "/": "Fraction bar ",
  ".": "Full stop ",
};

export default ConvertToNATOAlphabet;
