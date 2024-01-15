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
 * Code resources.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

/**
 * This tries to rename variable names in a code snippet according to a function.
 *
 * @param {string} input
 * @param {function} replacer - This function will be fed the token which should be renamed.
 * @returns {string}
 */
export function replaceVariableNames(input, replacer) {
    const tokenRegex = /\\"|"(?:\\"|[^"])*"|(\b[a-z0-9\-_]+\b)/ig;

    return input.replace(tokenRegex, (...args) => {
        const match = args[0],
            quotes = args[1];

        if (!quotes) {
            return match;
        } else {
            return replacer(match);
        }
    });
}
