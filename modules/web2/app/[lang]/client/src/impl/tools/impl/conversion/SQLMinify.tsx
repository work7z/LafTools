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
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import Utils from "../../../core/Utils.mjs";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import { InputOutputEditorLang } from "../../../purejs-types.tsx";

/**
 * SQL Minify operation
 */
class SQLMinify extends Operation {
  public getOptDetail(): OptDetail {
    return {
      config: {
        "module": "Code",
        "description": "Compresses Structured Query Language (SQL) code.",
        "infoURL": null,
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": []
      },
      id: "sql-minify",
      optName: Dot("6wdtJ4vmg.name.0912", "Minify {0}", "SQL"),
      optDescription: Dot(
        "LxaEFHbfa",
        "Minifies SQL code, reduce the bundle size of your SQL code.",
      ),
      exampleInput: 'SELECT\n\t*\nFROM\n\ttable\nWHERE\n\tid = 1;',
      exampleOutput: 'SELECT * FROM table WHERE id = 1;',
      infoURL: "https://wiki.postgresql.org/wiki/Minifying_SQL",
    }
  }
  /**
   * SQLMinify constructor
   */
  constructor() {
    super();

    this.name = "SQL Minify";
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
    return vkbeautify.sqlmin(input);
  }


  getInputOutputEditorLang(): InputOutputEditorLang | null {
    return {
      inputLang: 'sql',
      outputLang: 'sql'
    }
  }
}

export default SQLMinify;
