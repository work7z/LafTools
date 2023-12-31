// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 10 Dec 2023
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../utils/SyncStateUtils";
import { ToolDefaultOutputType, Val_ToolTabIndex } from "../types/purejs-types-READ_ONLY";
import _ from "lodash";

type RuntimeStatusState = {
  toolOutputStatusMap: {
    [key: string]: ToolDefaultOutputType;
  };
};
const initialState: RuntimeStatusState = {
  toolOutputStatusMap: {},
};

const RuntimeStatusSlice = createSlice({
  name: "runtimeStatus",
  initialState,
  reducers: {
    ...SyncStateUtils.getSyncStateReducers("runtimeStatus", {
      RunOnInit: true,
      RequireUserId: true,
      RequireWorkspaceId: true,
    }),
    initAtOnceBySessionIdAndValue: (
      state,
      action: PayloadAction<{ sessionId: string; value: ToolDefaultOutputType }>
    ) => {
      let { sessionId, value } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        state.toolOutputStatusMap[sessionId] = value;
      } else {
        _.defaultsDeep(
          state.toolOutputStatusMap[sessionId], value
        )
      }
    },
    // select the latest view panel
    selectLatestViewPanel: (
      state,
      action: PayloadAction<{ sessionId: string; panelId: string }>
    ) => {
      let { sessionId, panelId } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return;
      }
      state.toolOutputStatusMap[sessionId].latestViewPanelId = panelId;
    },
    setToolTabIndex: (
      state,
      action: PayloadAction<{ sessionId: string; tabIndex: Val_ToolTabIndex }>
    ) => {
      let { sessionId, tabIndex } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      state.toolOutputStatusMap[sessionId].toolTabIndex = tabIndex;
    },
    //
    setCollapseOutput: (
      state,
      action: PayloadAction<{ sessionId: string; collapseOutput: boolean }>
    ) => {
      let { sessionId, collapseOutput } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      state.toolOutputStatusMap[sessionId].latestViewPanelId = 'output'
      state.toolOutputStatusMap[sessionId].collapseOutput = collapseOutput;
    },
    setCollapseConfig: (
      state,
      action: PayloadAction<{ sessionId: string; collapseConfig: boolean }>
    ) => {
      let { sessionId, collapseConfig } = action.payload;
      if (!state.toolOutputStatusMap[sessionId]) {
        return
      }
      state.toolOutputStatusMap[sessionId].collapseConfig = collapseConfig;
      state.toolOutputStatusMap[sessionId].latestViewPanelId = 'config'
    },
  },
});

export default RuntimeStatusSlice;
