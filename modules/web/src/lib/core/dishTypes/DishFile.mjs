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
 * Translation methods for file Dishes
 */
class DishFile extends DishType {

    /**
     * convert the given value to an ArrayBuffer
     * @param {File} value
     */
    static toArrayBuffer() {
        DishFile.checkForValue(this.value);
        if (isNodeEnvironment()) {
            this.value = Utils.readFileSync(this.value);
        } else {
            return new Promise((resolve, reject) => {
                Utils.readFile(this.value)
                    .then(v => this.value = v.buffer)
                    .then(resolve)
                    .catch(reject);
            });
        }
    }

    /**
     * convert the given value from an ArrayBuffer
     */
    static fromArrayBuffer() {
        DishFile.checkForValue(this.value);
        this.value = new File(this.value, "unknown");
    }
}

export default DishFile;
