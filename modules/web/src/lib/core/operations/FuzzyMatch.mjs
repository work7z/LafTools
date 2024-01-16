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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2021
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {fuzzyMatch, calcMatchRanges, DEFAULT_WEIGHTS} from "../lib/FuzzyMatch.mjs";
import Utils from "../Utils.mjs";

/**
 * Fuzzy Match operation
 */
class FuzzyMatch extends Operation {

    /**
     * FuzzyMatch constructor
     */
    constructor() {
        super();

        this.name = "Fuzzy Match";
        this.module = "Default";
        this.description = "Conducts a fuzzy search to find a pattern within the input based on weighted criteria.<br><br>e.g. A search for <code>dpan</code> will match on <code><b>D</b>on't <b>Pan</b>ic</code>";
        this.infoURL = "https://wikipedia.org/wiki/Fuzzy_matching_(computer-assisted_translation)";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                name: "Search",
                type: "binaryString",
                value: ""
            },
            {
                name: "Sequential bonus",
                type: "number",
                value: DEFAULT_WEIGHTS.sequentialBonus,
                hint: "Bonus for adjacent matches"
            },
            {
                name: "Separator bonus",
                type: "number",
                value: DEFAULT_WEIGHTS.separatorBonus,
                hint: "Bonus if match occurs after a separator"
            },
            {
                name: "Camel bonus",
                type: "number",
                value: DEFAULT_WEIGHTS.camelBonus,
                hint: "Bonus if match is uppercase and previous is lower"
            },
            {
                name: "First letter bonus",
                type: "number",
                value: DEFAULT_WEIGHTS.firstLetterBonus,
                hint: "Bonus if the first letter is matched"
            },
            {
                name: "Leading letter penalty",
                type: "number",
                value: DEFAULT_WEIGHTS.leadingLetterPenalty,
                hint: "Penalty applied for every letter in the input before the first match"
            },
            {
                name: "Max leading letter penalty",
                type: "number",
                value: DEFAULT_WEIGHTS.maxLeadingLetterPenalty,
                hint: "Maxiumum penalty for leading letters"
            },
            {
                name: "Unmatched letter penalty",
                type: "number",
                value: DEFAULT_WEIGHTS.unmatchedLetterPenalty
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const searchStr = args[0];
        const weights = {
            sequentialBonus: args[1],
            separatorBonus: args[2],
            camelBonus: args[3],
            firstLetterBonus: args[4],
            leadingLetterPenalty: args[5],
            maxLeadingLetterPenalty: args[6],
            unmatchedLetterPenalty: args[7]
        };
        const matches = fuzzyMatch(searchStr, input, true, weights);

        if (!matches) {
            return "No matches.";
        }

        let result = "", pos = 0, hlClass = "hl1";
        matches.forEach(([matches, score, idxs]) => {
            const matchRanges = calcMatchRanges(idxs);

            matchRanges.forEach(([start, length], i) => {
                result += Utils.escapeHtml(input.slice(pos, start));
                if (i === 0) result += `<span class="${hlClass}">`;
                pos = start + length;
                result += `<b>${Utils.escapeHtml(input.slice(start, pos))}</b>`;
            });
            result += "</span>";
            hlClass = hlClass === "hl1" ? "hl2" : "hl1";
        });

        result += Utils.escapeHtml(input.slice(pos, input.length));

        return result;
    }

}

export default FuzzyMatch;
