// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 26 Sep 2023
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
import WorkBench from "./pages/FixedWorkBench";
import Setup from "./pages/Setup";
import $ from "jquery";
import _ from "lodash";
import { CLZ_ROOT_DARK, CLZ_ROOT_LIGHT } from "./styles/var";
import InitSystemEnv from "./pages/InitSystemEnv";
import UserAskMultipleDialogs from "./business/UserAskMultipleDialogs";
import gutils from "./utils/GlobalUtils";
import TranslationUtils from "./utils/TranslationUtils";
import PageUtils from "./utils/PageUtils";
import { URL_ENTRY, URL_WORKBENCH } from "./styles/path";
import RouteUtils from "./utils/RouteUtils";
import InitRouteHistory from "./InitRouteHistory";
import SystemAlertOrPrompt from "./SystemAlertOrPrompt";
import Entry from "./pages/Entry";
import FixedPreWorkBench from "./pages/FixedPreWorkBench";

gutils.ExposureIt("$", $);
gutils.ExposureIt("gutils", gutils);
gutils.ExposureIt("TranslationUtils", TranslationUtils);
gutils.ExposureIt("URLUtils", PageUtils);

let RouteComponent = () => {
  let forgeObj = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
    lang: val.forge.Language,
  }));
  // once trigger only
  const hist = useHistory();
  InitRouteHistory(hist);
  // + "/:workspaceId"
  let innerJSX = (
    <Switch>
      <Route
        path={URL_WORKBENCH + "/:workspaceId"}
        component={WorkBench}
      ></Route>
      <Route path={URL_WORKBENCH} component={FixedPreWorkBench}></Route>
      <Route path={URL_ENTRY} component={Entry}></Route>
      <Redirect path="*" to={URL_WORKBENCH}></Redirect>
    </Switch>
  );
  return (
    <div
      className={" " + (forgeObj.dark ? " bp5-dark dark " : " ")}
      key={forgeObj.lang}
    >
      {innerJSX}
      {/* <SystemAlertOrPrompt /> */}
      {/* <SysNav /> */}
    </div>
  );
};

export default RouteComponent;
