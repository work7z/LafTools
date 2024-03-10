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
 * @author Cynser
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";
import cptable from "codepage";
import { CHR_ENC_CODE_PAGES } from "../lib/ChrEnc.mjs";

/**
 * Text Encoding Brute Force operation
 */
class TextEncodingBruteForce extends Operation {
  /**
   * TextEncodingBruteForce constructor
   */
  constructor() {
    super();

    this.name = "Text Encoding Brute Force";
    this.module = "Encodings";
    this.description = [
      "Enumerates all supported text encodings for the input, allowing you to quickly spot the correct one.",
      "<br><br>",
      "Supported charsets are:",
      "<ul>",
      Object.keys(CHR_ENC_CODE_PAGES)
        .map((e) => `<li>${e}</li>`)
        .join("\n"),
      "</ul>",
    ].join("\n");
    this.infoURL = "https://wikipedia.org/wiki/Character_encoding";
    this.inputType = "string";
    this.outputType = "json";
    this.presentType = "html";
    this.args = [
      {
        name: "Mode",
        type: "option",
        value: ["Encode", "Decode"],
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {json}
   */
  run(input, args) {
    const output = {},
      charsets = Object.keys(CHR_ENC_CODE_PAGES),
      mode = args[0];

    charsets.forEach((charset) => {
      try {
        if (mode === "Decode") {
          output[charset] = cptable.utils.decode(
            CHR_ENC_CODE_PAGES[charset],
            input,
          );
        } else {
          output[charset] = Utils.arrayBufferToStr(
            cptable.utils.encode(CHR_ENC_CODE_PAGES[charset], input),
          );
        }
      } catch (err) {
        output[charset] = "Could not decode.";
      }
    });

    return output;
  }

  /**
   * Displays the encodings in an HTML table for web apps.
   *
   * @param {Object[]} encodings
   * @returns {html}
   */
  present(encodings) {
    let table =
      "<table class='table table-hover table-sm table-bordered table-nonfluid'><tr><th>Encoding</th><th>Value</th></tr>";

    for (const enc in encodings) {
      const value = Utils.escapeHtml(Utils.escapeWhitespace(encodings[enc]));
      table += `<tr><td>${enc}</td><td>${value}</td></tr>`;
    }

    table += "<table>";
    return table;
  }
}

export default TextEncodingBruteForce;
