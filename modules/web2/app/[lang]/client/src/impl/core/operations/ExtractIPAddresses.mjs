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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.tsx";
import { search } from "../lib/Extract.mjs";
import { ipSort } from "../lib/Sort.mjs";

/**
 * Extract IP addresses operation
 */
class ExtractIPAddresses extends Operation {
  /**
   * ExtractIPAddresses constructor
   */
  constructor() {
    super();

    this.name = "Extract IP addresses";
    this.module = "Regex";
    this.description =
      "Extracts all IPv4 and IPv6 addresses.<br><br>Warning: Given a string <code>710.65.0.456</code>, this will match <code>10.65.0.45</code> so always check the original input!";
    this.inputType = "string";
    this.outputType = "string";
    this.args = [
      {
        name: "IPv4",
        type: "boolean",
        value: true,
      },
      {
        name: "IPv6",
        type: "boolean",
        value: false,
      },
      {
        name: "Remove local IPv4 addresses",
        type: "boolean",
        value: false,
      },
      {
        name: "Display total",
        type: "boolean",
        value: false,
      },
      {
        name: "Sort",
        type: "boolean",
        value: false,
      },
      {
        name: "Unique",
        type: "boolean",
        value: false,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {string}
   */
  run(input, args) {
    const [includeIpv4, includeIpv6, removeLocal, displayTotal, sort, unique] =
        args,
      ipv4 =
        "(?:(?:\\d|[01]?\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d|\\d)(?:\\/\\d{1,2})?",
      ipv6 =
        "((?=.*::)(?!.*::.+::)(::)?([\\dA-F]{1,4}:(:|\\b)|){5}|([\\dA-F]{1,4}:){6})((([\\dA-F]{1,4}((?!\\3)::|:\\b|(?![\\dA-F])))|(?!\\2\\3)){2}|(((2[0-4]|1\\d|[1-9])?\\d|25[0-5])\\.?\\b){4})";
    let ips = "";

    if (includeIpv4 && includeIpv6) {
      ips = ipv4 + "|" + ipv6;
    } else if (includeIpv4) {
      ips = ipv4;
    } else if (includeIpv6) {
      ips = ipv6;
    }

    if (!ips) return "";

    const regex = new RegExp(ips, "ig");

    const ten = "10\\..+",
      oneninetwo = "192\\.168\\..+",
      oneseventwo = "172\\.(?:1[6-9]|2\\d|3[01])\\..+",
      onetwoseven = "127\\..+",
      removeRegex = new RegExp(
        "^(?:" +
          ten +
          "|" +
          oneninetwo +
          "|" +
          oneseventwo +
          "|" +
          onetwoseven +
          ")",
      );

    const results = search(
      input,
      regex,
      removeLocal ? removeRegex : null,
      sort ? ipSort : null,
      unique,
    );

    if (displayTotal) {
      return `Total found: ${results.length}\n\n${results.join("\n")}`;
    } else {
      return results.join("\n");
    }
  }
}

export default ExtractIPAddresses;
