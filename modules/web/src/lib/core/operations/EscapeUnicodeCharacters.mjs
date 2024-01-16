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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Escape Unicode Characters operation
 */
class EscapeUnicodeCharacters extends Operation {

    /**
     * EscapeUnicodeCharacters constructor
     */
    constructor() {
        super();

        this.name = "Escape Unicode Characters";
        this.module = "Default";
        this.description = "Converts characters to their unicode-escaped notations.<br><br>Supports the prefixes:<ul><li><code>\\u</code></li><li><code>%u</code></li><li><code>U+</code></li></ul>e.g. <code>σου</code> becomes <code>\\u03C3\\u03BF\\u03C5</code>";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Prefix",
                "type": "option",
                "value": ["\\u", "%u", "U+"]
            },
            {
                "name": "Encode all chars",
                "type": "boolean",
                "value": false
            },
            {
                "name": "Padding",
                "type": "number",
                "value": 4
            },
            {
                "name": "Uppercase hex",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern: "\\\\u(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["\\u"]
            },
            {
                pattern: "%u(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["%u"]
            },
            {
                pattern: "U\\+(?:[\\da-f]{4,6})",
                flags: "i",
                args: ["U+"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const regexWhitelist = /[ -~]/i,
            [prefix, encodeAll, padding, uppercaseHex] = args;

        let output = "",
            character = "";

        for (let i = 0; i < input.length; i++) {
            character = input[i];
            if (!encodeAll && regexWhitelist.test(character)) {
                // It’s a printable ASCII character so don’t escape it.
                output += character;
                continue;
            }

            let cp = character.codePointAt(0).toString(16);
            if (uppercaseHex) cp = cp.toUpperCase();
            output += prefix + cp.padStart(padding, "0");
        }

        return output;
    }

}

export default EscapeUnicodeCharacters;
