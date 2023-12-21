import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SyncStateUtils from "../utils/SyncStateUtils";

type SessionState = {
    sessionKeyToList: {
        [sessionKey: string]: { // like text translator, md5, md2, etc...
            list: { label: string, value: string }[], // session-1, session-2
            sessionMap: { [sessionIdAttrName: string]: string }// attrName to attrValue
        };
    }
};

const initialState: SessionState = {
    sessionKeyToList: {}
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
        updateSession(state: SessionState, action: PayloadAction) {
            //
        },
    },
});

export default SessionSlice;
