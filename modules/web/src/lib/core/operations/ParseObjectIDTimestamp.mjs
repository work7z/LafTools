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
 * @author dmfj [dominic@dmfj.io]
 * @copyright Crown Copyright 2020
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";
import BSON from "bson";

/**
 * Parse ObjectID timestamp operation
 */
class ParseObjectIDTimestamp extends Operation {

    /**
     * ParseObjectIDTimestamp constructor
     */
    constructor() {
        super();

        this.name = "Parse ObjectID timestamp";
        this.module = "Serialise";
        this.description = "Parse timestamp from MongoDB/BSON ObjectID hex string.";
        this.infoURL = "https://docs.mongodb.com/manual/reference/method/ObjectId.getTimestamp/";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        try {
            const objectId = new BSON.ObjectID(input);
            return objectId.getTimestamp().toISOString();
        } catch (err) {
            throw new OperationError(err);
        }
    }

}

export default ParseObjectIDTimestamp;
