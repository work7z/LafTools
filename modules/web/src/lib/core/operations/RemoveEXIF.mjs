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
 * @author tlwr [toby@toby.codes]
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import { removeEXIF } from "../vendor/remove-exif.mjs";
import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";

/**
 * Remove EXIF operation
 */
class RemoveEXIF extends Operation {
  /**
   * RemoveEXIF constructor
   */
  constructor() {
    super();

    this.name = "Remove EXIF";
    this.module = "Image";
    this.description = [
      "Removes EXIF data from a JPEG image.",
      "<br><br>",
      "EXIF data embedded in photos usually contains information about the image file itself as well as the device used to create it.",
    ].join("\n");
    this.infoURL = "https://wikipedia.org/wiki/Exif";
    this.inputType = "ArrayBuffer";
    this.outputType = "byteArray";
    this.args = [];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    input = new Uint8Array(input);
    // Do nothing if input is empty
    if (input.length === 0) return input;

    try {
      return removeEXIF(input);
    } catch (err) {
      // Simply return input if no EXIF data is found
      if (err === "Exif not found.") return input;
      throw new OperationError(`Could not remove EXIF data from image: ${err}`);
    }
  }
}

export default RemoveEXIF;
