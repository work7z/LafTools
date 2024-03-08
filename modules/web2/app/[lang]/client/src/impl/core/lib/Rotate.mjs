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
 * Bit rotation functions.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 *
 * @todo Support for UTF16
 */


/**
 * Runs rotation operations across the input data.
 *
 * @param {byteArray} data
 * @param {number} amount
 * @param {function} algo - The rotation operation to carry out
 * @returns {byteArray}
 */
export function rot(data, amount, algo) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        let b = data[i];
        for (let j = 0; j < amount; j++) {
            b = algo(b);
        }
        result.push(b);
    }
    return result;
}


/**
 * Rotate right bitwise op.
 *
 * @param {byte} b
 * @returns {byte}
 */
export function rotr(b) {
    const bit = (b & 1) << 7;
    return (b >> 1) | bit;
}

/**
 * Rotate left bitwise op.
 *
 * @param {byte} b
 * @returns {byte}
 */
export function rotl(b) {
    const bit = (b >> 7) & 1;
    return ((b << 1) | bit) & 0xFF;
}


/**
 * Rotates a byte array to the right by a specific amount as a whole, so that bits are wrapped
 * from the end of the array to the beginning.
 *
 * @param {byteArray} data
 * @param {number} amount
 * @returns {byteArray}
 */
export function rotrCarry(data, amount) {
    const result = [];
    let carryBits = 0,
        newByte;

    amount = amount % 8;
    for (let i = 0; i < data.length; i++) {
        const oldByte = data[i] >>> 0;
        newByte = (oldByte >> amount) | carryBits;
        carryBits = (oldByte & (Math.pow(2, amount)-1)) << (8-amount);
        result.push(newByte);
    }
    result[0] |= carryBits;
    return result;
}


/**
 * Rotates a byte array to the left by a specific amount as a whole, so that bits are wrapped
 * from the beginning of the array to the end.
 *
 * @param {byteArray} data
 * @param {number} amount
 * @returns {byteArray}
 */
export function rotlCarry(data, amount) {
    const result = [];
    let carryBits = 0,
        newByte;

    amount = amount % 8;
    for (let i = data.length-1; i >= 0; i--) {
        const oldByte = data[i];
        newByte = ((oldByte << amount) | carryBits) & 0xFF;
        carryBits = (oldByte >> (8-amount)) & (Math.pow(2, amount)-1);
        result[i] = (newByte);
    }
    result[data.length-1] = result[data.length-1] | carryBits;
    return result;
}
