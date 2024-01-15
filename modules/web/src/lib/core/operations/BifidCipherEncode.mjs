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
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { genPolybiusSquare } from "../lib/Ciphers.mjs";

/**
 * Bifid Cipher Encode operation
 */
class BifidCipherEncode extends Operation {

    /**
     * BifidCipherEncode constructor
     */
    constructor() {
        super();

        this.name = "Bifid Cipher Encode";
        this.module = "Ciphers";
        this.description = "The Bifid cipher is a cipher which uses a Polybius square in conjunction with transposition, which can be fairly difficult to decipher without knowing the alphabet keyword.";
        this.infoURL = "https://wikipedia.org/wiki/Bifid_cipher";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Keyword",
                "type": "string",
                "value": ""
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if key is invalid
     */
    run(input, args) {
        const keywordStr = args[0].toUpperCase().replace("J", "I"),
            keyword = keywordStr.split("").unique(),
            alpha = "ABCDEFGHIKLMNOPQRSTUVWXYZ",
            xCo = [],
            yCo = [],
            structure = [];

        let output = "",
            count = 0;


        if (!/^[A-Z]+$/.test(keywordStr) && keyword.length > 0)
            throw new OperationError("The key must consist only of letters in the English alphabet");

        const polybius = genPolybiusSquare(keywordStr);

        input.replace("J", "I").split("").forEach(letter => {
            const alpInd = alpha.split("").indexOf(letter.toLocaleUpperCase()) >= 0;
            let polInd;

            if (alpInd) {
                for (let i = 0; i < 5; i++) {
                    polInd = polybius[i].indexOf(letter.toLocaleUpperCase());
                    if (polInd >= 0) {
                        xCo.push(polInd);
                        yCo.push(i);
                    }
                }

                if (alpha.split("").indexOf(letter) >= 0) {
                    structure.push(true);
                } else if (alpInd) {
                    structure.push(false);
                }
            } else {
                structure.push(letter);
            }
        });

        const trans = `${yCo.join("")}${xCo.join("")}`;

        structure.forEach(pos => {
            if (typeof pos === "boolean") {
                const coords = trans.substr(2*count, 2).split("");

                output += pos ?
                    polybius[coords[0]][coords[1]] :
                    polybius[coords[0]][coords[1]].toLocaleLowerCase();
                count++;
            } else {
                output += pos;
            }
        });

        return output;
    }

    /**
     * Highlight Bifid Cipher Encode
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight Bifid Cipher Encode in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default BifidCipherEncode;
