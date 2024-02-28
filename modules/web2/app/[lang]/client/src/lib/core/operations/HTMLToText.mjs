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
 * @author Matt C [me@mitt.dev]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * HTML To Text operation
 */
class HTMLToText extends Operation {
  /**
   * HTMLToText constructor
   */
  constructor() {
    super();

    this.name = "HTML To Text";
    this.module = "Default";
    this.description =
      "Converts an HTML output from an operation to a readable string instead of being rendered in the DOM.";
    this.infoURL = "";
    this.inputType = "html";
    this.outputType = "string";
    this.args = [];
  }

  /**
   * @param {html} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    return input;
  }
}

export default HTMLToText;
