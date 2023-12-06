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
} from "react-router-dom";
import Welcome from "./pages/Welcome";

import RouteComponent from "./Route";
import UserAskMultipleDialogs from "./business/UserAskMultipleDialogs";
import { CLZ_ROOT_DARK, CLZ_ROOT_LIGHT } from "./styles/var";
import InitSystemEnv from "./pages/InitSystemEnv";
import SystemAlertOrPrompt from "./SystemAlertOrPrompt";
import PageUtils from "./utils/PageUtils";
import AuthHookUtils from "./utils/AuthHookUtils";
import InitUtils from "./utils/InitUtils";
import _ from "lodash";

function App() {
  let hotkeys = [
    {
      combo: "shift + K",
      global: true,
      label: "Quick Search by {0}",
      onKeyDown: () => {},
    },
  ];
  let forgeObj = exportUtils.useSelector((val) => ({
    HasUserSelectedOption: val.forge.HasUserSelectedOption,
    dark: val.forge.DarkThemeMode,
    lang: val.forge.Language,
  }));
  let systemObj = exportUtils.useSelector((val) => ({
    HasInitSystemEnv: val.system.HasInitSystemEnv,
  }));
  let queryAuthStatus = AuthHookUtils.useQueryAuthStatus();

  useEffect(() => {
    let isDark = forgeObj.dark;
    let rootClzForDark: string = CLZ_ROOT_DARK;
    let rootClzForLight: string = CLZ_ROOT_LIGHT;
    if (isDark) {
      $("body,html")
        .addClass(rootClzForDark)
        .addClass("dark")
        .removeClass(rootClzForLight);
    } else {
      $("body,html")
        .removeClass(rootClzForDark)
        .removeClass("dark")
        .addClass(rootClzForLight);
    }
  }, [forgeObj.dark]);

  let innerJSX: any;
  let isUserSignInNow =
    !forgeObj.HasUserSelectedOption ||
    (!queryAuthStatus.isFetching && !queryAuthStatus.HasLogin);
  let isEnvNotInit = !systemObj.HasInitSystemEnv;
  let dis = exportUtils.dispatch();
  useEffect(() => {
    if (!(isUserSignInNow || isEnvNotInit)) {
      InitUtils.InitAllWithDOMAfterLoginIn(dis);
    }
  }, [isUserSignInNow, isEnvNotInit]);
  if (isEnvNotInit) {
    innerJSX = <InitSystemEnv key="init-system-env" />;
  } else if (isUserSignInNow) {
    innerJSX = <UserAskMultipleDialogs />;
  } else {
    innerJSX = <RouteComponent></RouteComponent>;
  }

  return (
    <HotkeysProvider>
      <Router basename={PageUtils.GetRoutePath("")}>
        <HotkeysTarget2 hotkeys={hotkeys}>
          {({ handleKeyDown, handleKeyUp }) => {
            return (
              <div
                // draggable
                // onDrop={(e) => {
                //   e.preventDefault();
                // }}
                // onDragOver={(e) => {
                //   e.preventDefault();
                // }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                style={{ width: "100%", height: "100%" }}
              >
                {innerJSX}
                <SystemAlertOrPrompt></SystemAlertOrPrompt>
              </div>
            );
          }}
        </HotkeysTarget2>
      </Router>
    </HotkeysProvider>
  );
}

export default App;
