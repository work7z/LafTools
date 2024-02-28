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
 * @author jarrodconnolly [jarrod@nestedquotes.ca]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";
import avro from "avsc";

/**
 * Avro to JSON operation
 */
class AvroToJSON extends Operation {
  /**
   * AvroToJSON constructor
   */
  constructor() {
    super();

    this.name = "Avro to JSON";
    this.module = "Serialise";
    this.description = "Converts Avro encoded data into JSON.";
    this.infoURL = "https://wikipedia.org/wiki/Apache_Avro";
    this.inputType = "ArrayBuffer";
    this.outputType = "string";
    this.args = [
      {
        name: "Force Valid JSON",
        type: "boolean",
        value: true,
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    if (input.byteLength <= 0) {
      throw new OperationError("Please provide an input.");
    }

    const forceJSON = args[0];

    return new Promise((resolve, reject) => {
      const result = [];
      const inpArray = new Uint8Array(input);
      const decoder = new avro.streams.BlockDecoder();

      decoder
        .on("data", function (obj) {
          result.push(obj);
        })
        .on("error", function () {
          reject(new OperationError("Error parsing Avro file."));
        })
        .on("end", function () {
          if (forceJSON) {
            resolve(
              result.length === 1
                ? JSON.stringify(result[0], null, 4)
                : JSON.stringify(result, null, 4),
            );
          } else {
            const data = result.reduce(
              (result, current) => result + JSON.stringify(current) + "\n",
              "",
            );
            resolve(data);
          }
        });

      decoder.write(inpArray);
      decoder.end();
    });
  }
}

export default AvroToJSON;
