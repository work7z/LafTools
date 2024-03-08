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
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";

/**
 * Set Intersection operation
 */
class SetIntersection extends Operation {
  /**
   * Set Intersection constructor
   */
  constructor() {
    super();

    this.name = "Set Intersection";
    this.module = "Default";
    this.description = "Calculates the intersection of two sets.";
    this.infoURL = "https://wikipedia.org/wiki/Intersection_(set_theory)";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Sample delimiter",
        type: "binaryString",
        value: "\\n\\n",
      },
      {
        name: "Item delimiter",
        type: "binaryString",
        value: ",",
      },
    ];
  }

  /**
   * Validate input length
   *
   * @param {Object[]} sets
   * @throws {Error} if not two sets
   */
  validateSampleNumbers(sets) {
    if (!sets || sets.length !== 2) {
      throw new OperationError(
        "Incorrect number of sets, perhaps you need to modify the sample delimiter or add more samples?",
      );
    }
  }

  /**
   * Run the intersection operation
   *
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   * @throws {OperationError}
   */
  run(input, args) {
    [this.sampleDelim, this.itemDelimiter] = args;
    const sets = input.split(this.sampleDelim);

    this.validateSampleNumbers(sets);

    return this.runIntersect(...sets.map((s) => s.split(this.itemDelimiter)));
  }

  /**
   * Get the intersection of the two sets.
   *
   * @param {Object[]} a
   * @param {Object[]} b
   * @returns {Object[]}
   */
  runIntersect(a, b) {
    return a
      .filter((item) => {
        return b.indexOf(item) > -1;
      })
      .join(this.itemDelimiter);
  }
}

export default SetIntersection;
