// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 24 Sep 2023
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

import {
  PayloadAction,
  Store,
  configureStore,
  createAsyncThunk,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { listenerMiddleware } from "./listenerMiddleware";
import rootObj from "./reducers";
import thunk from "redux-thunk";
import apiSlice from "./reducers/apiSlice";
import nocycle from "./nocycle";
import _ from "lodash";
import { logutils } from "./utils/LogUtils";
import { saveIntoForge2 } from "./reducers/forgeSlice";
import CacheUtils from "./utils/CacheUtils";
import SyncStateUtils from "./utils/SyncStateUtils";
import onlineAPISlice from "./reducers/onlineAPISlice";

type RootObjType = typeof rootObj;
const rootReducer = _.mapValues(rootObj, (x, d, n) => {
  return x.reducer;
}) as { [K in keyof RootObjType]: RootObjType[K]["reducer"] };

let syncedReducerNames: string[] = [];
_.forEach(rootObj, (x: any, d, n) => {
  if (x?.actions?.replaceWithLatestState) {
    syncedReducerNames.push(d);
  }
});

SyncStateUtils.setSyncedReducerNames(syncedReducerNames, rootObj);
SyncStateUtils.rootObj = rootObj as any;

const alwaysHappyMiddleware =
  (storeAPI) => (next) => (action: PayloadAction) => {
    const originalResult = next(action);
    // check forge
    if (
      _.startsWith(action.type, "forge/") &&
      action.type != "forge/updateStateComingFromServer"
    ) {
      let state = storeAPI.getState();
      let forge = state.forge;
      logutils.debug("saving forge", state, action);

      logutils.debug("saved forge");
      saveIntoForge2(forge);
    }
    let state = storeAPI.getState();
    SyncStateUtils.notifyChanges(state, action.type);
    return originalResult;
  };

// _.forEach(rootObj, (x: any, d, n) => {
// x["actions"];
// SyncStateUtils.
// });
_.set(window, "rootReducerObj", rootObj);

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(onlineAPISlice.middleware)
        .concat(apiSlice.middleware)
        .concat(alwaysHappyMiddleware)
        .prepend(listenerMiddleware.middleware);
    },
    // preloadedState, // TODO: restore previous session
    enhancers: [],
  });

  return store;
}
