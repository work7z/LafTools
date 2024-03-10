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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'
import Operation from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";

/**
 * From Base32 operation
 */
class FromBase32 extends Operation {

    /**
     * FromBase32 constructor
     */
    constructor() {
        super();

        this.name = "From Base32";
        this.module = "Default";
        this.description = "";
        this.inputType = "string";
        this.outputType = "byteArray";



        // new
        this.id = 'frombase32'
        this.name = Dot("rVqlu", "Decode {0}", "Base64");
        this.description = Dot(
            "JiUE8",
            "This operation decodes data from an ASCII {0} string back into its raw format.",
            "Base32"
        );
        // example for base32
        this.exampleInput = "JBSWY3DPEBLW64TMMQQQ====";
        this.exampleOutput = TEXT_INPUT_EXAMPLE_HELLO_WORLD;
        // new



        this.args = [
            {
                name: "Alphabet",
                type: "binaryString",
                value: "A-Z2-7="
            },
            {
                name: "Remove non-alphabet chars",
                type: "boolean",
                value: true
            }
        ];
        this.checks = [
            {
                pattern: "^(?:[A-Z2-7]{8})+(?:[A-Z2-7]{2}={6}|[A-Z2-7]{4}={4}|[A-Z2-7]{5}={3}|[A-Z2-7]{7}={1})?$",
                flags: "",
                args: ["A-Z2-7=", false]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        if (!input) return [];

        const alphabet = args[0] ?
            Utils.expandAlphRange(args[0]).join("") : "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
            removeNonAlphChars = args[1],
            output: any[] = [];

        let chr1, chr2, chr3, chr4, chr5,
            enc1, enc2, enc3, enc4, enc5, enc6, enc7, enc8,
            i = 0;

        if (removeNonAlphChars) {
            const re = new RegExp("[^" + alphabet.replace(/[\]\\\-^]/g, "\\$&") + "]", "g");
            input = input.replace(re, "");
        }

        while (i < input.length) {
            enc1 = alphabet.indexOf(input.charAt(i++));
            enc2 = alphabet.indexOf(input.charAt(i++) || "=");
            enc3 = alphabet.indexOf(input.charAt(i++) || "=");
            enc4 = alphabet.indexOf(input.charAt(i++) || "=");
            enc5 = alphabet.indexOf(input.charAt(i++) || "=");
            enc6 = alphabet.indexOf(input.charAt(i++) || "=");
            enc7 = alphabet.indexOf(input.charAt(i++) || "=");
            enc8 = alphabet.indexOf(input.charAt(i++) || "=");

            chr1 = (enc1 << 3) | (enc2 >> 2);
            chr2 = ((enc2 & 3) << 6) | (enc3 << 1) | (enc4 >> 4);
            chr3 = ((enc4 & 15) << 4) | (enc5 >> 1);
            chr4 = ((enc5 & 1) << 7) | (enc6 << 2) | (enc7 >> 3);
            chr5 = ((enc7 & 7) << 5) | enc8;

            output.push(chr1);
            if ((enc2 & 3) !== 0 || enc3 !== 32) output.push(chr2);
            if ((enc4 & 15) !== 0 || enc5 !== 32) output.push(chr3);
            if ((enc5 & 1) !== 0 || enc6 !== 32) output.push(chr4);
            if ((enc7 & 7) !== 0 || enc8 !== 32) output.push(chr5);
        }

        return output;
    }

}

export default FromBase32;
