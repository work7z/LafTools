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
 * @author n1073645 [n1073645@gmail.com]
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import {UNITS} from "../lib/DateTime.mjs";

/**
 * Get Time operation
 */
class GetTime extends Operation {

    /**
     * GetTime constructor
     */
    constructor() {
        super();

        this.name = "Get Time";
        this.module = "Default";
        this.description = "Generates a timestamp showing the amount of time since the UNIX epoch (1970-01-01 00:00:00 UTC). Uses the W3C High Resolution Time API.";
        this.infoURL = "https://wikipedia.org/wiki/Unix_time";
        this.inputType = "string";
        this.outputType = "number";
        this.args = [
            {
                name: "Granularity",
                type: "option",
                value: UNITS
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {number}
     */
    run(input, args) {
        const nowMs = (performance.timeOrigin + performance.now()),
            granularity = args[0];

        switch (granularity) {
            case "Nanoseconds (ns)":
                return Math.round(nowMs * 1000 * 1000);
            case "Microseconds (μs)":
                return Math.round(nowMs * 1000);
            case "Milliseconds (ms)":
                return Math.round(nowMs);
            case "Seconds (s)":
                return Math.round(nowMs / 1000);
            default:
                throw new OperationError("Unknown granularity value: " + granularity);
        }
    }

}

export default GetTime;
