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
 * @author Mikescher (https://github.com/Mikescher | https://mikescher.com)
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import xmldom from "xmldom";
import xpath from "xpath";

/**
 * XPath expression operation
 */
class XPathExpression extends Operation {

    /**
     * XPathExpression constructor
     */
    constructor() {
        super();

        this.name = "XPath expression";
        this.module = "Code";
        this.description = "Extract information from an XML document with an XPath query";
        this.infoURL = "https://wikipedia.org/wiki/XPath";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "XPath",
                "type": "string",
                "value": ""
            },
            {
                "name": "Result delimiter",
                "type": "binaryShortString",
                "value": "\\n"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [query, delimiter] = args;

        let doc;
        try {
            doc = new xmldom.DOMParser({
                errorHandler: {
                    warning(w) {
                        throw w;
                    },
                    error(e) {
                        throw e;
                    },
                    fatalError(e) {
                        throw e;
                    }
                }
            }).parseFromString(input, "application/xml");
        } catch (err) {
            throw new OperationError("Invalid input XML.");
        }

        let nodes;
        try {
            nodes = xpath.parse(query).select({ node: doc, allowAnyNamespaceForNoPrefix: true });
        } catch (err) {
            throw new OperationError(`Invalid XPath. Details:\n${err.message}.`);
        }

        const nodeToString = function(node) {
            return node.toString();
        };

        return nodes.map(nodeToString).join(delimiter);
    }

}

export default XPathExpression;
