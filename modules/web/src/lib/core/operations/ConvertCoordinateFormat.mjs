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
 * @author j433866 [j433866@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import {FORMATS, convertCoordinates} from "../lib/ConvertCoordinates.mjs";

/**
 * Convert co-ordinate format operation
 */
class ConvertCoordinateFormat extends Operation {

    /**
     * ConvertCoordinateFormat constructor
     */
    constructor() {
        super();

        this.name = "Convert co-ordinate format";
        this.module = "Hashing";
        this.description = "Converts geographical coordinates between different formats.<br><br>Supported formats:<ul><li>Degrees Minutes Seconds (DMS)</li><li>Degrees Decimal Minutes (DDM)</li><li>Decimal Degrees (DD)</li><li>Geohash</li><li>Military Grid Reference System (MGRS)</li><li>Ordnance Survey National Grid (OSNG)</li><li>Universal Transverse Mercator (UTM)</li></ul><br>The operation can try to detect the input co-ordinate format and delimiter automatically, but this may not always work correctly.";
        this.infoURL = "https://wikipedia.org/wiki/Geographic_coordinate_conversion";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Input Format",
                "type": "option",
                "value": ["Auto"].concat(FORMATS)
            },
            {
                "name": "Input Delimiter",
                "type": "option",
                "value": [
                    "Auto",
                    "Direction Preceding",
                    "Direction Following",
                    "\\n",
                    "Comma",
                    "Semi-colon",
                    "Colon"
                ]
            },
            {
                "name": "Output Format",
                "type": "option",
                "value": FORMATS
            },
            {
                "name": "Output Delimiter",
                "type": "option",
                "value": [
                    "Space",
                    "\\n",
                    "Comma",
                    "Semi-colon",
                    "Colon"
                ]
            },
            {
                "name": "Include Compass Directions",
                "type": "option",
                "value": [
                    "None",
                    "Before",
                    "After"
                ]
            },
            {
                "name": "Precision",
                "type": "number",
                "value": 3
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        if (input.replace(/[\s+]/g, "") !== "") {
            const [inFormat, inDelim, outFormat, outDelim, incDirection, precision] = args;
            const result = convertCoordinates(input, inFormat, inDelim, outFormat, outDelim, incDirection, precision);
            return result;
        } else {
            return input;
        }
    }
}

export default ConvertCoordinateFormat;
