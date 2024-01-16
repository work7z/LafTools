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
import url from "url";

/**
 * Parse URI operation
 */
class ParseURI extends Operation {

    /**
     * ParseURI constructor
     */
    constructor() {
        super();

        this.name = "Parse URI";
        this.module = "URL";
        this.description = "Pretty prints complicated Uniform Resource Identifier (URI) strings for ease of reading. Particularly useful for Uniform Resource Locators (URLs) with a lot of arguments.";
        this.infoURL = "https://wikipedia.org/wiki/Uniform_Resource_Identifier";
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
        const uri = url.parse(input, true);

        let output = "";

        if (uri.protocol) output += "Protocol:\t" + uri.protocol + "\n";
        if (uri.auth) output += "Auth:\t\t" + uri.auth + "\n";
        if (uri.hostname) output += "Hostname:\t" + uri.hostname + "\n";
        if (uri.port) output += "Port:\t\t" + uri.port + "\n";
        if (uri.pathname) output += "Path name:\t" + uri.pathname + "\n";
        if (uri.query) {
            const keys = Object.keys(uri.query);
            let padding = 0;

            keys.forEach(k => {
                padding = (k.length > padding) ? k.length : padding;
            });

            output += "Arguments:\n";
            for (const key in uri.query) {
                output += "\t" + key.padEnd(padding, " ");
                if (uri.query[key].length) {
                    output += " = " + uri.query[key] + "\n";
                } else {
                    output += "\n";
                }
            }
        }
        if (uri.hash) output += "Hash:\t\t" + uri.hash + "\n";

        return output;
    }

}

export default ParseURI;
