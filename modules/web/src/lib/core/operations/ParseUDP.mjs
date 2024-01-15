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
 * @author h345983745 []
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import Stream from "../lib/Stream.mjs";
import {toHexFast, fromHex} from "../lib/Hex.mjs";
import {objToTable} from "../lib/Protocol.mjs";
import Utils from "../Utils.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * Parse UDP operation
 */
class ParseUDP extends Operation {

    /**
     * ParseUDP constructor
     */
    constructor() {
        super();

        this.name = "Parse UDP";
        this.module = "Default";
        this.description = "Parses a UDP header and payload (if present).";
        this.infoURL = "https://wikipedia.org/wiki/User_Datagram_Protocol";
        this.inputType = "string";
        this.outputType = "json";
        this.presentType = "html";
        this.args = [
            {
                name: "Input format",
                type: "option",
                value: ["Hex", "Raw"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {Object}
     */
    run(input, args) {
        const format = args[0];

        if (format === "Hex") {
            input = fromHex(input);
        } else if (format === "Raw") {
            input = Utils.strToArrayBuffer(input);
        } else {
            throw new OperationError("Unrecognised input format.");
        }

        const s = new Stream(new Uint8Array(input));
        if (s.length < 8) {
            throw new OperationError("Need 8 bytes for a UDP Header");
        }

        // Parse Header
        const UDPPacket = {
            "Source port": s.readInt(2),
            "Destination port": s.readInt(2),
            "Length": s.readInt(2),
            "Checksum": "0x" + toHexFast(s.getBytes(2))
        };
        // Parse data if present
        if (s.hasMore()) {
            UDPPacket.Data = "0x" + toHexFast(s.getBytes(UDPPacket.Length - 8));
        }

        return UDPPacket;
    }

    /**
     * Displays the UDP Packet in a tabular style
     * @param {Object} data
     * @returns {html}
     */
    present(data) {
        return objToTable(data);
    }

}


export default ParseUDP;
