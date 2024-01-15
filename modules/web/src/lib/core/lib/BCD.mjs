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
 * Binary Code Decimal resources.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

/**
 * BCD encoding schemes.
 */
export const ENCODING_SCHEME = [
    "8 4 2 1",
    "7 4 2 1",
    "4 2 2 1",
    "2 4 2 1",
    "8 4 -2 -1",
    "Excess-3",
    "IBM 8 4 2 1",
];

/**
 * Lookup table for the binary value of each digit representation.
 *
 * I wrote a very nice algorithm to generate 8 4 2 1 encoding programmatically,
 * but unfortunately it's much easier (if less elegant) to use lookup tables
 * when supporting multiple encoding schemes.
 *
 * "Practicality beats purity" - PEP 20
 *
 * In some schemes it is possible to represent the same value in multiple ways.
 * For instance, in 4 2 2 1 encoding, 0100 and 0010 both represent 2. Support
 * has not yet been added for this.
 */
export const ENCODING_LOOKUP = {
    "8 4 2 1":     [0,  1,  2,  3,  4,  5,  6,  7,  8,  9],
    "7 4 2 1":     [0,  1,  2,  3,  4,  5,  6,  8,  9,  10],
    "4 2 2 1":     [0,  1,  4,  5,  8,  9,  12, 13, 14, 15],
    "2 4 2 1":     [0,  1,  2,  3,  4,  11, 12, 13, 14, 15],
    "8 4 -2 -1":   [0,  7,  6,  5,  4,  11, 10, 9,  8,  15],
    "Excess-3":    [3,  4,  5,  6,  7,  8,  9,  10, 11, 12],
    "IBM 8 4 2 1": [10, 1,  2,  3,  4,  5,  6,  7,  8,  9],
};

/**
 * BCD formats.
 */
export const FORMAT = ["Nibbles", "Bytes", "Raw"];
