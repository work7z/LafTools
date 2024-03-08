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
 * @author tlwr [toby@toby.codes]
 * @author Matt C [matt@artemisbot.uk]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import kbpgp from "kbpgp";
import { getSubkeySize, ASP } from "../lib/PGP.mjs";
import { cryptNotice } from "../lib/Crypt.mjs";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default
  ? es6promisify.default.promisify
  : es6promisify.promisify;

/**
 * Generate PGP Key Pair operation
 */
class GeneratePGPKeyPair extends Operation {
  /**
   * GeneratePGPKeyPair constructor
   */
  constructor() {
    super();

    this.name = "Generate PGP Key Pair";
    this.module = "PGP";
    this.description = `Generates a new public/private PGP key pair. Supports RSA and Eliptic Curve (EC) keys.<br><br>${cryptNotice}`;
    this.infoURL = "https://wikipedia.org/wiki/Pretty_Good_Privacy";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Key type",
        type: "option",
        value: [
          "RSA-1024",
          "RSA-2048",
          "RSA-4096",
          "ECC-256",
          "ECC-384",
          "ECC-521",
        ],
      },
      {
        name: "Password (optional)",
        type: "string",
        value: "",
      },
      {
        name: "Name (optional)",
        type: "string",
        value: "",
      },
      {
        name: "Email (optional)",
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
    let [keyType, keySize] = args[0].split("-");
    const password = args[1],
      name = args[2],
      email = args[3];
    let userIdentifier = "";

    keyType = keyType.toLowerCase();
    keySize = parseInt(keySize, 10);

    if (name) userIdentifier += name;
    if (email) userIdentifier += ` <${email}>`;

    let flags = kbpgp.const.openpgp.certify_keys;
    flags |= kbpgp.const.openpgp.sign_data;
    flags |= kbpgp.const.openpgp.auth;
    flags |= kbpgp.const.openpgp.encrypt_comm;
    flags |= kbpgp.const.openpgp.encrypt_storage;

    const keyGenerationOptions = {
      userid: userIdentifier,
      ecc: keyType === "ecc",
      primary: {
        nbits: keySize,
        flags: flags,
        expire_in: 0,
      },
      subkeys: [
        {
          nbits: getSubkeySize(keySize),
          flags: kbpgp.const.openpgp.sign_data,
          expire_in: 86400 * 365 * 8,
        },
        {
          nbits: getSubkeySize(keySize),
          flags:
            kbpgp.const.openpgp.encrypt_comm |
            kbpgp.const.openpgp.encrypt_storage,
          expire_in: 86400 * 365 * 2,
        },
      ],
      asp: ASP,
    };

    return new Promise(async (resolve, reject) => {
      try {
        const unsignedKey = await promisify(kbpgp.KeyManager.generate)(
          keyGenerationOptions,
        );
        await promisify(unsignedKey.sign.bind(unsignedKey))({});

        const signedKey = unsignedKey,
          privateKeyExportOptions = {};

        if (password) privateKeyExportOptions.passphrase = password;
        const privateKey = await promisify(
          signedKey.export_pgp_private.bind(signedKey),
        )(privateKeyExportOptions);
        const publicKey = await promisify(
          signedKey.export_pgp_public.bind(signedKey),
        )({});
        resolve(privateKey + "\n" + publicKey.trim());
      } catch (err) {
        reject(`Error whilst generating key pair: ${err}`);
      }
    });
  }
}

export default GeneratePGPKeyPair;
