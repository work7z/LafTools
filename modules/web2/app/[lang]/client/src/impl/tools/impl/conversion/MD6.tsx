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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";
import { TEXT_INPUT_EXAMPLE_HELLO_WORLD } from './_constants.tsx'
import Operation, { OptDetail } from "../../../core/Operation.tsx";
import OperationError from "../../../core/errors/OperationError.mjs";
import NodeMD6 from "node-md6";

/**
 * MD6 operation
 */
class MD6 extends Operation {
  public getOptDetail(): OptDetail {
    return {
      relatedID: 'md5',
      config: {
        "module": "Crypto",
        "description": "The MD6 (Message-Digest 6) algorithm is a cryptographic hash function. It uses a Merkle tree-like structure to allow for immense parallel computation of hashes for very long inputs.",
        "infoURL": "https://wikipedia.org/wiki/MD6",
        "inputType": "string",
        "outputType": "string",
        "flowControl": false,
        "manualBake": false,
        "args": [
          {
            "name": "Size",
            "type": "number",
            "value": 256
          },
          {
            "name": "Levels",
            "type": "number",
            "value": 64
          },
          {
            "name": "Key",
            "type": "string",
            "value": ""
          }
        ]
      },
      infoURL: 'https://en.wikipedia.org/wiki/MD6',
      id: 'md6',
      optName: Dot("md6.text.192d3", "Generate {0} Hash", "MD6"),
      optDescription: Dot(
        "md6.desc.1039",
        "This operation hashes data into an {0} hash.",
        "MD6"
      ),
      exampleInput: TEXT_INPUT_EXAMPLE_HELLO_WORLD,
      exampleOutput: "6270a6d976267aa1224ac8d905dec46a96f6b62f6b6e9bb8085c2e946c1eb576",
    }
  }
  /**
   * MD6 constructor
   */
  constructor() {
    super();

    this.name = "MD6";
    this.module = "Crypto";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "Size",
        type: "number",
        value: 256,
      },
      {
        name: "Levels",
        type: "number",
        value: 64,
      },
      {
        name: "Key",
        type: "string",
        value: "",
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {

    const [size, levels, key] = args;

    if (size < 0 || size > 512)
      throw new OperationError(Dot("CFg8B", "Size must be between 0 and 512"));
    if (levels < 0) throw new OperationError(Dot("DqFI5", "Levels must be greater than 0"));

    return NodeMD6.getHashOfText(input, size, key, levels);
  }
}

export default MD6;
