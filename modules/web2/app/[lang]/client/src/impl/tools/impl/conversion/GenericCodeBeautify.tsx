// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf 
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * Generic Code Beautify operation
 */
class GenericCodeBeautify extends Operation {
    public getOptDetail(): OptDetail | null {
        return {
            infoURL: 'https://en.wikipedia.org/wiki/Code_beautification',
            id: 'generic-code-beautify',
            name: Dot("generic-NI-UFPTe0", "Beautify Generic Code"),
            description: Dot(
                "generic-code-beautify.desc.2b3c",
                "This operation formats code in various programming languages to improve readability by applying consistent indentation, line breaks, and adhering to language-specific style guidelines.",
                ""
            ),
            exampleInput: `// Example in JavaScript
function unformattedCode() {
var x:1,y:2,if(x>0){console.log('Hello World!'),}
}`,
            exampleOutput: `// Example of beautified JavaScript code
function unformattedCode() {
    var x : 1,
    y : 2,
    if (x > 0) {
        console.log('Hello World!'),
    }
}`,

        }
    }

    /**
     * GenericCodeBeautify constructor
     */
    constructor() {
        super();

        // this.name = "Generic Code Beautify";
        this.module = "Code";
        // this.description = ;
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];



    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const preservedTokens: any[] = [];
        let code = input,
            t = 0,
            m;

        // Remove strings
        const sstrings = /'([^'\\]|\\.)*'/g;
        while ((m = sstrings.exec(code))) {
            code = preserveToken(code, m, t++);
            sstrings.lastIndex = m.index;
        }

        const dstrings = /"([^"\\]|\\.)*"/g;
        while ((m = dstrings.exec(code))) {
            code = preserveToken(code, m, t++);
            dstrings.lastIndex = m.index;
        }

        // Remove comments
        const scomments = /\/\/[^\n\r]*/g;
        while ((m = scomments.exec(code))) {
            code = preserveToken(code, m, t++);
            scomments.lastIndex = m.index;
        }

        const mcomments = /\/\*[\s\S]*?\*\//gm;
        while ((m = mcomments.exec(code))) {
            code = preserveToken(code, m, t++);
            mcomments.lastIndex = m.index;
        }

        const hcomments = /(^|\n)#[^\n\r#]+/g;
        while ((m = hcomments.exec(code))) {
            code = preserveToken(code, m, t++);
            hcomments.lastIndex = m.index;
        }

        // Remove regexes
        const regexes = /\/.*?[^\\]\/[gim]{0,3}/gi;
        while ((m = regexes.exec(code))) {
            code = preserveToken(code, m, t++);
            regexes.lastIndex = m.index;
        }

        code = code
            // Create newlines after ;
            .replace(/;/g, ";\n")
            // Create newlines after { and around }
            .replace(/{/g, "{\n")
            .replace(/}/g, "\n}\n")
            // Remove carriage returns
            .replace(/\r/g, "")
            // Remove all indentation
            .replace(/^\s+/g, "")
            .replace(/\n\s+/g, "\n")
            // Remove trailing spaces
            .replace(/\s*$/g, "")
            .replace(/\n{/g, "{");

        // Indent
        let i = 0,
            level = 0,
            indent;
        while (i < code.length) {
            switch (code[i]) {
                case "{":
                    level++;
                    break;
                case "\n":
                    if (i + 1 >= code.length) break;

                    if (code[i + 1] === "}") level--;
                    indent = (level >= 0) ? Array(level * 4 + 1).join(" ") : "";

                    code = code.substring(0, i + 1) + indent + code.substring(i + 1);
                    if (level > 0) i += level * 4;
                    break;
            }
            i++;
        }

        code = code
            // Add strategic spaces
            .replace(/\s*([!<>=+-/*]?)=\s*/g, " $1= ")
            .replace(/\s*<([=]?)\s*/g, " <$1 ")
            .replace(/\s*>([=]?)\s*/g, " >$1 ")
            .replace(/([^+])\+([^+=])/g, "$1 + $2")
            .replace(/([^-])-([^-=])/g, "$1 - $2")
            .replace(/([^*])\*([^*=])/g, "$1 * $2")
            .replace(/([^/])\/([^/=])/g, "$1 / $2")
            .replace(/\s*,\s*/g, ", ")
            .replace(/\s*{/g, " {")
            .replace(/}\n/g, "}\n\n")
            // Hacky horribleness
            .replace(/(if|for|while|with|elif|elseif)\s*\(([^\n]*)\)\s*\n([^{])/gim, "$1 ($2)\n    $3")
            .replace(/(if|for|while|with|elif|elseif)\s*\(([^\n]*)\)([^{])/gim, "$1 ($2) $3")
            .replace(/else\s*\n([^{])/gim, "else\n    $1")
            .replace(/else\s+([^{])/gim, "else $1")
            // Remove strategic spaces
            .replace(/\s+;/g, ";")
            .replace(/\{\s+\}/g, "{}")
            .replace(/\[\s+\]/g, "[]")
            .replace(/}\s*(else|catch|except|finally|elif|elseif|else if)/gi, "} $1");

        // Replace preserved tokens
        const ptokens = /###preservedToken(\d+)###/g;
        while ((m = ptokens.exec(code))) {
            const ti = parseInt(m[1], 10);
            code = code.substring(0, m.index) + preservedTokens[ti] + code.substring(m.index + m[0].length);
            ptokens.lastIndex = m.index;
        }

        return code;

        /**
         * Replaces a matched token with a placeholder value.
         */
        function preserveToken(str, match, t) {
            preservedTokens[t] = match[0];
            return str.substring(0, match.index) +
                "###preservedToken" + t + "###" +
                str.substring(match.index + match[0].length);
        }
    }

    getInputOutputEditorLang(): InputOutputEditorLang | null {
        return {
            inputLang: "javascript",
            outputLang: "javascript"
        }
    }
}

export default GenericCodeBeautify;
