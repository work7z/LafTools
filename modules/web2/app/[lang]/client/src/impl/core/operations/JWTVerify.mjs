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
 * @author gchq77703 []
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */
import Operation from "../Operation.tsx";
import jwt from "jsonwebtoken";
import OperationError from "../errors/OperationError.mjs";
import { JWT_ALGORITHMS } from "../lib/JWT.mjs";

/**
 * JWT Verify operation
 */
class JWTVerify extends Operation {
  /**
   * JWTVerify constructor
   */
  constructor() {
    super();

    this.name = "JWT Verify";
    this.module = "Crypto";
    this.description =
      "Verifies that a JSON Web Token is valid and has been signed with the provided secret / private key.<br><br>The key should be either the secret for HMAC algorithms or the PEM-encoded private key for RSA and ECDSA.";
    this.infoURL = "https://wikipedia.org/wiki/JSON_Web_Token";
    this.inputType = "string";
    this.outputType = "JSON";
    this.args = [
      {
        name: "Public/Secret Key",
        type: "text",
        value: "secret",
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [key] = args;
    const algos = JWT_ALGORITHMS;
    algos[algos.indexOf("None")] = "none";

    try {
      const verified = jwt.verify(input, key, { algorithms: algos });

      if (
        Object.prototype.hasOwnProperty.call(verified, "name") &&
        verified.name === "JsonWebTokenError"
      ) {
        throw new OperationError(verified.message);
      }

      return verified;
    } catch (err) {
      throw new OperationError(err);
    }
  }
}

export default JWTVerify;
