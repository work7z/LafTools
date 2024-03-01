import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


// The slice state is initialized from the URL parameters if it's possible. 
// Meanwhile, the URL parameters can be updated by the app state once it's changed, vice versa.
// e.g. http://127.0.0.1:8080/cn/client?a=3&b=4 refers to a = 3 and b = 4


export type TabLeftType = "tools" | "notes" | "history" | "resources"
export type TabBottomType = "terminal" | "dictionary" | "compute" | "help"
export type TabRightType = "ai" | "todo" | "stopwatch"
type ParamStateState = {
    tl: TabLeftType, // tab left
    tb: TabBottomType,
    tr: TabRightType
};
const initialState: ParamStateState = {
    tl: "tools",
    tb: "terminal",
    tr: "ai"
};


const ParamStateSlice = createSlice({
    name: "paramState",
    initialState,
    reducers: {
        updateParamState(state: ParamStateState, action: PayloadAction) {
            //
        },
    },
});

export default ParamStateSlice;
