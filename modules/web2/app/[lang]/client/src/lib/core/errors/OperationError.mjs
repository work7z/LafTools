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
 * Custom error type for handling operation input errors.
 * i.e. where the operation can handle the error and print a message to the screen.
 *
 * @author d98762625 [d98762625@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */
class OperationError extends Error {
    /**
     * Standard error constructor. Adds no new behaviour.
     *
     * @param args - Standard error args
     */
    constructor(...args) {
        super(...args);

        this.type = "OperationError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, OperationError);
        }
    }
}

export default OperationError;
