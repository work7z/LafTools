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
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import { Dot } from "../../../../utils/cTranslationUtils.tsx";
import Operation, { OptDetail } from "../../../core/Operation.tsx";

/**
 * Remove line numbers operation
 */
class RemoveLineNumbers extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'text',
      config: {
        "module": "Default",
        "description": "Removes line numbers from the output if they can be trivially detected.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      id: 'removelinenumbers',
      optName: Dot("OrCD8PqwH", "Remove line numbers"),
      infoURL: "https://en.wikipedia.org/wiki/Line_number",
      optDescription: Dot("Vc40-vfod", "Removes line numbers from the output if they can be trivially detected."),
      exampleInput: "1. Hello\n2. World",
      exampleOutput: "Hello\nWorld",
    }
  }
  /**
   * RemoveLineNumbers constructor
   */
  constructor() {
    super();

    this.module = "Default";
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
    return input.replace(/^[ \t]{0,5}\d+[\s:|\-,.)\]]/gm, "");
  }
}

export default RemoveLineNumbers;
