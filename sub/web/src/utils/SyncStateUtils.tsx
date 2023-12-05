// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 5 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
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

import { PayloadAction } from "@reduxjs/toolkit";
import { FN_GetState } from "../nocycle";
import AjaxUtils from "./AjaxUtils";
import _, { DebouncedFunc } from "lodash";

let syncedReducerNames: string[] = [];
let syncedReducerNameFnMap: { [key: string]: DebouncedFunc<any> } = {};
let SyncStateUtils = {
  SetSyncedReducerNames(val: string[]) {
    syncedReducerNames = val;
  },
  getSyncStateReducers() {
    return {
      replaceWithLatestState(state, action: PayloadAction<{ newState: any }>) {
        return state;
      },
    };
  },
  retrieveAllIDsFromServer: async function () {
    for (let eachReducerName of syncedReducerNames) {
      await SyncStateUtils.retrieveIDFromServer(eachReducerName);
    }
  },
  retrieveIDFromServer: async (eachReducerName: string) => {
    let val = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: "/sync/reducer/get?name=" + eachReducerName,
    });
  },
  notifyChanges(state, action_type: string) {
    // check if action_type starts with any one of the syncedReducerNames
    // if so, then dispatch replaceWithLatestState
    if (action_type.indexOf("replaceWithLatestState") != -1) {
      return;
    }
    if (_.isEmpty(syncedReducerNameFnMap)) {
      _.forEach(syncedReducerNames, (eachReducerName) => {
        syncedReducerNameFnMap[eachReducerName] = _.throttle(
          async (newState) => {
            let r = (await AjaxUtils.DoLocalRequestWithNoThrow({
              url: "/sync/reducer/save?name=" + eachReducerName,
              isPOST: true,
              data: newState,
            })) as any;
          },
          800
        );
      });
    }
    _.forEach(syncedReducerNames, (eachReducerName) => {
      if (action_type.startsWith(eachReducerName)) {
        let crtReducerObj = state[eachReducerName];
        syncedReducerNameFnMap[eachReducerName] &&
          syncedReducerNameFnMap[eachReducerName](crtReducerObj);
      }
    });
    //
  },
};

_.set(window, "SyncStateUtils", SyncStateUtils);

export default SyncStateUtils;