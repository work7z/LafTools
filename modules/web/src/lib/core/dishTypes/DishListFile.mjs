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
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */

import DishType from "./DishType.mjs";
import Utils, { isNodeEnvironment } from "../Utils.mjs";


/**
 * Translation methods for ListFile Dishes
 */
class DishListFile extends DishType {

    /**
     * convert the given value to a ArrayBuffer
     */
    static async toArrayBuffer() {
        DishListFile.checkForValue(this.value);

        if (isNodeEnvironment()) {
            this.value = this.value.map(file => Uint8Array.from(file.data));
        } else {
            this.value = await DishListFile.concatenateTypedArraysWithTypedElements(...this.value);
        }
    }

    /**
     * convert the given value from a ArrayBuffer
     */
    static fromArrayBuffer() {
        DishListFile.checkForValue(this.value);
        this.value = [new File(this.value, "unknown")];
    }

    /**
     * Concatenates a list of typed elements together.
     *
     * @param {Uint8Array[]} arrays
     * @returns {Uint8Array}
     */
    static async concatenateTypedArraysWithTypedElements(...arrays) {
        let totalLength = 0;
        for (const arr of arrays) {
            totalLength += arr.size;
        }
        const myArray = new Uint8Array(totalLength);

        let offset = 0;
        for (const arr of arrays) {
            const data = await Utils.readFile(arr);
            myArray.set(data, offset);
            offset += data.length;
        }
        return myArray;
    }

    /**
     * Concatenates a list of Uint8Arrays together
     *
     * @param {Uint8Array[]} arrays
     * @returns {Uint8Array}
     */
    static concatenateTypedArrays(...arrays) {
        let totalLength = 0;
        for (const arr of arrays) {
            totalLength += arr.length;
        }
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const arr of arrays) {
            result.set(arr, offset);
            offset += arr.length;
        }
        return result;
    }
}

export default DishListFile;
