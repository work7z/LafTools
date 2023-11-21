import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { EachTab } from "../pages/FixedWorkBench/components/GenHorizontalTab";

// workspace slice, will be used to store and display the selected workspace.
// note that this slice should not be used unless the user got an valid workspace.

type GeneralTabBasicTab = {
  tools_tabIdx: number;
  tools_tabs: EachTab[];
  tools_selected?: string[];
  tools_expanded?: string[];
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
  },
};

const WorkspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    // update tools
    updateTools: (state, action: PayloadAction<ToolWSPState>) => {
      state.tools = action.payload;
    },
  },
});

export default WorkspaceSlice;
