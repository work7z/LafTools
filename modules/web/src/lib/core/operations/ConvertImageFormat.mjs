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
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import { isImage } from "../lib/FileType.mjs";
import { toBase64 } from "../lib/Base64.mjs";
// import jimp from "jimp";
var jimp = require('jimp')

/**
 * Convert Image Format operation
 */
class ConvertImageFormat extends Operation {

    /**
     * ConvertImageFormat constructor
     */
    constructor() {
        super();

        this.name = "Convert Image Format";
        this.module = "Image";
        this.description = "Converts an image between different formats. Supported formats:<br><ul><li>Joint Photographic Experts Group (JPEG)</li><li>Portable Network Graphics (PNG)</li><li>Bitmap (BMP)</li><li>Tagged Image File Format (TIFF)</li></ul><br>Note: GIF files are supported for input, but cannot be outputted.";
        this.infoURL = "https://wikipedia.org/wiki/Image_file_formats";
        this.inputType = "ArrayBuffer";
        this.outputType = "ArrayBuffer";
        this.presentType = "html";
        this.args = [
            {
                name: "Output Format",
                type: "option",
                value: [
                    "JPEG",
                    "PNG",
                    "BMP",
                    "TIFF"
                ]
            },
            {
                name: "JPEG Quality",
                type: "number",
                value: 80,
                min: 1,
                max: 100
            },
            {
                name: "PNG Filter Type",
                type: "option",
                value: [
                    "Auto",
                    "None",
                    "Sub",
                    "Up",
                    "Average",
                    "Paeth"
                ]
            },
            {
                name: "PNG Deflate Level",
                type: "number",
                value: 9,
                min: 0,
                max: 9
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {byteArray}
     */
    async run(input, args) {
        const [format, jpegQuality, pngFilterType, pngDeflateLevel] = args;
        const formatMap = {
            "JPEG": jimp.MIME_JPEG,
            "PNG": jimp.MIME_PNG,
            "BMP": jimp.MIME_BMP,
            "TIFF": jimp.MIME_TIFF
        };

        const pngFilterMap = {
            "Auto": jimp.PNG_FILTER_AUTO,
            "None": jimp.PNG_FILTER_NONE,
            "Sub": jimp.PNG_FILTER_SUB,
            "Up": jimp.PNG_FILTER_UP,
            "Average": jimp.PNG_FILTER_AVERAGE,
            "Paeth": jimp.PNG_FILTER_PATH
        };

        const mime = formatMap[format];

        if (!isImage(input)) {
            throw new OperationError("Invalid file format.");
        }
        let image;
        try {
            image = await jimp.read(input);
        } catch (err) {
            throw new OperationError(`Error opening image file. (${err})`);
        }
        try {
            switch (format) {
                case "JPEG":
                    image.quality(jpegQuality);
                    break;
                case "PNG":
                    image.filterType(pngFilterMap[pngFilterType]);
                    image.deflateLevel(pngDeflateLevel);
                    break;
            }

            const imageBuffer = await image.getBufferAsync(mime);
            return imageBuffer.buffer;
        } catch (err) {
            throw new OperationError(`Error converting image format. (${err})`);
        }
    }

    /**
     * Displays the converted image using HTML for web apps
     *
     * @param {ArrayBuffer} data
     * @returns {html}
     */
    present(data) {
        if (!data.byteLength) return "";
        const dataArray = new Uint8Array(data);

        const type = isImage(dataArray);
        if (!type) {
            throw new OperationError("Invalid file type.");
        }

        return `<img src="data:${type};base64,${toBase64(dataArray)}">`;
    }

}

export default ConvertImageFormat;
