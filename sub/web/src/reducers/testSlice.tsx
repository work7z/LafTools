// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TestState {
  todos: Todo[];
  msg: string;
  whetherListenMsg: string;
}

const initialState: TestState = {
  todos: [],
  msg: `hello, world, ${Date.now()}`,
  whetherListenMsg: "no",
};

const testSlice = createSlice({
  name: "test",
  initialState,

  reducers: {
    whetherEnableIt(state, action: PayloadAction<{ isOK: boolean }>) {
      state.whetherListenMsg = action.payload.isOK ? "yes" : "no";
    },
    updateMsg(state, action: PayloadAction<{ newMsg: string }>) {
      console.log(`newmsg: `, action.payload.newMsg);
      state.msg = action.payload.newMsg;
    },
    pong(state, action: PayloadAction<{ id: string; text?: string }>) {
      // state update here
    },
    // Give case reducers meaningful past-tense "event"-style names
    todoAdded(state, action) {
      const { id, text } = action.payload;
      // "Mutating" update syntax thanks to Immer, and no `return` needed
      state.todos.push({
        id,
        text,
        completed: false,
      });
    },
    todoToggled(state, action) {
      // Look for the specific nested object to update.
      // In this case, `action.payload` is the default field in the action,
      // and can hold the `id` value - no need for `action.id` separately
      const matchingTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );

      if (matchingTodo) {
        // Can directly "mutate" the nested object
        matchingTodo.completed = !matchingTodo.completed;
      }
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { todoAdded, todoToggled, pong } = testSlice.actions;
export const testSliceActions = testSlice.actions;

// Export the slice reducer as the default export
export default testSlice;

startListening({
  // Match this exact action type based on the action creator
  actionCreator: testSlice.actions.updateMsg,
  // Run this effect callback whenever that action is dispatched
  effect: async (action, listenerApi) => {
    await listenerApi.delay(1000);
    listenerApi.dispatch(
      testSlice.actions.whetherEnableIt({
        isOK: true,
      })
    );
  },
});
