// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 19 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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

import _ from "lodash";
import gutils from "./GlobalUtils";
let prefixRemark = "C4Vvc";
let mem = {};
export const RemarkUtils = {
  KEY_GET_FORGE_BEFORE: "C0A7J",
  checkKeyExistsInLS: (key: string): boolean => {
    return localStorage.getItem(prefixRemark + key) !== null;
  },
  // save key
  saveKeyInLS: (key: string) => {
    localStorage.setItem(prefixRemark + key, "1");
  },
  KEY_MUTE_FORGE_SET_ONCE: "u7FLz",
  checkKeyExistsInMem: (key: string): boolean => {
    return !_.isNil(mem[prefixRemark + key]);
  },
  // save key
  saveKeyInMem: (key: string) => {
    mem[prefixRemark + key] = "1";
  },
  cleanKeyInMem: (key: string) => {
    delete mem[prefixRemark + key];
  },
  readAndDelInMem: (key: string): boolean => {
    let has = RemarkUtils.checkKeyExistsInMem(key);
    RemarkUtils.cleanKeyInMem(key);
    return has;
  },
};
gutils.ExposureIt("RemarkUtils", RemarkUtils, true);
