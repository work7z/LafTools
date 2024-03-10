// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 20 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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

import axios from "axios";
import gutils from "../utils/GlobalUtils";
import $ from "jquery";
import { connectToWebSocket } from "../reducers/websocketSlice";
import hmrJSON from "./hmr.json";
import { ACTION_getLangData } from "../reducers/systemSlice";
import { FN_GetDispatch } from "../nocycle";

// TODO: make this hmr part in vite.config.js

let anyFileChangeCtn = 0;

export default () => {
  // if (gutils.IsDevMode()) {
  //   // regulary retrieve and apply for this page
  //   let moniteResources = hmrJSON.Files;
  //   let ws = connectToWebSocket({ subLink: "/ws/dev-hmr" });
  //   ws.onmessage = (e) => {
  //     anyFileChangeCtn++;
  //     moniteResources.forEach((eachPath) => {
  //       (async () => {
  //         // do reload
  //         // alert("got chagned");
  //         if (eachPath.endsWith("css")) {
  //           let optRes = await axios.get(eachPath);
  //           let cssValue = optRes.data;
  //           $("#dynamic-css").text(cssValue);
  //         } else if (eachPath.endsWith("json")) {
  //           //
  //           FN_GetDispatch()(ACTION_getLangData());
  //         }
  //       })();
  //     });
  //   };
  // }
};
