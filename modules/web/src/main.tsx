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

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import SubApp from "./SubApp";
import reportWebVitals from "./reportWebVitals";
import { store, RootState } from "./store/index";
import gutils from "./utils/GlobalUtils";
import "purecss/build/pure.css";
import "purecss/build/grids-responsive-min.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./system.scss";

import { logutils } from "./utils/LogUtils";
import PageUtils from "./utils/PageUtils.tsx";
import InitUtils from "./utils/InitUtils";
import ALL_NOCYCLE from "./nocycle";
import exportUtils from "./utils/ExportUtils";
import fn_tailwindcss from "./hmr/hmr-reload-resources.tsx";
import forgeSlice from "./reducers/forgeSlice.tsx";

import {
  useReadCurrentWorkspaceId,
  useReadCurrentWorkspaceItem,
} from "./utils/WorkSpaceUtils.tsx";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import SystemLoadingBar from "./containers/SystemLoadingBar/index.tsx";
ALL_NOCYCLE.store = store;

logutils.debug("Lanuch the page...");

const WrapApp = () => {
  let dis = useDispatch();

  let m1 = exportUtils.useSelector((val) => {
    return {
      LangIncrement: val.system.LangIncrement,
    };
  });
  let constructedKey = `${m1.LangIncrement}`;

  // listen system light/dark mode changes

  useEffect(() => {
    let matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    function handleColorScheme(e) {
      let isDarkMode = e.matches;
      dis(
        forgeSlice.actions.updateDarkMode({
          isDark: isDarkMode ? true : false,
        })
      );

    }

    // Call the function once to handle the current color scheme
    // handleColorScheme(matchMedia);

    // Listen for changes
    matchMedia.addListener(handleColorScheme);
  }, []);

  return <SubApp key={constructedKey} />;
};

export const FinalRootApp = () => {
  return (
    <Provider store={store}>
      <SystemLoadingBar />
      <WrapApp />
    </Provider>
  );
};

let ele = document.getElementById("root") as HTMLElement;
const root = createRoot(ele!);
root.render(<FinalRootApp />);

logutils.debug("rendered.");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// init stuff
fn_tailwindcss();
