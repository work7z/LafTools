// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 20 Oct 2023
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

type TextKVMap = { [key: string]: string | null };

export type TextKVStatus = {
  outsideUpdateVer: number; // once this field is updated from outside, then reload the internal editor value forcibly
  value: string;
  internalValue: string|null;
};
type TextKVStatusMap = {
  [key: string]: TextKVStatus;
};

type bigtextState = {
  textKVMap: TextKVMap; // deprecated
  textKVStatusMap: TextKVStatusMap;
};
const initialState: bigtextState = {
  textKVMap: {},
  textKVStatusMap: {},
};

const BigTextSlice = createSlice({
  name: "bigtext",
  initialState,
  reducers: {
    updatebigtext(
      state: bigtextState,
      action: PayloadAction<{ key: string; value: string }>
    ) {
      state.textKVMap[action.payload.key] = action.payload.value;
    },
    updateTextKVStatusMapById(
      state,
      action: PayloadAction<{ key: string; value: TextKVStatus }>
    ) {
      state.textKVStatusMap[action.payload.key] = action.payload.value;
    },
  },
});

export default BigTextSlice;
