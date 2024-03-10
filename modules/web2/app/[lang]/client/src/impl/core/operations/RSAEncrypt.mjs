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
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import forge from "node-forge";
import { MD_ALGORITHMS } from "../lib/RSA.mjs";

/**
 * RSA Encrypt operation
 */
class RSAEncrypt extends Operation {
  /**
   * RSAEncrypt constructor
   */
  constructor() {
    super();

    this.name = "RSA Encrypt";
    this.module = "Ciphers";
    this.description = "Encrypt a message with a PEM encoded RSA public key.";
    this.infoURL = "https://wikipedia.org/wiki/RSA_(cryptosystem)";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "RSA Public Key (PEM)",
        type: "text",
        value: "-----BEGIN RSA PUBLIC KEY-----",
      },
      {
        name: "Encryption Scheme",
        type: "argSelector",
        value: [
          {
            name: "RSA-OAEP",
            on: [2],
          },
          {
            name: "RSAES-PKCS1-V1_5",
            off: [2],
          },
          {
            name: "RAW",
            off: [2],
          },
        ],
      },
      {
        name: "Message Digest Algorithm",
        type: "option",
        value: Object.keys(MD_ALGORITHMS),
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [pemKey, scheme, md] = args;

    if (pemKey.replace("-----BEGIN RSA PUBLIC KEY-----", "").length === 0) {
      throw new OperationError("Please enter a public key.");
    }
    try {
      // Load public key
      const pubKey = forge.pki.publicKeyFromPem(pemKey);
      // https://github.com/digitalbazaar/forge/issues/465#issuecomment-271097600
      const plaintextBytes = forge.util.encodeUtf8(input);
      // Encrypt message
      const eMsg = pubKey.encrypt(plaintextBytes, scheme, {
        md: MD_ALGORITHMS[md].create(),
      });
      return eMsg;
    } catch (err) {
      if (err.message === "RSAES-OAEP input message length is too long.") {
        throw new OperationError(
          `RSAES-OAEP input message length (${err.length}) is longer than the maximum allowed length (${err.maxLength}).`,
        );
      }
      throw new OperationError(err);
    }
  }
}

export default RSAEncrypt;
