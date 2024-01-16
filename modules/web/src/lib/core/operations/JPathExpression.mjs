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
 * @author Matt C (matt@artemisbot.uk)
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import {JSONPath} from "jsonpath-plus";
import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * JPath expression operation
 */
class JPathExpression extends Operation {

    /**
     * JPathExpression constructor
     */
    constructor() {
        super();

        this.name = "JPath expression";
        this.module = "Code";
        this.description = "Extract information from a JSON object with a JPath query.";
        this.infoURL = "http://goessner.net/articles/JsonPath/";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Query",
                type: "string",
                value: ""
            },
            {
                name: "Result delimiter",
                type: "binaryShortString",
                value: "\\n"
            },
            {
                name: "Prevent eval",
                type: "boolean",
                value: true,
                description: "Evaluated expressions are disabled by default for security reasons"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [query, delimiter, preventEval] = args;
        let results, jsonObj;

        try {
            jsonObj = JSON.parse(input);
        } catch (err) {
            throw new OperationError(`Invalid input JSON: ${err.message}`);
        }

        try {
            results = JSONPath({
                path: query,
                json: jsonObj,
                preventEval: preventEval
            });
        } catch (err) {
            throw new OperationError(`Invalid JPath expression: ${err.message}`);
        }

        return results.map(result => JSON.stringify(result)).join(delimiter);
    }

}

export default JPathExpression;
