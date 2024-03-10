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

import vkbeautify from "vkbeautify";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './constants.tsx'
import Operation from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * CSS Minify operation
 */
class CSSMinify extends Operation {
  /**
   * CSSMinify constructor
   */
  constructor() {
    super();

    this.name = "CSS Minify";
    this.module = "Code";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Preserve comments",
        type: "boolean",
        value: false,
      },
    ];



    this.id = 'cssminify'
    this.name = Dot("-nL_B5PoN", "Compresses {0}", "CSS");
    this.description = Dot(
      "Y__Zb1_4Q",
      "Minifies Cascading Style Sheets (CSS) code, removing all unnecessary characters."
    );
    this.exampleOutput = "body{color:#fff;}"
    this.exampleInput = "body {\n\tcolor: #fff;\n}";

  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const preserveComments = args[0];
    return vkbeautify.cssmin(input, preserveComments);
  }
}

export default CSSMinify;
