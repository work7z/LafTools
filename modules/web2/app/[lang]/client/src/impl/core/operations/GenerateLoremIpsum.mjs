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
 * @author klaxon [klaxon@veyr.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import {
  GenerateParagraphs,
  GenerateSentences,
  GenerateWords,
  GenerateBytes,
} from "../lib/LoremIpsum.mjs";

/**
 * Generate Lorem Ipsum operation
 */
class GenerateLoremIpsum extends Operation {
  /**
   * GenerateLoremIpsum constructor
   */
  constructor() {
    super();

    this.name = "Generate Lorem Ipsum";
    this.module = "Default";
    this.description = "Generate varying length lorem ipsum placeholder text.";
    this.infoURL = "https://wikipedia.org/wiki/Lorem_ipsum";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Length",
        type: "number",
        value: "3",
      },
      {
        name: "Length in",
        type: "option",
        value: ["Paragraphs", "Sentences", "Words", "Bytes"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [length, lengthType] = args;
    if (length < 1) {
      throw new OperationError("Length must be greater than 0");
    }
    switch (lengthType) {
      case "Paragraphs":
        return GenerateParagraphs(length);
      case "Sentences":
        return GenerateSentences(length);
      case "Words":
        return GenerateWords(length);
      case "Bytes":
        return GenerateBytes(length);
      default:
        throw new OperationError("Invalid length type");
    }
  }
}

export default GenerateLoremIpsum;
