// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 5 Oct 2023
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

import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import testReducer, { pong, testSliceActions } from "./slice/testSlice";
import { store, RootState } from "./store/index";
import exportUtils from "./utils/ExportUtils";
import { logutils } from "./utils/LogUtils";
import { HotkeysProvider, HotkeysTarget2 } from "@blueprintjs/core";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Welcome from "./pages/Welcome";

import Setup from "./pages/Setup";
import $ from "jquery";
import _ from "lodash";
import { CLZ_ROOT_DARK, CLZ_ROOT_LIGHT } from "./styles/var";
import InitSystemEnv from "./pages/InitSystemEnv";
import UserAskMultipleDialogs from "./business/UserAskMultipleDialogs";
import gutils from "./utils/GlobalUtils";
import TranslationUtils from "./utils/TranslationUtils";
import PageUtils from "./utils/PageUtils";
import { ID_FILES, ID_HISTORY, ID_NOTES, ID_TOOLS } from "./styles/path";
import RouteMem from "./styles/routeMem";

let InitRouteHistory = _.once((hist) => {
  _.set(window, "hist", hist);
  const dispatch = exportUtils.dispatch();
  hist.listen((val) => {
    // logutils.log("route changed", val);
    // let mapList: { pathname: string; id: string }[] = [
    //   {
    //     pathname: URL_WORKBENCH_TOOLS,
    //     id: ID_TOOLS,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_FILES,
    //     id: ID_FILES,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_MANUALS,
    //     id: ID_HISTORY,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_NOTES,
    //     id: ID_NOTES,
    //   },
    // ];
    // _.forEach(mapList, (x) => {
    //   if (val.pathname.startsWith(x.pathname)) {
    //     RouteMem[x.id] = val.pathname;
    //   }
    // });
  });
});

export default InitRouteHistory;
