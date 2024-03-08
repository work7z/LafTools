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
 * @author Tan Zhen Yong [tzy@beyondthesprawl.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import argon2 from "argon2-browser";

/**
 * Argon2 compare operation
 */
class Argon2Compare extends Operation {
  /**
   * Argon2Compare constructor
   */
  constructor() {
    super();

    this.name = "Argon2 compare";
    this.module = "Crypto";
    this.description =
      "Tests whether the input matches the given Argon2 hash. To test multiple possible passwords, use the 'Fork' operation.";
    this.infoURL = "https://wikipedia.org/wiki/Argon2";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Encoded hash",
        type: "string",
        value: "",
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  async run(input, args) {
    const encoded = args[0];

    try {
      await argon2.verify({
        pass: input,
        encoded,
      });

      return `Match: ${input}`;
    } catch (err) {
      return "No match";
    }
  }
}

export default Argon2Compare;
