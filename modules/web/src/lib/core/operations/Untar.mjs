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
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import Utils from "../Utils.mjs";
import Stream from "../lib/Stream.mjs";

/**
 * Untar operation
 */
class Untar extends Operation {
  /**
   * Untar constructor
   */
  constructor() {
    super();

    this.name = "Untar";
    this.module = "Compression";
    this.description = "Unpacks a tarball and displays it per file.";
    this.infoURL = "https://wikipedia.org/wiki/Tar_(computing)";
    this.inputType = "ArrayBuffer";
    this.outputType = "List<File>";
    this.presentType = "html";
    this.args = [];
    this.checks = [
      {
        pattern: "^.{257}\\x75\\x73\\x74\\x61\\x72",
        flags: "",
        args: [],
      },
    ];
  }

  /**
   * @param {ArrayBuffer} input
   * @param {Object[]} args
   * @returns {List<File>}
   */
  run(input, args) {
    input = new Uint8Array(input);
    const stream = new Stream(input),
      files = [];

    while (stream.hasMore()) {
      const dataPosition = stream.position + 512;

      const file = {
        fileName: stream.readString(100),
        fileMode: stream.readString(8),
        ownerUID: stream.readString(8),
        ownerGID: stream.readString(8),
        size: parseInt(stream.readString(12), 8), // Octal
        lastModTime: new Date(1000 * parseInt(stream.readString(12), 8)), // Octal
        checksum: stream.readString(8),
        type: stream.readString(1),
        linkedFileName: stream.readString(100),
        USTARFormat: stream.readString(6).indexOf("ustar") >= 0,
      };

      if (file.USTARFormat) {
        file.version = stream.readString(2);
        file.ownerUserName = stream.readString(32);
        file.ownerGroupName = stream.readString(32);
        file.deviceMajor = stream.readString(8);
        file.deviceMinor = stream.readString(8);
        file.filenamePrefix = stream.readString(155);
      }

      stream.position = dataPosition;

      if (file.type === "0") {
        // File
        let endPosition = stream.position + file.size;
        if (file.size % 512 !== 0) {
          endPosition += 512 - (file.size % 512);
        }

        file.bytes = stream.getBytes(file.size);
        files.push(new File([new Uint8Array(file.bytes)], file.fileName));
        stream.position = endPosition;
      } else if (file.type === "5") {
        // Directory
        files.push(new File([new Uint8Array(file.bytes)], file.fileName));
      } else {
        // Symlink or empty bytes
      }
    }

    return files;
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

export default Untar;
