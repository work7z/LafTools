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

import kebabCase from "lodash/kebabCase.js";
import Operation from "../Operation.tsx";
import { replaceVariableNames } from "../lib/Code.mjs";

/**
 * To Kebab case operation
 */
class ToKebabCase extends Operation {
  /**
   * ToKebabCase constructor
   */
  constructor() {
    super();

    this.name = "To Kebab case";
    this.module = "Code";
    this.description =
      "Converts the input string to kebab case.\n<br><br>\nKebab case is all lower case with dashes as word boundaries.\n<br><br>\ne.g. this-is-kebab-case\n<br><br>\n'Attempt to be context aware' will make the operation attempt to nicely transform variable and function names.";
    this.infoURL = "https://wikipedia.org/wiki/Kebab_case";
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
      return replaceVariableNames(input, kebabCase);
    } else {
      return kebabCase(input);
    }
  }
}

export default ToKebabCase;
