import { PayloadAction } from "@reduxjs/toolkit";

// key -> state name, value -> retrieved state
let latestStateMap: { [key: string]: string } = {};

export default {
  useSyncStateReducers() {
    return {
      replaceWithLatestState(state, action: PayloadAction<{ newState: any }>) {
        return state;
      },
    };
  },
  notifyChanges() {
    //
  },
};
