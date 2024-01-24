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

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import bcrypt from "bcryptjs";

/**
 * Bcrypt parse operation
 */
class BcryptParse extends Operation {
  /**
   * BcryptParse constructor
   */
  constructor() {
    super();

    this.name = "Bcrypt parse";
    this.module = "Crypto";
    this.description =
      "Parses a bcrypt hash to determine the number of rounds used, the salt, and the password hash.";
    this.infoURL = "https://wikipedia.org/wiki/Bcrypt";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  async run(input, args) {
    try {
      return `Rounds: ${bcrypt.getRounds(input)}
Salt: ${bcrypt.getSalt(input)}
Password hash: ${input.split(bcrypt.getSalt(input))[1]}
Full hash: ${input}`;
    } catch (err) {
      throw new OperationError("Error: " + err.toString());
    }
  }
}

export default BcryptParse;
