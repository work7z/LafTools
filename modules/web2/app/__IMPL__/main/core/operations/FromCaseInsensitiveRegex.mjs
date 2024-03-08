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
 * @author masq [github.cyberchef@masq.cc]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";

/**
 * From Case Insensitive Regex operation
 */
class FromCaseInsensitiveRegex extends Operation {
  /**
   * FromCaseInsensitiveRegex constructor
   */
  constructor() {
    super();

    this.name = "From Case Insensitive Regex";
    this.module = "Default";
    this.description =
      "Converts a case-insensitive regex string to a case sensitive regex string (no guarantee on it being the proper original casing) in case the i flag wasn't available at the time but now is, or you need it to be case-sensitive again.<br><br>e.g. <code>[mM][oO][zZ][iI][lL][lL][aA]/[0-9].[0-9] .*</code> becomes <code>Mozilla/[0-9].[0-9] .*</code>";
    this.infoURL = "https://wikipedia.org/wiki/Regular_expression";
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
    return input.replace(/\[[a-z]{2}\]/gi, (m) =>
      m[1].toUpperCase() === m[2].toUpperCase() ? m[1] : m,
    );
  }
}

export default FromCaseInsensitiveRegex;
