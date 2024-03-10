// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

import Operation from "../Operation.tsx";
import { getLabelIndex } from "../lib/FlowControl.mjs";

/**
 * Jump operation
 */
class Jump extends Operation {
  /**
   * Jump constructor
   */
  constructor() {
    super();

    this.name = "Jump";
    this.flowControl = true;
    this.module = "Default";
    this.description = "Jump forwards or backwards to the specified Label";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Label name",
        type: "string",
        value: "",
      },
      {
        name: "Maximum jumps (if jumping backwards)",
        type: "number",
        value: 10,
      },
    ];
  }

  /**
   * @param {Object} state - The current state of the recipe.
   * @param {number} state.progress - The current position in the recipe.
   * @param {Dish} state.dish - The Dish being operated on.
   * @param {Operation[]} state.opList - The list of operations in the recipe.
   * @param {number} state.numJumps - The number of jumps taken so far.
   * @returns {Object} The updated state of the recipe.
   */
  run(state) {
    const ings = state.opList[state.progress].ingValues;
    const [label, maxJumps] = ings;
    const jmpIndex = getLabelIndex(label, state);

    if (state.numJumps >= maxJumps || jmpIndex === -1) {
      state.numJumps = 0;
      return state;
    }

    state.progress = jmpIndex;
    state.numJumps++;
    return state;
  }
}

export default Jump;
