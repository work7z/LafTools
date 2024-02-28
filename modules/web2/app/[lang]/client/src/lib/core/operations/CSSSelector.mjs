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

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import xmldom from "xmldom";
import nwmatcher from "nwmatcher";

/**
 * CSS selector operation
 */
class CSSSelector extends Operation {
  /**
   * CSSSelector constructor
   */
  constructor() {
    super();

    this.name = "CSS selector";
    this.module = "Code";
    this.description =
      "Extract information from an HTML document with a CSS selector";
    this.infoURL = "https://wikipedia.org/wiki/Cascading_Style_Sheets#Selector";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "CSS selector",
        type: "string",
        value: "",
      },
      {
        name: "Delimiter",
        type: "binaryShortString",
        value: "\\n",
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [query, delimiter] = args,
      parser = new xmldom.DOMParser();
    let dom, result;

    if (!query.length || !input.length) {
      return "";
    }

    try {
      dom = parser.parseFromString(input);
    } catch (err) {
      throw new OperationError("Invalid input HTML.");
    }

    try {
      const matcher = nwmatcher({ document: dom });
      result = matcher.select(query, dom);
    } catch (err) {
      throw new OperationError(
        "Invalid CSS Selector. Details:\n" + err.message,
      );
    }

    const nodeToString = function (node) {
      return node.toString();
      /* xmldom does not return the outerHTML value.
            switch (node.nodeType) {
                case node.ELEMENT_NODE: return node.outerHTML;
                case node.ATTRIBUTE_NODE: return node.value;
                case node.TEXT_NODE: return node.wholeText;
                case node.COMMENT_NODE: return node.data;
                case node.DOCUMENT_NODE: return node.outerHTML;
                default: throw new Error("Unknown Node Type: " + node.nodeType);
            }*/
    };

    return result.map(nodeToString).join(delimiter);
  }
}

export default CSSSelector;
