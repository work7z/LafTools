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
 * @author gchq77703 []
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import forge from "node-forge";
import { MD_ALGORITHMS } from "../lib/RSA.mjs";

/**
 * RSA Sign operation
 */
class RSASign extends Operation {

    /**
     * RSASign constructor
     */
    constructor() {
        super();

        this.name = "RSA Sign";
        this.module = "Ciphers";
        this.description = "Sign a plaintext message with a PEM encoded RSA key.";
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
        const [key, password, mdAlgo] = args;
        if (key.replace("-----BEGIN RSA PRIVATE KEY-----", "").length === 0) {
            throw new OperationError("Please enter a private key.");
        }
        try {
            const privateKey = forge.pki.decryptRsaPrivateKey(key, password);
            // Generate message hash
            const md = MD_ALGORITHMS[mdAlgo].create();
            md.update(input, "utf8");
            // Sign message hash
            const sig = privateKey.sign(md);
            return sig;
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default RSASign;
