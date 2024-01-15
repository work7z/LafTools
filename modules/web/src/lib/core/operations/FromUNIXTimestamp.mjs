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
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import moment from "moment-timezone";
import {UNITS} from "../lib/DateTime.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * From UNIX Timestamp operation
 */
class FromUNIXTimestamp extends Operation {

    /**
     * FromUNIXTimestamp constructor
     */
    constructor() {
        super();

        this.name = "From UNIX Timestamp";
        this.module = "Default";
        this.description = "Converts a UNIX timestamp to a datetime string.<br><br>e.g. <code>978346800</code> becomes <code>Mon 1 January 2001 11:00:00 UTC</code><br><br>A UNIX timestamp is a 32-bit value representing the number of seconds since January 1, 1970 UTC (the UNIX epoch).";
        this.infoURL = "https://wikipedia.org/wiki/Unix_time";
        this.inputType = "number";
        this.outputType = "string";
        this.args = [
            {
                "name": "Units",
                "type": "option",
                "value": UNITS
            }
        ];
        this.checks = [
            {
                pattern: "^1?\\d{9}$",
                flags: "",
                args: ["Seconds (s)"]
            },
            {
                pattern: "^1?\\d{12}$",
                flags: "",
                args: ["Milliseconds (ms)"]
            },
            {
                pattern: "^1?\\d{15}$",
                flags: "",
                args: ["Microseconds (μs)"]
            },
            {
                pattern: "^1?\\d{18}$",
                flags: "",
                args: ["Nanoseconds (ns)"]
            }
        ];
    }

    /**
     * @param {number} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if invalid unit
     */
    run(input, args) {
        const units = args[0];
        let d;

        input = parseFloat(input);

        if (units === "Seconds (s)") {
            d = moment.unix(input);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss") + " UTC";
        } else if (units === "Milliseconds (ms)") {
            d = moment(input);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else if (units === "Microseconds (μs)") {
            d = moment(input / 1000);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else if (units === "Nanoseconds (ns)") {
            d = moment(input / 1000000);
            return d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss.SSS") + " UTC";
        } else {
            throw new OperationError("Unrecognised unit");
        }
    }

}

export default FromUNIXTimestamp;
