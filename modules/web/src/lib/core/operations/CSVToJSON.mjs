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
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";

/**
 * CSV to JSON operation
 */
class CSVToJSON extends Operation {

    /**
     * CSVToJSON constructor
     */
    constructor() {
        super();

        this.name = "CSV to JSON";
        this.module = "Default";
        this.description = "Converts a CSV file to JSON format.";
        this.infoURL = "https://wikipedia.org/wiki/Comma-separated_values";
        this.inputType = "string";
        this.outputType = "JSON";
        this.args = [
            {
                name: "Cell delimiters",
                type: "binaryShortString",
                value: ","
            },
            {
                name: "Row delimiters",
                type: "binaryShortString",
                value: "\\r\\n"
            },
            {
                name: "Format",
                type: "option",
                value: ["Array of dictionaries", "Array of arrays"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {JSON}
     */
    run(input, args) {
        const [cellDelims, rowDelims, format] = args;
        let json, header;

        try {
            json = Utils.parseCSV(input, cellDelims.split(""), rowDelims.split(""));
        } catch (err) {
            throw new OperationError("Unable to parse CSV: " + err);
        }

        switch (format) {
            case "Array of dictionaries":
                header = json[0];
                return json.slice(1).map(row => {
                    const obj = {};
                    header.forEach((h, i) => {
                        obj[h] = row[i];
                    });
                    return obj;
                });
            case "Array of arrays":
            default:
                return json;
        }
    }

}

export default CSVToJSON;
