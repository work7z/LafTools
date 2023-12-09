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
import ALL_NOCYCLE, {
  FN_GetDispatch,
  FN_GetState,
  IsDevMode,
  getAjaxValueRes,
} from "../nocycle";
import AjaxUtils from "./AjaxUtils";
import _, { DebouncedFunc } from "lodash";
import AlertUtils from "./AlertUtils";
window["_"] = _;

type SyncDefinition = {
  RunOnInit?: boolean;
  RunOnEnterWorkBench?: boolean;
};
let syncReducerDefinitions: { [key: string]: SyncDefinition } = {};
let syncedReducerNames: string[] = [];
let syncedReducerNameFnMap: { [key: string]: DebouncedFunc<any> } = {};
let syncedAlreadyMap: { [key: string]: boolean } = {};
// let originalInitialState: any = {};
let SyncStateUtils = {
  rootObj: null,
  setSyncedReducerNames(val: string[], st: any) {
    syncedReducerNames = val;
    // _.forEach(syncedReducerNames, (eachReducerName) => {
    //   originalInitialState[eachReducerName] = _.cloneDeep(st[eachReducerName]);
    // });
  },
  getSyncStateReducers(sliceName: string, syncDefinition: SyncDefinition) {
    syncReducerDefinitions[sliceName] = syncDefinition;
    return {
      replaceWithLatestState(state, action: PayloadAction<{ newState: any }>) {
        let newState = action.payload.newState;
        // _.defaultsDeep(newState, state);
        function checkDefaultsDeep(
          value: any,
          srcValue: any,
          key: string,
          object: any,
          source: any
        ) {
          if (_.isNil(value)) {
            return srcValue;
          }
          if (_.isArray(value) || _.isArray(srcValue)) {
            return value;
          }
          return value;
        }
        let obj = { ...newState };
        let src = { ...state };
        newState = _.mergeWith(obj, src, checkDefaultsDeep);
        if (sliceName == "workspace") {
          debugger;
        }
        return newState;
      },
    };
  },
  retrieveAllIDsFromServer: async function (
    checkFN: (i: SyncDefinition) => boolean
  ) {
    for (let eachReducerName of syncedReducerNames) {
      let def = syncReducerDefinitions[eachReducerName];
      // if (syncedAlreadyMap[eachReducerName]) {
      //   continue;
      // }
      if (def && !checkFN(def)) {
        continue;
      }
      await SyncStateUtils.retrieveIDFromServer(eachReducerName);
      syncedAlreadyMap[eachReducerName] = true;
    }
  },
  retrieveIDFromServer: async (eachReducerName: string) => {
    let val = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: "/sync/reducer/get?name=" + eachReducerName,
    });
    if (val.error) {
      // if (IsDevMode()) {
      //   AlertUtils.popError(val.error);
      // }
    }
    let replaceState: any = null;
    if (val.response) {
      let innerValue = getAjaxValueRes(val);
      if (innerValue) {
        replaceState = innerValue;
      }
    }
    if (replaceState == null) {
      debugger;
      let fn = _.get(SyncStateUtils.rootObj, [
        eachReducerName,
        "getInitialState",
      ]) as any;
      if (fn) {
        replaceState = fn();
      }
    }
    let t =
      SyncStateUtils.rootObj &&
      (SyncStateUtils.rootObj[eachReducerName] as any);
    let replaceWithLatestState = _.get(
      t,
      "actions.replaceWithLatestState"
    ) as any;
    if (replaceWithLatestState) {
      FN_GetDispatch()(replaceWithLatestState({ newState: replaceState }));
    }
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
