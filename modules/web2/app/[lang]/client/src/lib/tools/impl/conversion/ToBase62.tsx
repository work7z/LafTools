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
 * @author tcode2k16 [tcode2k16@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../../../core/Operation.tsx";
import BigNumber from "bignumber.js";
import Utils from "../../../core/Utils.mjs";
import { toHexFast } from "../../../core/lib/Hex.mjs";
import { Dot } from "../../../../utils/TranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'

/**
 * To Base62 operation
 */
class ToBase62 extends Operation {

    /**
     * ToBase62 constructor
     */
    constructor() {
        super();

        this.id = 'tobase62'
        this.name = "To Base62";
        this.module = "Default";



        this.name = Dot("M3ytc", "Encode {0}", "Base62");
        this.description = Dot(
            "BGd7dP9",
            "This operation encodes raw data into an ASCII {0} string.",
            "Base62"
        );
        this.exampleInput = TEXT_INPUT_EXAMPLE_HELLO_WORLD;
        this.exampleOutput = "T8dgcjRGkZ3aysdN";



        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                name: "Alphabet",
                type: "string",
                value: "0-9A-Za-z"
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        input = new Uint8Array(input);
        if (input.length < 1) return "";

        const alphabet = Utils.expandAlphRange(args[0]).join("");
        const BN62 = BigNumber.clone({ ALPHABET: alphabet });

        input = toHexFast(input).toUpperCase();

        // Read number in as hex using normal alphabet
        const normalized = new BigNumber(input, 16);
        // Copy to BigNumber clone that uses the specified Base62 alphabet
        const number = new BN62(normalized);

        return number.toString(62);
    }

}

export default ToBase62;
