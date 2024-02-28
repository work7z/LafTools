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
 * @author mshwed [m@ttshwed.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";

import { toHexFast } from "../lib/Hex.mjs";

/**
 * CRC-8 Checksum operation
 */
class CRC8Checksum extends Operation {
  /**
   * CRC8Checksum constructor
   */
  constructor() {
    super();

    this.name = "CRC-8 Checksum";
    this.module = "Crypto";
    this.description =
      "A cyclic redundancy check (CRC) is an error-detecting code commonly used in digital networks and storage devices to detect accidental changes to raw data.<br><br>The CRC was invented by W. Wesley Peterson in 1961.";
    this.infoURL = "https://wikipedia.org/wiki/Cyclic_redundancy_check";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Algorithm",
        type: "option",
        value: [
          "CRC-8",
          "CRC-8/CDMA2000",
          "CRC-8/DARC",
          "CRC-8/DVB-S2",
          "CRC-8/EBU",
          "CRC-8/I-CODE",
          "CRC-8/ITU",
          "CRC-8/MAXIM",
          "CRC-8/ROHC",
          "CRC-8/WCDMA",
        ],
      },
    ];
  }

  /**
   * Generates the pre-computed lookup table for byte division
   *
   * @param polynomial
   */
  calculateCRC8LookupTable(polynomial) {
    const crc8Table = new Uint8Array(256);

    let currentByte;
    for (let i = 0; i < 256; i++) {
      currentByte = i;
      for (let bit = 0; bit < 8; bit++) {
        if ((currentByte & 0x80) !== 0) {
          currentByte <<= 1;
          currentByte ^= polynomial;
        } else {
          currentByte <<= 1;
        }
      }

      crc8Table[i] = currentByte;
    }

    return crc8Table;
  }

  /**
   * Calculates the CRC-8 Checksum from an input
   *
   * @param {ArrayBuffer} input
   * @param {number} polynomial
   * @param {number} initializationValue
   * @param {boolean} inputReflection
   * @param {boolean} outputReflection
   * @param {number} xorOut
   */
  calculateCRC8(
    input,
    polynomial,
    initializationValue,
    inputReflection,
    outputReflection,
    xorOut,
  ) {
    const crcSize = 8;
    const crcTable = this.calculateCRC8LookupTable(polynomial);

    let crc = initializationValue !== 0 ? initializationValue : 0;
    let currentByte, position;

    input = new Uint8Array(input);
    for (const inputByte of input) {
      currentByte = inputReflection
        ? this.reverseBits(inputByte, crcSize)
        : inputByte;

      position = (currentByte ^ crc) & 255;
      crc = crcTable[position];
    }

    crc = outputReflection ? this.reverseBits(crc, crcSize) : crc;

    if (xorOut !== 0) crc = crc ^ xorOut;

    return toHexFast(new Uint8Array([crc]));
  }

  /**
   * Reverse the bits for a given input byte.
   *
   * @param {number} input
   */
  reverseBits(input, hashSize) {
    let reversedByte = 0;
    for (let i = hashSize - 1; i >= 0; i--) {
      reversedByte |= (input & 1) << i;
      input >>= 1;
    }

    return reversedByte;
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const algorithm = args[0];

    switch (algorithm) {
      case "CRC-8":
        return this.calculateCRC8(input, 0x7, 0x0, false, false, 0x0);
      case "CRC-8/CDMA2000":
        return this.calculateCRC8(input, 0x9b, 0xff, false, false, 0x0);
      case "CRC-8/DARC":
        return this.calculateCRC8(input, 0x39, 0x0, true, true, 0x0);
      case "CRC-8/DVB-S2":
        return this.calculateCRC8(input, 0xd5, 0x0, false, false, 0x0);
      case "CRC-8/EBU":
        return this.calculateCRC8(input, 0x1d, 0xff, true, true, 0x0);
      case "CRC-8/I-CODE":
        return this.calculateCRC8(input, 0x1d, 0xfd, false, false, 0x0);
      case "CRC-8/ITU":
        return this.calculateCRC8(input, 0x7, 0x0, false, false, 0x55);
      case "CRC-8/MAXIM":
        return this.calculateCRC8(input, 0x31, 0x0, true, true, 0x0);
      case "CRC-8/ROHC":
        return this.calculateCRC8(input, 0x7, 0xff, true, true, 0x0);
      case "CRC-8/WCDMA":
        return this.calculateCRC8(input, 0x9b, 0x0, true, true, 0x0);
      default:
        throw new OperationError("Unknown checksum algorithm");
    }
  }
}

export default CRC8Checksum;
