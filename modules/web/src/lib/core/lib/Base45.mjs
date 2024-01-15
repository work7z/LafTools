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
 * Base45 resources.
 *
 * @author Thomas Weißschuh [thomas@t-8ch.de]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 */

/**
 * Highlight to Base45
 */
export function highlightToBase45(pos, args) {
    pos[0].start = Math.floor(pos[0].start / 2) * 3;
    pos[0].end = Math.ceil(pos[0].end / 2) * 3;
    return pos;
}

/**
 * Highlight from Base45
 */
export function highlightFromBase45(pos, args) {
    pos[0].start = Math.floor(pos[0].start / 3) * 2;
    pos[0].end = Math.ceil(pos[0].end / 3) * 2;
    return pos;
}

export const ALPHABET = "0-9A-Z $%*+\\-./:";
