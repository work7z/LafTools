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
 * @author gchq77703 []
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import jwt from "jsonwebtoken";
import OperationError from "../errors/OperationError.mjs";

/**
 * JWT Decode operation
 */
class JWTDecode extends Operation {
  /**
   * JWTDecode constructor
   */
  constructor() {
    super();

    this.name = "JWT Decode";
    this.module = "Crypto";
    this.description =
      "Decodes a JSON Web Token <b>without</b> checking whether the provided secret / private key is valid. Use 'JWT Verify' to check if the signature is valid as well.";
    this.infoURL = "https://wikipedia.org/wiki/JSON_Web_Token";
    this.inputType = "string";
    this.outputType = "JSON";
    this.args = [];
    this.checks = [
      {
        pattern: "^ey([A-Za-z0-9_-]+)\\.ey([A-Za-z0-9_-]+)\\.([A-Za-z0-9_-]+)$",
        flags: "",
        args: [],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {JSON}
   */
  run(input, args) {
    try {
      const decoded = jwt.decode(input, {
        json: true,
        complete: true,
      });

      return decoded.payload;
    } catch (err) {
      throw new OperationError(err);
    }
  }
}

export default JWTDecode;
