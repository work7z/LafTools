import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


// The slice state is initialized from the localStorage(online) or sqlite(desktop) if it's possible.
// Meanwhile, the data source will be updated once this slice state has any changes, vice versa.


const initialState = {
    //
};

type LocalStateState = typeof initialState;

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
