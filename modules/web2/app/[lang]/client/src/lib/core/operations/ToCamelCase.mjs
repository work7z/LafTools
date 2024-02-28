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
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import camelCase from "lodash/camelCase.js";
import Operation from "../Operation.tsx";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Camel case operation
 */
class ToCamelCase extends Operation {
  /**
   * ToCamelCase constructor
   */
  constructor() {
    super();

    this.name = "To Camel case";
    this.module = "Code";
    this.description =
      "Converts the input string to camel case.\n<br><br>\nCamel case is all lower case except letters after word boundaries which are uppercase.\n<br><br>\ne.g. thisIsCamelCase\n<br><br>\n'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names.";
    this.infoURL = "https://wikipedia.org/wiki/Camel_case";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Attempt to be context aware",
        type: "boolean",
        value: false,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const smart = args[0];

    if (smart) {
      return replaceVariableNames(input, camelCase);
    } else {
      return camelCase(input);
    }
  }
}

export default ToCamelCase;
