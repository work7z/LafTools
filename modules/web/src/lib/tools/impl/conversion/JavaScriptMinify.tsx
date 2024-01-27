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

import { Dot } from "../../../../utils/TranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'
import Operation from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "../../../../utils/GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";
import * as terser from "terser";
import OperationError from "../../../core/errors/OperationError.mjs";

/**
 * JavaScript Minify operation
 */
class JavaScriptMinify extends Operation {
  /**
   * JavaScriptMinify constructor
   */
  constructor() {
    super();

    this.name = "JavaScript Minify";
    this.module = "Code";
    this.description = "Compresses JavaScript code.";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  async run(input, args) {
    const result = await terser.minify(input);
    if (result["error"]) {
      throw new OperationError(`Error minifying JavaScript. (${result["error"]})`);
    }
    return result.code;
  }
}

export default JavaScriptMinify;
