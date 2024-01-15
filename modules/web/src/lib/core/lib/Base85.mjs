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

import Utils from "../Utils.mjs";

/**
 * Base85 resources.
 *
 * @author PenguinGeorge [george@penguingeorge.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

/**
 * Base85 alphabet options.
 */
export const ALPHABET_OPTIONS = [
    {
        name: "Standard",
        value: "!-u",
    },
    {
        name: "Z85 (ZeroMQ)",
        value: "0-9a-zA-Z.\\-:+=^!/*?&<>()[]{}@%$#",
    },
    {
        name: "IPv6",
        value: "0-9A-Za-z!#$%&()*+\\-;<=>?@^_`{|}~",
    }
];


/**
 * Returns the name of the alphabet, when given the alphabet.
 *
 * @param {string} alphabet
 * @returns {string}
 */
export function alphabetName(alphabet) {
    alphabet = escape(alphabet);
    let name;

    ALPHABET_OPTIONS.forEach(function(a) {
        const expanded = Utils.expandAlphRange(a.value).join("");
        if (alphabet === escape(expanded)) name = a.name;
    });

    return name;
}
