// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 22 Nov 2023
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
import { EachTab } from "../pages/FixedWorkBench/components/GenHorizontalTab";
import _ from "lodash";

// workspace slice, will be used to store and display the selected workspace.
// note that this slice should not be used unless the user got an valid workspace.

type GeneralTabBasicTab = {
  tools_tabIdx?: number;
  tools_tabs?: EachTab[];
  tools_selected?: string[];
  tools_expanded?: string[];
  tools_favourites?: string[];
};

type ToolWSPState = {} & GeneralTabBasicTab;

type CurrentWorkspaceState = {
  tools: ToolWSPState;
};

const initialState: CurrentWorkspaceState = {
  tools: {
    tools_tabIdx: 0,
    tools_tabs: [],
    tools_selected: [],
    tools_expanded: [],
    tools_favourites: [],
  },
};

const WorkspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    // update tools
    updateTools: (state, action: PayloadAction<ToolWSPState>) => {
      state.tools = _.merge(state, action.payload);
    },
  },
});

export default WorkspaceSlice;
