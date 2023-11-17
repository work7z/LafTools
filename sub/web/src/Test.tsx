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

import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import testReducer, { pong, testSliceActions } from "./slice/testSlice";

import { store, RootState } from "./store/index";
import exportUtils from "./utils/ExportUtils";

function App() {
  let msg = exportUtils.useSelector((val: RootState) => {
    return val.test.msg;
  });
  let isOKMsg = exportUtils.useSelector((val) => {
    return val.test.whetherListenMsg;
  });

  let dispatch = exportUtils.dispatch();
  return (
    <div className="App">
      <div>{isOKMsg}</div>
      <div>msg: {msg}</div>
      <input
        type="text"
        onChange={(e) => {
          dispatch(
            testSliceActions.updateMsg({
              newMsg: "update----" + e.target.value,
            })
          );
        }}
      ></input>
    </div>
  );
}

export default App;
