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
import _ from "lodash";

type LocalStateState = {
    tools_favourites: string,
    lastUpdatedAt: string, // if this value is updated, then the local state should be updated by other tab already
};
const initialState: LocalStateState = {
    lastUpdatedAt: '',
    tools_favourites: '' // joined by comma
};


// The slice state is initialized from the localStorage(online) or sqlite(desktop) if it's possible.
// Meanwhile, the data source will be updated once this slice state has any changes, vice versa.

export function mergeTwoLocalState(initialState: LocalStateState, objState2: any): LocalStateState {
    // NOTE: the quick operation should be cleaned in every merge
    let r: LocalStateState = _.merge(initialState, objState2)
    return r;
}
let localParamSaveKey = "MqVNpvkRh"
let loadFromLocalState = (initialState: LocalStateState) => {
    // firstly, merge the local storage
    try {
        let localParamSaveValue = localStorage.getItem(localParamSaveKey)
        if (localParamSaveValue) {
            let objState2 = JSON.parse(localParamSaveValue)
            mergeTwoLocalState(initialState, objState2)
        }
    } catch (e) {
        console.error('error', e)
    }
}
loadFromLocalState(initialState)
export const DELAY_TIME = 200;
export let syncStateToLocal = _.debounce((formatted: string) => {
    localStorage.setItem(localParamSaveKey, (formatted))
}, DELAY_TIME)

let crtLastUpdatedAt = initialState.lastUpdatedAt



const LocalStateSlice = createSlice({
    name: "localState",
    initialState,
    reducers: {
        updateOneOfLocalState: (state, action: PayloadAction<Partial<LocalStateState>>) => {
            // if (state.lastUpdatedAt !== crtLastUpdatedAt) {
            //     loadFromLocalState(state)
            // } else {
            //     state.lastUpdatedAt = new Date().toISOString()
            // }
            // crtLastUpdatedAt = state.lastUpdatedAt
            _.merge(state, action.payload)
            syncStateToLocal(JSON.stringify(state))
        }
    },
});


export default LocalStateSlice;
