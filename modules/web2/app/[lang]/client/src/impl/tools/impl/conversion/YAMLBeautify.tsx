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
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import prettier from "prettier/esm/standalone.mjs";
import parserYaml from "prettier/esm/parser-yaml.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";


// provide YamlBeautify as simliar as XMLBeautify, including the impl code
class YamlBeautify extends Operation {
  public getOptDetail(): OptDetail | null {
    return {
      id: 'yaml-beautify',
      name: Dot("yaml.format.btn", "Format YAML"),
      infoURL: 'https://en.wikipedia.org/wiki/YAML',
      description: Dot(
        "yaml-beautify.desc.2a5f9",
        "This operation formats YAML data to improve readability by adding proper indentation, line breaks, and ensuring well-formed structure.",
        ""
      ),
      exampleInput: `unformatted:
  data:
    item1:  value1
    item2:   value2`,
      exampleOutput: `unformatted:
  data:
    item1: value1
    item2: value2`,
    }
  }

  /**
   * YamlBeautify constructor
   */
  constructor() {
    super();

    this.module = "Code";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        "name": "Indent string",
        "type": "binaryShortString",
        "value": "  "
      }
    ];

  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const indentStr = args[0];

    let exts = {
      parser: "yaml",
      plugins: [parserYaml],
    }
    debugger;
    let results = prettier.format(input, exts);
    return results;
  }

}

export default YamlBeautify;
