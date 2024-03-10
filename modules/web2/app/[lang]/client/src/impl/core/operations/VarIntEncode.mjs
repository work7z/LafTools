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
 * @author GCHQ Contributor [3]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import Protobuf from "../lib/Protobuf.mjs";

/**
 * VarInt Encode operation
 */
class VarIntEncode extends Operation {
  /**
   * VarIntEncode constructor
   */
  constructor() {
    super();

    this.name = "VarInt Encode";
    this.module = "Default";
    this.description =
      "Encodes a Vn integer as a VarInt. VarInt is an efficient way of encoding variable length integers and is commonly used with Protobuf.";
    this.infoURL =
      "https://developers.google.com/protocol-buffers/docs/encoding#varints";
    this.inputType = "number";
    this.outputType = "byteArray";
    this.args = [];
  }

  /**
   * @param {number} input
   * @param {Object[]} args
   * @returns {byteArray}
   */
  run(input, args) {
    try {
      return Protobuf.varIntEncode(input);
    } catch (err) {
      throw new OperationError(err);
    }
  }
}

export default VarIntEncode;
