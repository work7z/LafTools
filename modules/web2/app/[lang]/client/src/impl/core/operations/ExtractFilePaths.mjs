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

import Operation from "../Operation.tsx";
import { search } from "../lib/Extract.mjs";
import { caseInsensitiveSort } from "../lib/Sort.mjs";

/**
 * Extract file paths operation
 */
class ExtractFilePaths extends Operation {
  /**
   * ExtractFilePaths constructor
   */
  constructor() {
    super();

    this.name = "Extract file paths";
    this.module = "Regex";
    this.description =
      "Extracts anything that looks like a Windows or UNIX file path.<br><br>Note that if UNIX is selected, there will likely be a lot of false positives.";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Windows",
        type: "boolean",
        value: true,
      },
      {
        name: "UNIX",
        type: "boolean",
        value: true,
      },
      {
        name: "Display total",
        type: "boolean",
        value: false,
      },
      {
        name: "Sort",
        type: "boolean",
        value: false,
      },
      {
        name: "Unique",
        type: "boolean",
        value: false,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [includeWinPath, includeUnixPath, displayTotal, sort, unique] = args,
      winDrive = "[A-Z]:\\\\",
      winName = "[A-Z\\d][A-Z\\d\\- '_\\(\\)~]{0,61}",
      winExt = "[A-Z\\d]{1,6}",
      winPath =
        winDrive +
        "(?:" +
        winName +
        "\\\\?)*" +
        winName +
        "(?:\\." +
        winExt +
        ")?",
      unixPath = "(?:/[A-Z\\d.][A-Z\\d\\-.]{0,61})+";
    let filePaths = "";

    if (includeWinPath && includeUnixPath) {
      filePaths = winPath + "|" + unixPath;
    } else if (includeWinPath) {
      filePaths = winPath;
    } else if (includeUnixPath) {
      filePaths = unixPath;
    }

    if (!filePaths) {
      return "";
    }

    const regex = new RegExp(filePaths, "ig");
    const results = search(
      input,
      regex,
      null,
      sort ? caseInsensitiveSort : null,
      unique,
    );

    if (displayTotal) {
      return `Total found: ${results.length}\n\n${results.join("\n")}`;
    } else {
      return results.join("\n");
    }
  }
}

export default ExtractFilePaths;
