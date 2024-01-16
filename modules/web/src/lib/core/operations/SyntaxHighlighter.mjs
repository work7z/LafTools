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
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import hljs from "highlight.js";

/**
 * Syntax highlighter operation
 */
class SyntaxHighlighter extends Operation {

    /**
     * SyntaxHighlighter constructor
     */
    constructor() {
        super();

        this.name = "Syntax highlighter";
        this.module = "Code";
        this.description = "Adds syntax highlighting to a range of source code languages. Note that this will not indent the code. Use one of the 'Beautify' operations for that.";
        this.infoURL = "https://wikipedia.org/wiki/Syntax_highlighting";
        this.inputType = "string";
        this.outputType = "html";
        this.args = [
            {
                "name": "Language",
                "type": "option",
                "value": ["auto detect"].concat(hljs.listLanguages())
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {html}
     */
    run(input, args) {
        const language = args[0];

        if (language === "auto detect") {
            return hljs.highlightAuto(input).value;
        }

        return hljs.highlight(language, input, true).value;
    }

    /**
     * Highlight Syntax highlighter
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlight(pos, args) {
        return pos;
    }

    /**
     * Highlight Syntax highlighter in reverse
     *
     * @param {Object[]} pos
     * @param {number} pos[].start
     * @param {number} pos[].end
     * @param {Object[]} args
     * @returns {Object[]} pos
     */
    highlightReverse(pos, args) {
        return pos;
    }

}

export default SyntaxHighlighter;
