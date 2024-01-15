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
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import forge from "node-forge";
import { cryptNotice } from "../lib/Crypt.mjs";

/**
 * Generate RSA Key Pair operation
 */
class GenerateRSAKeyPair extends Operation {

    /**
     * GenerateRSAKeyPair constructor
     */
    constructor() {
        super();

        this.name = "Generate RSA Key Pair";
        this.module = "Ciphers";
        this.description = `Generate an RSA key pair with a given number of bits.<br><br>${cryptNotice}`;
        this.infoURL = "https://wikipedia.org/wiki/RSA_(cryptosystem)";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "RSA Key Length",
                type: "option",
                value: [
                    "1024",
                    "2048",
                    "4096"
                ]
            },
            {
                name: "Output Format",
                type: "option",
                value: [
                    "PEM",
                    "JSON",
                    "DER"
                ]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const [keyLength, outputFormat] = args;

        return new Promise((resolve, reject) => {
            forge.pki.rsa.generateKeyPair({
                bits: Number(keyLength),
                workers: -1,
                workerScript: "assets/forge/prime.worker.min.js"
            }, (err, keypair) => {
                if (err) return reject(err);

                let result;

                switch (outputFormat) {
                    case "PEM":
                        result = forge.pki.publicKeyToPem(keypair.publicKey) + "\n" + forge.pki.privateKeyToPem(keypair.privateKey);
                        break;
                    case "JSON":
                        result = JSON.stringify(keypair);
                        break;
                    case "DER":
                        result = forge.asn1.toDer(forge.pki.privateKeyToAsn1(keypair.privateKey)).getBytes();
                        break;
                }

                resolve(result);
            });
        });
    }

}

export default GenerateRSAKeyPair;
