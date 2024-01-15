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
 * Protocol parsing functions.
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2022
 * @license Apache-2.0
 */

import BigNumber from "bignumber.js";
import {toHexFast} from "../lib/Hex.mjs";

/**
 * Recursively displays a JSON object as an HTML table
 *
 * @param {Object} obj
 * @returns string
 */
export function objToTable(obj, nested=false) {
    let html = `<table
        class='table table-sm table-nonfluid ${nested ? "mb-0 table-borderless" : "table-bordered"}'
        style='table-layout: fixed; ${nested ? "margin: -1px !important;" : ""}'>`;
    if (!nested)
        html += `<tr>
            <th>Field</th>
            <th>Value</th>
        </tr>`;

    for (const key in obj) {
        html += `<tr><td style='word-wrap: break-word'>${key}</td>`;
        if (typeof obj[key] === "object")
            html += `<td style='padding: 0'>${objToTable(obj[key], true)}</td>`;
        else
            html += `<td>${obj[key]}</td>`;
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

/**
 * Converts bytes into a BigNumber string
 * @param {Uint8Array} bs
 * @returns {string}
 */
export function bytesToLargeNumber(bs) {
    return BigNumber(toHexFast(bs), 16).toString();
}
