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
 * PGP functions.
 *
 * @author tlwr [toby@toby.codes]
 * @author Matt C [matt@artemisbot.uk]
 * @author n1474335 [n1474335@gmail.com]
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 *
 */

import OperationError from "../errors/OperationError.mjs";
import { isWorkerEnvironment } from "../Utils.mjs";
import kbpgp from "kbpgp";
import * as es6promisify from "es6-promisify";
const promisify = es6promisify.default
  ? es6promisify.default.promisify
  : es6promisify.promisify;

/**
 * Progress callback
 */
export const ASP = kbpgp.ASP({
  progress_hook: (info) => {
    let msg = "";

    switch (info.what) {
      case "guess":
        msg = "Guessing a prime";
        break;
      case "fermat":
        msg = "Factoring prime using Fermat's factorization method";
        break;
      case "mr":
        msg = "Performing Miller-Rabin primality test";
        break;
      case "passed_mr":
        msg = "Passed Miller-Rabin primality test";
        break;
      case "failed_mr":
        msg = "Failed Miller-Rabin primality test";
        break;
      case "found":
        msg = "Prime found";
        break;
      default:
        msg = `Stage: ${info.what}`;
    }

    if (isWorkerEnvironment()) self.sendStatusMessage(msg);
  },
});

/**
 * Get size of subkey
 *
 * @param {number} keySize
 * @returns {number}
 */
export function getSubkeySize(keySize) {
  return {
    1024: 1024,
    2048: 1024,
    4096: 2048,
    256: 256,
    384: 256,
  }[keySize];
}

/**
 * Import private key and unlock if necessary
 *
 * @param {string} privateKey
 * @param {string} [passphrase]
 * @returns {Object}
 */
export async function importPrivateKey(privateKey, passphrase) {
  try {
    const key = await promisify(kbpgp.KeyManager.import_from_armored_pgp)({
      armored: privateKey,
      opts: {
        no_check_keys: true,
      },
    });
    if (key.is_pgp_locked()) {
      if (passphrase) {
        await promisify(key.unlock_pgp.bind(key))({
          passphrase,
        });
      } else {
        throw new OperationError(
          "Did not provide passphrase with locked private key.",
        );
      }
    }
    return key;
  } catch (err) {
    throw new OperationError(`Could not import private key: ${err}`);
  }
}

/**
 * Import public key
 *
 * @param {string} publicKey
 * @returns {Object}
 */
export async function importPublicKey(publicKey) {
  try {
    const key = await promisify(kbpgp.KeyManager.import_from_armored_pgp)({
      armored: publicKey,
      opts: {
        no_check_keys: true,
      },
    });
    return key;
  } catch (err) {
    throw new OperationError(`Could not import public key: ${err}`);
  }
}
