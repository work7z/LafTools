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


// The slice state is initialized from the localStorage(online) or sqlite(desktop) if it's possible.
// Meanwhile, the data source will be updated once this slice state has any changes, vice versa.

type LocalStateState = {
};
const initialState: LocalStateState = {

};

const LocalStateSlice = createSlice({
    name: "localState",
    initialState,
    reducers: {
        updateLocalState(state: LocalStateState, action: PayloadAction) {
            //
        },
    },
});

export default LocalStateSlice;
