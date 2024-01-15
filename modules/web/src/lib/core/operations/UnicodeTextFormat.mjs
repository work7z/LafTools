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
import Utils from "../Utils.mjs";

/**
 * Unicode Text Format operation
 */
class UnicodeTextFormat extends Operation {

    /**
     * UnicodeTextFormat constructor
     */
    constructor() {
        super();

        this.name = "Unicode Text Format";
        this.module = "Default";
        this.description = "Adds Unicode combining characters to change formatting of plaintext.";
        this.infoURL = "https://wikipedia.org/wiki/Combining_character";
        this.inputType = "byteArray";
        this.outputType = "byteArray";
        this.args = [
            {
                name: "Underline",
                type: "boolean",
                value: "false"
            },
            {
                name: "Strikethrough",
                type: "boolean",
                value: "false"
            }
        ];
    }

    /**
     * @param {byteArray} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    run(input, args) {
        const [underline, strikethrough] = args;
        let output = input.map(char => [char]);
        if (strikethrough) {
            output = output.map(charFormat => {
                charFormat.push(...Utils.strToUtf8ByteArray("\u0336"));
                return charFormat;
            });
        }
        if (underline) {
            output = output.map(charFormat => {
                charFormat.push(...Utils.strToUtf8ByteArray("\u0332"));
                return charFormat;
            });
        }
        // return output.flat(); - Not supported in Node 10, polyfilled
        return [].concat(...output);
    }

}

export default UnicodeTextFormat;
