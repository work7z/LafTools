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

export default class JSONUnescape extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'json',
      config: {
        "module": "Code",
        "description": "Unescapes special characters in JSON code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      infoURL: 'https://www.json.org/',
      nousenouseID: 'json-unescape',
      optName: Dot("sd.text.93kq", "Unescape {0}", "JSON"),
      optDescription: Dot(
        "EOdsCA",
        "Unescapes special characters in JSON code."
      ),

      exampleInput: "{ \"key\": \"value\" }",
      exampleOutput: '{ "key": "value" }',
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
    // write a function to unescape JSON str
    return input.replace(/\\./g, function (m) {
      switch (m[1]) {
        case '"':
        case "'":
        case "\\":
          return m[1];
        case "b":
          return "\b";
        case "f":
          return "\f";
        case "n":
          return "\n";
        case "r":
          return "\r";
        case "t":
          return "\t";
        case "u":
          return String.fromCharCode(parseInt(m.substr(2, 4), 16));
        default:
          return m;
      }
    });
  }
}

;
