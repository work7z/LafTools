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
 * Various delimiters
 *
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

/**
 * Generic sequence delimiters.
 */
export const DELIM_OPTIONS = ["Space", "Comma", "Semi-colon", "Colon", "Line feed", "CRLF"];

/**
 * Binary sequence delimiters.
 */
export const BIN_DELIM_OPTIONS = ["Space", "Comma", "Semi-colon", "Colon", "Line feed", "CRLF", "None"];

/**
 * Letter sequence delimiters.
 */
export const LETTER_DELIM_OPTIONS = ["Space", "Line feed", "CRLF", "Forward slash", "Backslash", "Comma", "Semi-colon", "Colon"];

/**
 * Word sequence delimiters.
 */
export const WORD_DELIM_OPTIONS = ["Line feed", "CRLF", "Forward slash", "Backslash", "Comma", "Semi-colon", "Colon"];

/**
 * Input sequence delimiters.
 */
export const INPUT_DELIM_OPTIONS = ["Line feed", "CRLF", "Space", "Comma", "Semi-colon", "Colon", "Nothing (separate chars)"];

/**
 * Arithmetic sequence delimiters
 */
export const ARITHMETIC_DELIM_OPTIONS = ["Line feed", "Space", "Comma", "Semi-colon", "Colon", "CRLF"];

/**
 * Hash delimiters
 */
export const HASH_DELIM_OPTIONS = ["Line feed", "CRLF", "Space", "Comma"];

/**
 * IP delimiters
 */
export const IP_DELIM_OPTIONS = ["Line feed", "CRLF", "Space", "Comma", "Semi-colon"];

/**
 * Split delimiters.
 */
export const SPLIT_DELIM_OPTIONS = [
    {name: "Comma", value: ","},
    {name: "Space", value: " "},
    {name: "Line feed", value: "\\n"},
    {name: "CRLF", value: "\\r\\n"},
    {name: "Semi-colon", value: ";"},
    {name: "Colon", value: ":"},
    {name: "Nothing (separate chars)", value: ""}
];

/**
 * Join delimiters.
 */
export const JOIN_DELIM_OPTIONS = [
    {name: "Line feed", value: "\\n"},
    {name: "CRLF", value: "\\r\\n"},
    {name: "Space", value: " "},
    {name: "Comma", value: ","},
    {name: "Semi-colon", value: ";"},
    {name: "Colon", value: ":"},
    {name: "Nothing (join chars)", value: ""}
];

/**
 * RGBA list delimiters.
 */
export const RGBA_DELIM_OPTIONS = [
    {name: "Comma", value: ","},
    {name: "Space", value: " "},
    {name: "CRLF", value: "\\r\\n"},
    {name: "Line Feed", value: "\n"}
];
