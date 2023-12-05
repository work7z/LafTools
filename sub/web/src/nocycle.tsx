// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 30 Sep 2023
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

import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RootState } from "./store";
import appinfoJSON from "./app-info.json";
import { Dispatch } from "react";
import _ from "lodash";

interface NoCycle {
  store?: ToolkitStore<RootState>;
  workspaceId?: string | undefined;
}
let ALL_NOCYCLE: NoCycle = {};
_.set(window, "ALL_NOCYCLE", ALL_NOCYCLE);
export type RootState2 = RootState;
export const APPINFOJSON = appinfoJSON;

export let delayFN = (fn) => {
  setTimeout(fn, 0);
};

export const FN_GetDispatch = (): Dispatch<any> => {
  return ALL_NOCYCLE.store?.dispatch as Dispatch<any>;
};
export const FN_GetState = (): RootState2 => {
  return ALL_NOCYCLE.store?.getState() as RootState2;
};

export default ALL_NOCYCLE;

export let IsDevMode = (): boolean =>
  // emmm.. hard code not cool, would u refine it?
  location.href.indexOf("127.0.0.1:35000") != -1 ||
  location.href.indexOf("localhost:35000") != -1;
