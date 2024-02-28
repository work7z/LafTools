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
* THIS FILE IS AUTOMATICALLY GENERATED BY src/core/config/scripts/generateConfig.mjs
*
* @author n1474335 [n1474335@gmail.com]
* @copyright Crown Copyright 2023
* @license Apache-2.0
*/
import AvroToJSON from "../../operations/AvroToJSON.mjs";
import BSONDeserialise from "../../operations/BSONDeserialise.mjs";
import BSONSerialise from "../../operations/BSONSerialise.mjs";
import CBORDecode from "../../operations/CBORDecode.mjs";
import CBOREncode from "../../operations/CBOREncode.mjs";
import ParseObjectIDTimestamp from "../../operations/ParseObjectIDTimestamp.mjs";

const OpModules = typeof self === "undefined" ? {} : self.OpModules || {};

OpModules.Serialise = {
    "Avro to JSON": AvroToJSON,
    "BSON deserialise": BSONDeserialise,
    "BSON serialise": BSONSerialise,
    "CBOR Decode": CBORDecode,
    "CBOR Encode": CBOREncode,
    "Parse ObjectID timestamp": ParseObjectIDTimestamp,
};

export default OpModules;
