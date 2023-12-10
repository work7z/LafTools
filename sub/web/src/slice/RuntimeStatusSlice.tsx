import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type RuntimeStatusState = {
  toolOutputStatusMap: {
    [key: string]: {
      // key refers to sessionId
      collapseOutput: boolean;
    };
  };
};
const initialState: RuntimeStatusState = {
  toolOutputStatusMap: {},
};

const RuntimeStatusSlice = createSlice({
  name: "runtimeStatus",
  initialState,
  reducers: {
    //
  },
});

export default RuntimeStatusSlice;
