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

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";
import * as terser from "terser";
import OperationError from "../../../core/errors/OperationError.mjs";

/**
 * JavaScript Minify operation
 */
class JavaScriptMinify extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'javascript',
      config: {
        "module": "Code",
        "description": "Compresses JavaScript code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      nousenouseID: 'jsminify',
      optName: Dot("e3WgQaZlb", "Compresses {0}", "JavaScript"),
      optDescription: Dot(
        "ojCWEFdVe",
        "Compresses JavaScript code, removing all unnecessary characters.",
      ),
      exampleInput: "let a = 1; let b = 2; let obj = {a: 1, b: 2};",
      exampleOutput: "let a = 1;\nlet b = 2; //;\nlet obj = {\n    a: 1,\n    b: 2\n};\n",
      infoURL: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    }
  }
  /**
   * JavaScriptMinify constructor
   */
  constructor() {
    super();

    this.name = "JavaScript Minify";
    this.module = "Code";
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
