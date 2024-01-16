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
 * @copyright Crown Copyright 2017
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import otp from "otp";
import ToBase32 from "./ToBase32.mjs";

/**
 * Generate TOTP operation
 */
class GenerateTOTP extends Operation {

    /**
     * GenerateTOTP constructor
     */
    constructor() {
        super();

        this.name = "Generate TOTP";
        this.module = "Default";
        this.description = "The Time-based One-Time Password algorithm (TOTP) is an algorithm that computes a one-time password from a shared secret key and the current time. It has been adopted as Internet Engineering Task Force standard RFC 6238, is the cornerstone of Initiative For Open Authentication (OAUTH), and is used in a number of two-factor authentication systems. A TOTP is an HOTP where the counter is the current time.<br><br>Enter the secret as the input or leave it blank for a random secret to be generated. T0 and T1 are in seconds.";
        this.infoURL = "https://wikipedia.org/wiki/Time-based_One-time_Password_algorithm";
        this.inputType = "ArrayBuffer";
        this.outputType = "string";
        this.args = [
            {
                "name": "Name",
                "type": "string",
                "value": ""
            },
            {
                "name": "Key size",
                "type": "number",
                "value": 32
            },
            {
                "name": "Code length",
                "type": "number",
                "value": 6
            },
            {
                "name": "Epoch offset (T0)",
                "type": "number",
                "value": 0
            },
            {
                "name": "Interval (T1)",
                "type": "number",
                "value": 30
            }
        ];
    }

    /**
     * @param {ArrayBuffer} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const otpObj = otp({
            name: args[0],
            keySize: args[1],
            codeLength: args[2],
            secret: (new ToBase32).run(input, []).split("=")[0],
            epoch: args[3],
            timeSlice: args[4]
        });
        return `URI: ${otpObj.totpURL}\n\nPassword: ${otpObj.totp()}`;
    }

}

export default GenerateTOTP;
