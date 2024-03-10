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
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { isImage } from "../lib/FileType.mjs";
// import jimp from "jimp";
var jimp = require("jimp");

/**
 * Split Colour Channels operation
 */
class SplitColourChannels extends Operation {
  /**
   * SplitColourChannels constructor
   */
  constructor() {
    super();

    this.name = "Split Colour Channels";
    this.module = "Image";
    this.description =
      "Splits the given image into its red, green and blue colour channels.";
    this.infoURL = "https://wikipedia.org/wiki/Channel_(digital_image)";
    this.inputType = "ArrayBuffer";
    this.outputType = "List<File>";
    this.presentType = "html";
    this.args = [];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {List<File>}
   */
  async run(input, args) {
    input = new Uint8Array(input);
    // Make sure that the input is an image
    if (!isImage(input)) throw new OperationError("Invalid file type.");

    const parsedImage = await jimp.read(Buffer.from(input));

    const red = new Promise(async (resolve, reject) => {
      try {
        const split = parsedImage
          .clone()
          .color([
            { apply: "blue", params: [-255] },
            { apply: "green", params: [-255] },
          ])
          .getBufferAsync(jimp.MIME_PNG);
        resolve(
          new File([new Uint8Array((await split).values())], "red.png", {
            type: "image/png",
          }),
        );
      } catch (err) {
        reject(new OperationError(`Could not split red channel: ${err}`));
      }
    });

    const green = new Promise(async (resolve, reject) => {
      try {
        const split = parsedImage
          .clone()
          .color([
            { apply: "red", params: [-255] },
            { apply: "blue", params: [-255] },
          ])
          .getBufferAsync(jimp.MIME_PNG);
        resolve(
          new File([new Uint8Array((await split).values())], "green.png", {
            type: "image/png",
          }),
        );
      } catch (err) {
        reject(new OperationError(`Could not split green channel: ${err}`));
      }
    });

    const blue = new Promise(async (resolve, reject) => {
      try {
        const split = parsedImage
          .color([
            { apply: "red", params: [-255] },
            { apply: "green", params: [-255] },
          ])
          .getBufferAsync(jimp.MIME_PNG);
        resolve(
          new File([new Uint8Array((await split).values())], "blue.png", {
            type: "image/png",
          }),
        );
      } catch (err) {
        reject(new OperationError(`Could not split blue channel: ${err}`));
      }
    });

    return await Promise.all([red, green, blue]);
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

export default SplitColourChannels;
