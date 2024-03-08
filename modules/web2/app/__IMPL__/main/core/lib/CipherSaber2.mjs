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
 * @author n1073645 [n1073645@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */
export function encode(tempIVP, key, rounds, input) {
    const ivp = new Uint8Array(key.concat(tempIVP));
    const state = new Array(256).fill(0);
    let j = 0, i = 0;
    const result = [];

    // Mixing states based off of IV.
    for (let i = 0; i < 256; i++)
        state[i] = i;
    const ivpLength = ivp.length;
    for (let r = 0; r < rounds; r ++) {
        for (let k = 0; k < 256; k++) {
            j = (j + state[k] + ivp[k % ivpLength]) % 256;
            [state[k], state[j]] = [state[j], state[k]];
        }
    }
    j = 0;
    i = 0;

    // XOR cipher with key.
    for (let x = 0; x < input.length; x++) {
        i = (++i) % 256;
        j = (j + state[i]) % 256;
        [state[i], state[j]] = [state[j], state[i]];
        const n = (state[i] + state[j]) % 256;
        result.push(state[n] ^ input[x]);
    }
    return result;
}
