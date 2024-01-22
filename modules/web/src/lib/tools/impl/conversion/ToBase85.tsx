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
 * @author PenguinGeorge [george@penguingeorge.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../../../core/Operation.mjs";
import OperationError from "../../../core/errors/OperationError.mjs";
import Utils from "../../../core/Utils.mjs";
import { alphabetName, ALPHABET_OPTIONS } from "../../../core/lib/Base85.mjs";
import { Dot } from "../../../../utils/TranslationUtils";

/**
 * To Base85 operation
 */
class ToBase85 extends Operation {

    /**
     * To Base85 constructor
     */
    constructor() {
        super();

        this.name = "To Base85";
        this.module = "Default";
        // this.description = "Base85 (also called Ascii85) is a notation for encoding arbitrary byte data. It is usually more efficient that Base64.<br><br>This operation encodes data in an ASCII string (with an alphabet of your choosing, presets included).<br><br>e.g. <code>hello world</code> becomes <code>BOu!rD]j7BEbo7</code><br><br>Base85 is commonly used in Adobe's PostScript and PDF file formats.<br><br><strong>Options</strong><br><u>Alphabet</u><ul><li>Standard - The standard alphabet, referred to as Ascii85</li><li>Z85 (ZeroMQ) - A string-safe variant of Base85, which avoids quote marks and backslash characters</li><li>IPv6 - A variant of Base85 suitable for encoding IPv6 addresses (RFC 1924)</li></ul><u>Include delimiter</u><br>Adds a '<~' and '~>' delimiter to the start and end of the data. This is standard for Adobe's implementation of Base85.";
        // this.infoURL = "https://wikipedia.org/wiki/Ascii85";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Alphabet",
                type: "editableOption",
                value: ALPHABET_OPTIONS
            },
            {
                name: "Include delimeter",
                type: "boolean",
                value: false
            }
        ];


        this.id = 'tobase85'
        this.name = Dot("M3ytc", "Encode {0}", "Base85");
        this.description = Dot(
            "nodBw",
            "This operation encodes raw data into an ASCII {0} string.",
            "Base85"
        );
        this.exampleInput = "Hello World!";
        this.exampleOutput = "87cURD]i,\"Ebo80";

    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
    */
    run(input, args) {
        input = new Uint8Array(input);
        const alphabet = Utils.expandAlphRange(args[0]).join(""),
            encoding = alphabetName(alphabet),
            includeDelim = args[1];
        let result = "";

        if (alphabet.length !== 85 ||
            ([] as any).unique.call(alphabet).length !== 85) {
            throw new OperationError("Error: Alphabet must be of length 85");
        }

        if (input.length === 0) return "";

        let block: number;
        for (let i = 0; i < input.length; i += 4) {
            block = (
                ((input[i]) << 24) +
                ((input[i + 1] || 0) << 16) +
                ((input[i + 2] || 0) << 8) +
                ((input[i + 3] || 0))
            ) >>> 0;

            if (encoding !== "Standard" || block > 0) {
                let digits: any = [];
                for (let j = 0; j < 5; j++) {
                    digits.push((block as any) % 85);
                    block = Math.floor(block / 85);
                }

                digits = digits.reverse();

                if (input.length < i + 4) {
                    digits.splice(input.length - (i + 4), 4);
                }

                result += digits.map(digit => alphabet[digit]).join("");
            } else {
                result += (encoding === "Standard") ? "z" : null;
            }
        }

        return includeDelim ? `<~${result}~>` : result;
    }
}

export default ToBase85;
