// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Author: Ryan Laf <get>
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

import Operation from "../Operation.mjs";
import Utils from "../Utils.mjs";
import CryptoApi from "crypto-api/src/crypto-api.mjs";

/**
 * HMAC operation
 */
class HMAC extends Operation {

    /**
     * HMAC constructor
     */
    constructor() {
        super();

        this.name = "HMAC";
        this.module = "Crypto";
        this.description = "Keyed-Hash Message Authentication Codes (HMAC) are a mechanism for message authentication using cryptographic hash functions.";
        this.infoURL = "https://wikipedia.org/wiki/HMAC";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Key",
                "type": "toggleString",
                "value": "",
                "toggleValues": ["Hex", "Decimal", "Base64", "UTF8", "Latin1"]
            },
            {
                "name": "Hashing function",
                "type": "option",
                "value": [
                    "MD2",
                    "MD4",
                    "MD5",
                    "SHA0",
                    "SHA1",
                    "SHA224",
                    "SHA256",
                    "SHA384",
                    "SHA512",
                    "SHA512/224",
                    "SHA512/256",
                    "RIPEMD128",
                    "RIPEMD160",
                    "RIPEMD256",
                    "RIPEMD320",
                    "HAS160",
                    "Whirlpool",
                    "Whirlpool-0",
                    "Whirlpool-T",
                    "Snefru"
                ]
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string || "", args[0].option),
            hashFunc = args[1].toLowerCase(),
            msg = Utils.arrayBufferToStr(input, false),
            hasher = CryptoApi.getHasher(hashFunc);

        const mac = CryptoApi.getHmac(key, hasher);
        mac.update(msg);
        return CryptoApi.encoder.toHex(mac.finalize());
    }

}

export default HMAC;
