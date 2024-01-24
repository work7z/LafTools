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
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { scanForFileTypes, extractFile } from "../lib/FileType.mjs";
import { FILE_SIGNATURES } from "../lib/FileSignatures.mjs";

/**
 * Extract Files operation
 */
class ExtractFiles extends Operation {
  /**
   * ExtractFiles constructor
   */
  constructor() {
    super();

    // Get the first extension for each signature that can be extracted
    let supportedExts = Object.keys(FILE_SIGNATURES).map((cat) => {
      return FILE_SIGNATURES[cat]
        .filter((sig) => sig.extractor)
        .map((sig) => sig.extension.toUpperCase());
    });

    // Flatten categories and remove duplicates
    supportedExts = [].concat(...supportedExts).unique();

    this.name = "Extract Files";
    this.module = "Default";
    this.description = `Performs file carving to attempt to extract files from the input.<br><br>This operation is currently capable of carving out the following formats:
            <ul>
                <li>
                ${supportedExts.join("</li><li>")}
                </li>
            </ul>Minimum File Size can be used to prune small false positives.`;
    this.infoURL =
      "https://forensicswiki.xyz/wiki/index.php?title=File_Carving";
    this.inputType = "ArrayBuffer";
    this.outputType = "List<File>";
    this.presentType = "html";
    this.args = Object.keys(FILE_SIGNATURES)
      .map((cat) => {
        return {
          name: cat,
          type: "boolean",
          value: cat === "Miscellaneous" ? false : true,
        };
      })
      .concat([
        {
          name: "Ignore failed extractions",
          type: "boolean",
          value: true,
        },
        {
          name: "Minimum File Size",
          type: "number",
          value: 100,
        },
      ]);
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {List<File>}
   */
  run(input, args) {
    const bytes = new Uint8Array(input),
      categories = [],
      minSize = args.pop(1),
      ignoreFailedExtractions = args.pop(1);

    args.forEach((cat, i) => {
      if (cat) categories.push(Object.keys(FILE_SIGNATURES)[i]);
    });

    // Scan for embedded files
    const detectedFiles = scanForFileTypes(bytes, categories);

    // Extract each file that we support
    const files = [];
    const errors = [];
    detectedFiles.forEach((detectedFile) => {
      try {
        const file = extractFile(
          bytes,
          detectedFile.fileDetails,
          detectedFile.offset,
        );
        if (file.size >= minSize) files.push(file);
      } catch (err) {
        if (
          !ignoreFailedExtractions &&
          err.message.indexOf("No extraction algorithm available") < 0
        ) {
          errors.push(
            `Error while attempting to extract ${detectedFile.fileDetails.name} ` +
              `at offset ${detectedFile.offset}:\n` +
              `${err.message}`,
          );
        }
      }
    });

    if (errors.length) {
      throw new OperationError(errors.join("\n\n"));
    }

    return files;
  }

  /**
   * Displays the files in HTML for web apps.
   *
   * @param {File[]} files
   * @returns {html}
   */
  async present(files) {
    return await Utils.displayFilesAsHTML(files);
  }
}

export default ExtractFiles;
