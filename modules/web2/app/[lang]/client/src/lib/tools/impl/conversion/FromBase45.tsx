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
 * @author Thomas Weißschuh [thomas@t-8ch.de]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 */

import { ALPHABET, highlightToBase45, highlightFromBase45 } from "../../../core/lib/Base45.mjs";
import Operation from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import Utils from "../../../core/Utils.mjs";
import { Dot } from "../../../../utils/TranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'


/**
 * From Base45 operation
 */
class FromBase45 extends Operation {

    /**
     * FromBase45 constructor
     */
    constructor() {
        super();

        this.name = "From Base45";
        this.module = "Default";
        this.inputType = "string";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "Alphabet",
                type: "string",
                value: ALPHABET
            },
            {
                name: "Remove non-alphabet chars",
                type: "boolean",
                value: true
            },
        ];


        // new
        this.id = 'frombase45'
        this.name = Dot("rVqlu", "Decode {0}", "Base45");
        this.description = Dot(
            "JiUE8",
            "This operation decodes data from an ASCII {0} string back into its raw format.",
            "Base45"
        );
        // example for base45
        this.exampleInput = "%69 VD82EI2B.KESTC";
        this.exampleOutput = TEXT_INPUT_EXAMPLE_HELLO_WORLD;
        // new



        this.highlight = highlightFromBase45;
        this.highlightReverse = highlightToBase45;
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        if (!input) return [];
        const alphabet = Utils.expandAlphRange(args[0]).join("");
        const removeNonAlphChars = args[1];

        const res: any = [];

        // Remove non-alphabet characters
        if (removeNonAlphChars) {
            const re = new RegExp("[^" + alphabet.replace(/[[\]\\\-^$]/g, "\\$&") + "]", "g");
            input = input.replace(re, "");
        }

        for (const triple of Utils.chunked(input, 3)) {
            triple.reverse();
            let b = 0;
            for (const c of triple) {
                const idx = alphabet.indexOf(c);
                if (idx === -1) {
                    throw new OperationError(`Character not in alphabet: '${c}'`);
                }
                b *= 45;
                b += idx;
            }

            if (b > 65535) {
                throw new OperationError(`Triplet too large: '${triple.join("")}'`);
            }

            if (triple.length > 2) {
                /**
                 * The last triple may only have 2 bytes so we push the MSB when we got 3 bytes
                 * Pushing MSB
                 */
                res.push(b >> 8);
            }

            /**
             * Pushing LSB
             */
            res.push(b & 0xff);

        }

        return res;
    }

}

export default FromBase45;