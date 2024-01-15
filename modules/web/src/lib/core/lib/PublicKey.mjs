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
 * Public key resources.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import { toHex, fromHex } from "./Hex.mjs";

/**
 * Formats Distinguished Name (DN) objects to strings.
 *
 * @param {Object} dnObj
 * @param {number} indent
 * @returns {string}
 */
export function formatDnObj(dnObj, indent) {
    let output = "";

    const maxKeyLen = dnObj.array.reduce((max, item) => {
        return item[0].type.length > max ? item[0].type.length : max;
    }, 0);

    for (let i = 0; i < dnObj.array.length; i++) {
        if (!dnObj.array[i].length) continue;

        const key = dnObj.array[i][0].type;
        const value = dnObj.array[i][0].value;
        const str = `${key.padEnd(maxKeyLen, " ")} = ${value}\n`;

        output += str.padStart(indent + str.length, " ");
    }

    return output.slice(0, -1);
}


/**
 * Formats byte strings by adding line breaks and delimiters.
 *
 * @param {string} byteStr
 * @param {number} length - Line width
 * @param {number} indent
 * @returns {string}
 */
export function formatByteStr(byteStr, length, indent) {
    byteStr = toHex(fromHex(byteStr), ":");
    length = length * 3;
    let output = "";

    for (let i = 0; i < byteStr.length; i += length) {
        const str = byteStr.slice(i, i + length) + "\n";
        if (i === 0) {
            output += str;
        } else {
            output += str.padStart(indent + str.length, " ");
        }
    }

    return output.slice(0, output.length-1);
}
