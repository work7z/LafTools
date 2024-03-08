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
 * Hashing resources.
 *
 * @author n1474335 [n1474335@gmail.com]
 *
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Utils from "../Utils.mjs";
import CryptoApi from "crypto-api/src/crypto-api.mjs";


/**
 * Generic hash function.
 *
 * @param {string} name
 * @param {ArrayBuffer} input
 * @param {Object} [options={}]
 * @returns {string}
 */
export function runHash(name, input, options={}) {
    const msg = Utils.arrayBufferToStr(input, false),
        hasher = CryptoApi.getHasher(name, options);
    hasher.update(msg);
    return CryptoApi.encoder.toHex(hasher.finalize());
}

