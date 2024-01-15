// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 14 Jan 2024
// Author: Ryan Laf <get>
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

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import Utils from "../Utils.mjs";
import { isImage } from "../lib/FileType.mjs";
import { runHash } from "../lib/Hash.mjs";
import { toBase64 } from "../lib/Base64.mjs";
// import jimp from "jimp";
var jimp = require('jimp')

/**
 * Randomize Colour Palette operation
 */
class RandomizeColourPalette extends Operation {

    /**
     * RandomizeColourPalette constructor
     */
    constructor() {
        super();

        this.name = "Randomize Colour Palette";
        this.module = "Image";
        this.description = "Randomizes each colour in an image's colour palette. This can often reveal text or symbols that were previously a very similar colour to their surroundings, a technique sometimes used in Steganography.";
        this.infoURL = "https://wikipedia.org/wiki/Indexed_color";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "Seed",
                type: "string",
                value: ""
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    async run(input, args) {
        if (!isImage(input)) throw new OperationError("Please enter a valid image file.");

        const seed = args[0] || (Math.random().toString().substr(2)),
            parsedImage = await jimp.read(input),
            width = parsedImage.bitmap.width,
            height = parsedImage.bitmap.height;

        let rgbString, rgbHash, rgbHex;

        parsedImage.scan(0, 0, width, height, function(x, y, idx) {
            rgbString = this.bitmap.data.slice(idx, idx+3).join(".");
            rgbHash = runHash("md5", Utils.strToArrayBuffer(seed + rgbString));
            rgbHex = rgbHash.substr(0, 6) + "ff";
            parsedImage.setPixelColor(parseInt(rgbHex, 16), x, y);
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

export default RandomizeColourPalette;
