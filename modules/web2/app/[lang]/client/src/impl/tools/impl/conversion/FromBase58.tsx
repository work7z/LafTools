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
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import OperationError from "../../../core/errors/OperationError.mjs";
import { ALPHABET_OPTIONS } from "../../../core/lib/Base58.mjs";

/**
 * From Base58 operation
 */
class FromBase58 extends Operation {
    public getOptDetail(): OptDetail {
        return {
            infoURL: "https://en.wikipedia.org/wiki/Base58",

            id: 'frombase58',
            name: Dot("L9qbQku", "Decode {0}", "Base58"),
            description: Dot(
                "JdqidUE8",
                "This operation decodes data from an ASCII string (with an alphabet of your choosing, presets included) back into its raw form.",
            ),

            exampleOutput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
            exampleInput: "2NEpo7TZRRrLZSi2U",


            config: {
                "module": "Default",
                "description": "Base58 (similar to Base64) is a notation for encoding arbitrary byte data. It differs from Base64 by removing easily misread characters (i.e. l, I, 0 and O) to improve human readability.<br><br>This operation decodes data from an ASCII string (with an alphabet of your choosing, presets included) back into its raw form.<br><br>e.g. <code>StV1DL6CwTryKyV</code> becomes <code>hello world</code><br><br>Base58 is commonly used in cryptocurrencies (Bitcoin, Ripple, etc).",
                "infoURL": "https://wikipedia.org/wiki/Base58",
                "inputType": "string",
                "outputType": "byteArray",
                "flowControl": false,
                "manualBake": false,
                "args": [
                    {
                        "name": "Alphabet",
                        "type": "editableOption",
                        "value": [
                            {
                                "name": "Bitcoin",
                                "value": "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
                            },
                            {
                                "name": "Ripple",
                                "value": "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"
                            }
                        ]
                    },
                    {
                        "name": "Remove non-alphabet chars",
                        "type": "boolean",
                        "value": true
                    }
                ],
                "checks": [
                    {
                        "pattern": "^[1-9A-HJ-NP-Za-km-z]{20,}$",
                        "flags": "",
                        "args": [
                            "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
                            false
                        ]
                    },
                    {
                        "pattern": "^[1-9A-HJ-NP-Za-km-z]{20,}$",
                        "flags": "",
                        "args": [
                            "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz",
                            false
                        ]
                    }
                ]
            }

        }
    }

    /**
     * FromBase58 constructor
     */
    constructor() {
        super();

        this.module = "Default";
        // this.description = ;
        // this.infoURL = "";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                "name": "Alphabet",
                "type": "editableOption",
                "value": ALPHABET_OPTIONS
            },
            {
                "name": "Remove non-alphabet chars",
                "type": "boolean",
                "value": true
            }
        ];





        this.checks = [
            {
                pattern: "^[1-9A-HJ-NP-Za-km-z]{20,}$",
                flags: "",
                args: ["123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", false]
            },
            {
                pattern: "^[1-9A-HJ-NP-Za-km-z]{20,}$",
                flags: "",
                args: ["rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz", false]
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        let alphabet = args[0] || ALPHABET_OPTIONS[0].value;
        const removeNonAlphaChars = args[1] === undefined ? true : args[1],
            result = [0];

        alphabet = Utils.expandAlphRange(alphabet).join("");

        if (alphabet.length !== 58 ||
            ([] as any).unique.call(alphabet).length !== 58) {
            throw new OperationError("Alphabet must be of length 58");
        }

        if (input.length === 0) return [];

        let zeroPrefix = 0;
        for (let i = 0; i < input.length && input[i] === alphabet[0]; i++) {
            zeroPrefix++;
        }

        [].forEach.call(input, function (c, charIndex) {
            const index = alphabet.indexOf(c);

            if (index === -1) {
                if (removeNonAlphaChars) {
                    return;
                } else {
                    throw new OperationError(`Char '${c}' at position ${charIndex} not in alphabet`);
                }
            }

            let carry = result[0] * 58 + index;
            result[0] = carry & 0xFF;
            carry = carry >> 8;

            for (let i = 1; i < result.length; i++) {
                carry += result[i] * 58;
                result[i] = carry & 0xFF;
                carry = carry >> 8;
            }

            while (carry > 0) {
                result.push(carry & 0xFF);
                carry = carry >> 8;
            }
        });

        while (zeroPrefix--) {
            result.push(0);
        }

        return result.reverse();
    }

}

export default FromBase58;
