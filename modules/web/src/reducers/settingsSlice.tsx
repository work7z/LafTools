import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../utils/SyncStateUtils";

const initialState = {
  showSideBarNavIconOnly: false,
};

type settingsState = typeof initialState;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    ...SyncStateUtils.getSyncStateReducers("settings", {
      RunOnEnterWorkBench: true,
      RequireUserId: true,
      RequireWorkspaceId: true,
      SyncLocationOnParameter: "settings"
    }),
    updatesettings(state: settingsState, action: PayloadAction) {
      //
    },
  },
});

export default settingsSlice;
