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
 * QR code resources
 *
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import OperationError from "../errors/OperationError.mjs";
import jsQR from "jsqr";
import qr from "qr-image";
import Utils from "../Utils.mjs";
// // import jimp from "jimp";
var jimp = require("jimp");

/**
 * Parses a QR code image from an image
 *
 * @param {ArrayBuffer} input
 * @param {boolean} normalise
 * @returns {string}
 */
export async function parseQrCode(input, normalise) {
  let image;
  try {
    image = await jimp.read(input);
  } catch (err) {
    throw new OperationError(`Error opening image. (${err})`);
  }

  try {
    if (normalise) {
      image.rgba(false);
      image.background(0xffffffff);
      image.normalize();
      image.greyscale();
      image = await image.getBufferAsync(jimp.MIME_JPEG);
      image = await jimp.read(image);
    }
  } catch (err) {
    throw new OperationError(`Error normalising image. (${err})`);
  }

  const qrData = jsQR(image.bitmap.data, image.getWidth(), image.getHeight());
  if (qrData) {
    return qrData.data;
  } else {
    throw new OperationError("Could not read a QR code from the image.");
  }
}

/**
 * Generates a QR code from the input string
 *
 * @param {string} input
 * @param {string} format
 * @param {number} moduleSize
 * @param {number} margin
 * @param {string} errorCorrection
 * @returns {ArrayBuffer}
 */
export function generateQrCode(
  input,
  format,
  moduleSize,
  margin,
  errorCorrection,
) {
  const formats = ["SVG", "EPS", "PDF", "PNG"];
  if (!formats.includes(format.toUpperCase())) {
    throw new OperationError("Unsupported QR code format.");
  }

  let qrImage;
  try {
    qrImage = qr.imageSync(input, {
      type: format,
      size: moduleSize,
      margin: margin,
      ec_level: errorCorrection.charAt(0).toUpperCase(),
    });
  } catch (err) {
    throw new OperationError(`Error generating QR code. (${err})`);
  }

  if (!qrImage) {
    throw new OperationError("Error generating QR code.");
  }

  switch (format) {
    case "SVG":
    case "EPS":
    case "PDF":
      return Utils.strToArrayBuffer(qrImage);
    case "PNG":
      return qrImage.buffer;
    default:
      throw new OperationError("Unsupported QR code format.");
  }
}
