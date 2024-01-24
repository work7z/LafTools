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
 * @author Ge0rg3 [georgeomnet+cyberchef@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
// import jimp from "jimp";
var jimp = require("jimp");

/**
 * View Bit Plane operation
 */
class ViewBitPlane extends Operation {
  /**
   * ViewBitPlane constructor
   */
  constructor() {
    super();

    this.name = "View Bit Plane";
    this.module = "Image";
    this.description =
      "Extracts and displays a bit plane of any given image. These show only a single bit from each pixel, and can be used to hide messages in Steganography.";
    this.infoURL = "https://wikipedia.org/wiki/Bit_plane";
    this.inputType = "ArrayBuffer";
    this.outputType = "ArrayBuffer";
    this.presentType = "html";
    this.args = [
      {
        name: "Colour",
        type: "option",
        value: COLOUR_OPTIONS,
      },
      {
        name: "Bit",
        type: "number",
        value: 0,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {ArrayBuffer}
   */
  async run(input, args) {
    if (!isImage(input))
      throw new OperationError("Please enter a valid image file.");

    const [colour, bit] = args,
      parsedImage = await jimp.read(input),
      width = parsedImage.bitmap.width,
      height = parsedImage.bitmap.height,
      colourIndex = COLOUR_OPTIONS.indexOf(colour),
      bitIndex = 7 - bit;

    if (bit < 0 || bit > 7) {
      throw new OperationError("Error: Bit argument must be between 0 and 7");
    }

    let pixel, bin, newPixelValue;

    parsedImage.scan(0, 0, width, height, function (x, y, idx) {
      pixel = this.bitmap.data[idx + colourIndex];
      bin = Utils.bin(pixel);
      newPixelValue = 255;

      if (bin.charAt(bitIndex) === "1") newPixelValue = 0;

      for (let i = 0; i < 3; i++) {
        this.bitmap.data[idx + i] = newPixelValue;
      }
      this.bitmap.data[idx + 3] = 255;
    });

    const imageBuffer = await parsedImage.getBufferAsync(jimp.AUTO);

    return new Uint8Array(imageBuffer).buffer;
  }

  /**
   * Displays the extracted data as an image for web apps.
   * @param {ArrayBuffer} data
   * @returns {html}
   */
  present(data) {
    if (!data.byteLength) return "";
    const type = isImage(data);

    return `<img src="data:${type};base64,${toBase64(data)}">`;
  }
}

const COLOUR_OPTIONS = ["Red", "Green", "Blue", "Alpha"];

export default ViewBitPlane;
