// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

/**
 * Translation methods for ArrayBuffer Dishes
 */
class DishByteArray extends DishType {
  /**
   * convert the given value to a ArrayBuffer
   */
  static toArrayBuffer() {
    DishByteArray.checkForValue(this.value);
    this.value = new Uint8Array(this.value).buffer;
  }

  /**
   * convert the given value from a ArrayBuffer
   */
  static fromArrayBuffer() {
    DishByteArray.checkForValue(this.value);
    this.value = Array.prototype.slice.call(new Uint8Array(this.value));
  }
}

export default DishByteArray;
