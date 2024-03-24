// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 2 Mar 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import _ from "lodash";
import { TrueFalseType } from './paramStateSlice'


export type MemoryStateState = {
    siteToolDialogOpen: TrueFalseType,
    siteToolOptRenderMap: { [key: string]: number } // when config is changed, this will be updated
};
const initialState: MemoryStateState = {
    // siteToolDialogOpen: 'false'
    siteToolDialogOpen: 'f',
    siteToolOptRenderMap: {}
};

export type MemoryStateStateKeyType = keyof MemoryStateState;

const MemoryStateSlice = createSlice({
    name: "memoryState",
    initialState,
    reducers: {
        updateOneOfParamState: (state, action: PayloadAction<Partial<MemoryStateState>>) => {
            _.merge(state, action.payload)
        }
    },
});

export default MemoryStateSlice;
