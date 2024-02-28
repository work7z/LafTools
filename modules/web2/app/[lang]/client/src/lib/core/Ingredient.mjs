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

import Utils from "./Utils.mjs";
import {fromHex} from "./lib/Hex.mjs";

/**
 * The arguments to operations.
 */
class Ingredient {

    /**
     * Ingredient constructor
     *
     * @param {Object} ingredientConfig
     */
    constructor(ingredientConfig) {
        this.name  = "";
        this.type  = "";
        this._value = null;
        this.disabled = false;
        this.hint = "";
        this.rows = 0;
        this.toggleValues = [];
        this.target = null;
        this.defaultIndex = 0;
        this.maxLength = null;
        this.min = null;
        this.max = null;
        this.step = 1;

        if (ingredientConfig) {
            this._parseConfig(ingredientConfig);
        }
    }


    /**
     * Reads and parses the given config.
     *
     * @private
     * @param {Object} ingredientConfig
     */
    _parseConfig(ingredientConfig) {
        this.name = ingredientConfig.name;
        this.type = ingredientConfig.type;
        this.defaultValue = ingredientConfig.value;
        this.disabled = !!ingredientConfig.disabled;
        this.hint = ingredientConfig.hint || false;
        this.rows = ingredientConfig.rows || false;
        this.toggleValues = ingredientConfig.toggleValues;
        this.target = typeof ingredientConfig.target !== "undefined" ? ingredientConfig.target : null;
        this.defaultIndex = typeof ingredientConfig.defaultIndex !== "undefined" ? ingredientConfig.defaultIndex : 0;
        this.maxLength = ingredientConfig.maxLength || null;
        this.min = ingredientConfig.min;
        this.max = ingredientConfig.max;
        this.step = ingredientConfig.step;
    }


    /**
     * Returns the value of the Ingredient as it should be displayed in a recipe config.
     *
     * @returns {*}
     */
    get config() {
        return this._value;
    }


    /**
     * Sets the value of the Ingredient.
     *
     * @param {*} value
     */
    set value(value) {
        this._value = Ingredient.prepare(value, this.type);
    }


    /**
     * Gets the value of the Ingredient.
     *
     * @returns {*}
     */
    get value() {
        return this._value;
    }


    /**
     * Most values will be strings when they are entered. This function converts them to the correct
     * type.
     *
     * @param {*} data
     * @param {string} type - The name of the data type.
    */
    static prepare(data, type) {
        let number;

        switch (type) {
            case "binaryString":
            case "binaryShortString":
            case "editableOption":
            case "editableOptionShort":
                return Utils.parseEscapedChars(data);
            case "byteArray":
                if (typeof data == "string") {
                    data = data.replace(/\s+/g, "");
                    return fromHex(data);
                } else {
                    return data;
                }
            case "number":
                if (data === null) return data;
                number = parseFloat(data);
                if (isNaN(number)) {
                    const sample = Utils.truncate(data.toString(), 10);
                    throw "Invalid ingredient value. Not a number: " + sample;
                }
                return number;
            default:
                return data;
        }
    }

}

export default Ingredient;
