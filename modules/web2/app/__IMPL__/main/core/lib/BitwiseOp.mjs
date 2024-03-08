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
 * Bitwise operation resources.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

/**
 * Runs bitwise operations across the input data.
 *
 * @param {byteArray|Uint8Array} input
 * @param {byteArray} key
 * @param {function} func - The bitwise calculation to carry out
 * @param {boolean} nullPreserving
 * @param {string} scheme
 * @returns {byteArray}
 */
export function bitOp (input, key, func, nullPreserving, scheme) {
    if (!key || !key.length) key = [0];
    const result = [];
    let x = null,
        k = null,
        o = null;

    for (let i = 0; i < input.length; i++) {
        k = key[i % key.length];
        if (scheme === "Cascade") k = input[i + 1] || 0;
        o = input[i];
        x = nullPreserving && (o === 0 || o === k) ? o : func(o, k);
        result.push(x);
        if (scheme &&
            scheme !== "Standard" &&
            !(nullPreserving && (o === 0 || o === k))) {
            switch (scheme) {
                case "Input differential":
                    key[i % key.length] = o;
                    break;
                case "Output differential":
                    key[i % key.length] = x;
                    break;
            }
        }
    }

    return result;
}

/**
 * XOR bitwise calculation.
 *
 * @param {number} operand
 * @param {number} key
 * @returns {number}
 */
export function xor(operand, key) {
    return operand ^ key;
}


/**
 * NOT bitwise calculation.
 *
 * @param {number} operand
 * @returns {number}
 */
export function not(operand, _) {
    return ~operand & 0xff;
}


/**
 * AND bitwise calculation.
 *
 * @param {number} operand
 * @param {number} key
 * @returns {number}
 */
export function and(operand, key) {
    return operand & key;
}


/**
 * OR bitwise calculation.
 *
 * @param {number} operand
 * @param {number} key
 * @returns {number}
 */
export function or(operand, key) {
    return operand | key;
}


/**
 * ADD bitwise calculation.
 *
 * @param {number} operand
 * @param {number} key
 * @returns {number}
 */
export function add(operand, key) {
    return (operand + key) % 256;
}


/**
 * SUB bitwise calculation.
 *
 * @param {number} operand
 * @param {number} key
 * @returns {number}
 */
export function sub(operand, key) {
    const result = operand - key;
    return (result < 0) ? 256 + result : result;
}


/**
 * Delimiter options for bitwise operations
 */
export const BITWISE_OP_DELIMS = ["Hex", "Decimal", "Binary", "Base64", "UTF8", "Latin1"];
