// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 3 Oct 2023
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import {
  DispatchProp,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { Dispatch } from "react";
import AjaxUtils from "../utils/AjaxUtils";
import { logutils } from "../utils/LogUtils";
import URLUtils from "../utils/URLUtils";
import { TreeNodeInfo } from "@blueprintjs/core";
import { TreeWrapInfo } from "../styles/var";
import _ from "lodash";

const initialState = {
  subCategoryTreeInfo: {},
  extensionIdRefreshMap: {},
} as {
  subCategoryTreeInfo: TreeWrapInfo;
  extensionIdRefreshMap: { [key: string]: number };
};

type ToolState = typeof initialState;

const ToolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    updateSubCategoryTreeInfo(
      state: ToolState,
      action: PayloadAction<TreeWrapInfo>
    ) {
      state.subCategoryTreeInfo = action.payload;
      state.subCategoryTreeInfo.updateId = new Date().getTime() + " ";
    },
    updateSubCategoryForSelected(
      state: ToolState,
      action: PayloadAction<string[]>
    ) {
      state.subCategoryTreeInfo.selected = action.payload;
    },
    updateSubCategoryTreeRemarks(
      state: ToolState,
      action: PayloadAction<TreeNodeInfo>
    ) {
      state.subCategoryTreeInfo.nodes = [
        action.payload,
        ..._.slice(
          state.subCategoryTreeInfo.nodes,
          1,
          _.size(state.subCategoryTreeInfo.nodes)
        ),
      ];
    },
    updateExtensionIdRefreshMap(
      state,
      action: PayloadAction<{ extId: string }>
    ) {
      let extId = action.payload.extId;
      if (_.isNil(state.extensionIdRefreshMap[extId])) {
        state.extensionIdRefreshMap[extId] = 0;
      }
      state.extensionIdRefreshMap[extId]++;
    },
  },
});

export default ToolSlice;
