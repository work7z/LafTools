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
export type ParamStateState = {
    l: TabLeftType, // tab left
    b: TabBottomType, // bottom 
    r: TabRightType, // right
    fc?: string;
    tid?: string; // tool tab id
};
const initialState: ParamStateState = {
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
