// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
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
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ALL_NOCYCLE from "../nocycle";
import { logutils } from "../utils/LogUtils";
import gutils from "../utils/GlobalUtils";
interface PutNewDialogRes {
  index?: number;
  ele: (prop: PutNewDialogReqProp) => JSX.Element;
  close: () => void;
}
export const DialogStoreMap: {
  [key: string]: PutNewDialogRes;
} = {};
export type PutNewDialogReqProp = {
  closeBtnJSX: JSX.Element;
  obj: PutNewDialogRes;
};
gutils.ExposureIt("DialogStoreMap", DialogStoreMap, true);

const initialState = {
  dialogIncrement: 1,
};

type DialogState = typeof initialState;

const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    updateDialogIncrement(state: DialogState, action: PayloadAction) {
      logutils.info("updating the increment");
      state.dialogIncrement++;
    },
  },
});

type PutNewDialogReq = {
  dispatch;
  id: string;
  Dialog: (any) => JSX.Element;
};
export const TOOL_PutNewDialog = ({
  dispatch,
  id,
  Dialog: dialog,
}: PutNewDialogReq): PutNewDialogRes => {
  const prev = DialogStoreMap[id];
  if (prev) {
    // logutils.error("why this field is duplicated");
    return prev;
  }
  DialogStoreMap[id] = {
    ele: dialog,
    index: ALL_NOCYCLE.store?.getState().dialog.dialogIncrement,
    close() {
      delete DialogStoreMap[id];
      dispatch(DialogSlice.actions.updateDialogIncrement());
    },
  };
  dispatch(DialogSlice.actions.updateDialogIncrement());
  return DialogStoreMap[id];
};

export default DialogSlice;
