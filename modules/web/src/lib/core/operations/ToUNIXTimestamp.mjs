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

import Operation from "../Operation.mjs";
import moment from "moment-timezone";
import {UNITS} from "../lib/DateTime.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * To UNIX Timestamp operation
 */
class ToUNIXTimestamp extends Operation {

    /**
     * ToUNIXTimestamp constructor
     */
    constructor() {
        super();

        this.name = "To UNIX Timestamp";
        this.module = "Default";
        this.description = "Parses a datetime string in UTC and returns the corresponding UNIX timestamp.<br><br>e.g. <code>Mon 1 January 2001 11:00:00</code> becomes <code>978346800</code><br><br>A UNIX timestamp is a 32-bit value representing the number of seconds since January 1, 1970 UTC (the UNIX epoch).";
        this.infoURL = "https://wikipedia.org/wiki/Unix_time";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Units",
                "type": "option",
                "value": UNITS
            },
            {
                "name": "Treat as UTC",
                "type": "boolean",
                "value": true
            },
            {
                "name": "Show parsed datetime",
                "type": "boolean",
                "value": true
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if unit unrecognised
     */
    run(input, args) {
        const [units, treatAsUTC, showDateTime] = args,
            d = treatAsUTC ? moment.utc(input) : moment(input);

        let result = "";

        if (units === "Seconds (s)") {
            result = d.unix();
        } else if (units === "Milliseconds (ms)") {
            result = d.valueOf();
        } else if (units === "Microseconds (μs)") {
            result = d.valueOf() * 1000;
        } else if (units === "Nanoseconds (ns)") {
            result = d.valueOf() * 1000000;
        } else {
            throw new OperationError("Unrecognised unit");
        }

        return showDateTime ? `${result} (${d.tz("UTC").format("ddd D MMMM YYYY HH:mm:ss")} UTC)` : result.toString();
    }

}

export default ToUNIXTimestamp;
