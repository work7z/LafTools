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
 * Parser for Type-length-value data.
 *
 * @author gchq77703 []
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

const defaults = {
    location: 0,
    bytesInLength: 1,
    basicEncodingRules: false
};

/**
 * TLVParser library
 */
export default class TLVParser {

    /**
     * TLVParser constructor
     *
     * @param {byteArray|Uint8Array} input
     * @param {Object} options
     */
    constructor(input, options) {
        this.input = input;
        Object.assign(this, defaults, options);
    }

    /**
     * @returns {number}
     */
    getLength() {
        if (this.basicEncodingRules) {
            const bit = this.input[this.location];
            if (bit & 0x80) {
                this.bytesInLength = bit & ~0x80;
            } else {
                this.location++;
                return bit & ~0x80;
            }
        }

        let length = 0;

        for (let i = 0; i < this.bytesInLength; i++) {
            length += this.input[this.location] * Math.pow(Math.pow(2, 8), i);
            this.location++;
        }

        return length;
    }

    /**
     * @param {number} length
     * @returns {number[]}
     */
    getValue(length) {
        const value = [];

        for (let i = 0; i < length; i++) {
            if (this.location > this.input.length) return value;
            value.push(this.input[this.location]);
            this.location++;
        }

        return value;
    }

    /**
     * @returns {boolean}
     */
    atEnd() {
        return this.input.length <= this.location;
    }
}
