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


// The slice state is initialized from the URL parameters if it's possible. 
// Meanwhile, the URL parameters can be updated by the app state once it's changed, vice versa.
// e.g. http://127.0.0.1:8080/cn/client?a=3&b=4 refers to a = 3 and b = 4


export type TabLeftType = "tools" | "notes" | "history" | "resources"
export type TabBottomType = "terminal" | "dictionary" | "compute" | "help" | "overview" | "translation"
export type TabRightType = "ai" | "todo" | "stopwatch"
export type TrueFalseType = "true" | "false"
export type ParamStateState = {
    hdstpt: TrueFalseType; // hide setting panel part or not
    hdbtpl: TrueFalseType; // hide bottom process panel or not 
    ltr: TrueFalseType; // left 2 right for editor
    hsr: TrueFalseType;// show sidebar or not
    fs: TrueFalseType; // full screen or not, true or false
    // left
    l: TabLeftType, // tab left
    ls?: string; // left sub
    // bottom
    b: TabBottomType, // bottom 
    // right
    r: TabRightType, // right
    tid?: string; // tool tab id
};
const initialState: ParamStateState = {
    hdstpt: 'false',
    hdbtpl: 'false',
    ltr: 'false',
    hsr: 'false',
    fs: 'false',
    l: "tools",
    b: "terminal",
    r: "ai"
};

// catch if any error occurs
try {
    let paramQ = queryString.parseUrl(location.href).query;
    if (!paramQ) {
        paramQ = {}
    }
    console.log('process', location.href)
    _.merge(initialState, paramQ)
} catch (e) {
    // TODO: report this error if it's possible
    console.error('error', e)
}

export let syncStateToUrl = (state: ParamStateState) => {
    let newUrl = queryString.stringifyUrl({ url: location.href, query: state });
    window.history.pushState({}, '', newUrl);
}

const ParamStateSlice = createSlice({
    name: "paramState",
    initialState,
    reducers: {
        updateOneOfParamState: (state, action: PayloadAction<Partial<ParamStateState>>) => {
            _.merge(state, action.payload)
            syncStateToUrl(state)
        }
    },
});

export default ParamStateSlice;
