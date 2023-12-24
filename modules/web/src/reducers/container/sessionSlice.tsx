// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Fri, 22 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
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
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../../utils/SyncStateUtils";
import { TreeNodeInfo } from "@blueprintjs/core";

export type TranslationSessionMapAttr = {
    //
}

// attrName to attrValue, here we can save their settings, session val, etc...    
export type SessionAttr = Partial<TranslationSessionMapAttr & {}>
export type SessionMapAttr = {
    [key: string]: SessionMapAttr
}


export type SessionListItem = TreeNodeInfo
type SessionEntireMapItem = Partial<{ // like text translator, md5, md2, etc...
    activeId: string;
    sessionList: SessionListItem[], // session-1, session-2
    sessionMap: SessionMapAttr
}>
type SessionEntireMap = {
    [sessionType: string]: SessionEntireMapItem;
}
type SessionState = {
    sessionTypeKVMap: SessionEntireMap
};

const initialState: SessionState = {
    sessionTypeKVMap: {}
};


const SessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        ...SyncStateUtils.getSyncStateReducers("session", {
            RunOnInit: true,
            RequireUserId: true,
            RequireWorkspaceId: true,
        }),
        // update list by sessionType and SessionListItem[]
        updateSessionList: (state, action: PayloadAction<{ sessionType: string, list: SessionListItem[] }>) => {
            const { sessionType, list } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            state.sessionTypeKVMap[sessionType].sessionList = list;
        },
        // update activeId by sessionType
        updateActiveId: (state, action: PayloadAction<{ sessionType: string, activeId: string }>) => {
            const { sessionType, activeId } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            state.sessionTypeKVMap[sessionType].activeId = activeId;
        },
        // update sessionMap by sessionType
        updateSessionMap: (state, action: PayloadAction<{ sessionType: string, sessionMap: SessionMapAttr }>) => {
            const { sessionType, sessionMap } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            state.sessionTypeKVMap[sessionType].sessionMap = sessionMap;
        },
        // update all fields by sessionType
        updateSession: (state, action: PayloadAction<{ sessionType: string, item:SessionEntireMapItem} >) => {
            const { sessionType, item } = action.payload;
            if (!state.sessionTypeKVMap[sessionType]) {
                state.sessionTypeKVMap[sessionType] = {}
            }
            state.sessionTypeKVMap[sessionType] = item;
        },
    },
});

export default SessionSlice;
