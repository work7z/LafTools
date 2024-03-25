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

/**
 * JSON Minify operation
 */
export default class JSONEscape extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'json',
      config: {
        "module": "Code",
        "description": "Escapes special characters in JSON code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      infoURL: 'https://www.json.org/',
      nousenouseID: 'json-escape',
      optName: Dot("ddq.tdqwq", "Escape {0}", "JSON"),
      optDescription: Dot(
        "EOdsdf",
        "Escapes special characters in JSON code."
      ),

      exampleInput: "{\n  \"key\": \"value\"\n}",
      exampleOutput: "{\\n  \\\"key\\\": \\\"value\\\"\\n}",

    }
  }
  /**
   * JSONMinify constructor
   */
  constructor() {
    super();

    this.name = Dot("N_9_M4KgI", "JSON Escape");
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
  run(input, args) {
    if (!input) return "";
    return input.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  }
}

;
