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
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import forge from "node-forge";
import { MD_ALGORITHMS } from "../lib/RSA.mjs";

/**
 * RSA Decrypt operation
 */
class RSADecrypt extends Operation {

    /**
     * RSADecrypt constructor
     */
    constructor() {
        super();

        this.name = "RSA Decrypt";
        this.module = "Ciphers";
        this.description = "Decrypt an RSA encrypted message with a PEM encoded private key.";
        this.infoURL = "https://wikipedia.org/wiki/RSA_(cryptosystem)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "RSA Private Key (PEM)",
                type: "text",
                value: "-----BEGIN RSA PRIVATE KEY-----"
            },
            {
                name: "Key Password",
                type: "text",
                value: ""
            },
            {
                name: "Encryption Scheme",
                type: "argSelector",
                value: [
                    {
                        name: "RSA-OAEP",
                        on: [3]
                    },
                    {
                        name: "RSAES-PKCS1-V1_5",
                        off: [3]
                    },
                    {
                        name: "RAW",
                        off: [3]
                    }]
            },
            {
                name: "Message Digest Algorithm",
                type: "option",
                value: Object.keys(MD_ALGORITHMS)
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [pemKey, password, scheme, md] = args;
        if (pemKey.replace("-----BEGIN RSA PRIVATE KEY-----", "").length === 0) {
            throw new OperationError("Please enter a private key.");
        }
        try {
            const privKey = forge.pki.decryptRsaPrivateKey(pemKey, password);
            const dMsg = privKey.decrypt(input, scheme, {md: MD_ALGORITHMS[md].create()});
            return forge.util.decodeUtf8(dMsg);
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default RSADecrypt;
