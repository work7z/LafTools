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

import { useEffect } from "react";
import exportUtils from "./utils/ExportUtils";
import { HotkeysProvider, HotkeysTarget2 } from "@blueprintjs/core";
import { BrowserRouter as Router } from "react-router-dom";
import $ from 'jquery'
import RouteComponent from "./Route";
import UserAskMultipleDialogs from "./containers/UserAskMultipleDialogs";
import { CLZ_ROOT_DARK, CLZ_ROOT_LIGHT } from "./types/constants";
import InitSystemEnv from "./pages/Loading";
import SystemAlertOrPrompt from "./overlap/SystemAlertOrPrompt";
import PageUtils from "./utils/PageUtils";
import AuthHookUtils from "./utils/AuthHookUtils";
import LoadingBar from 'react-top-loading-bar'
import InitUtils from "./utils/InitUtils";
import { FN_GetDispatch, IsDevMode, getIconPngFile } from "./nocycle";
import systemSlice from "./reducers/systemSlice";
import forgeSlice from "./reducers/forgeSlice";
import { Dot } from "./utils/TranslationUtils";
import { GetUserActualClientLang, getFormattedLang } from "./i18n";
import AlertUtils from "./utils/AlertUtils";
import SystemLoadingBar from "./containers/SystemLoadingBar";
import { fmtURL_Client } from "@/app/__CORE__/utils/cRouteUtils";
import { useTheme } from "next-themes";

function App() {
  let forgeObj = exportUtils.useSelector((val) => ({
    HasUserSelectedOption: val.forge.HasUserSelectedOption,
    dark: val.forge.DarkThemeMode,
    lang: val.forge.Language,
  }));
  let systemObj = exportUtils.useSelector((val) => ({
    LoadSystemData: val.system.LoadSystemData,
  }));
  let { theme, setTheme } = useTheme()
  let queryAuthStatus = AuthHookUtils.useQueryAuthStatus();
  let hotkeys = [
    {
      combo: "shift + D",
      global: true,
      label: Dot("H8fQ4", "Toggle to Light or Dark Mode"),
      onKeyDown: () => {
        // FN_GetDispatch()(
        // forgeSlice.actions.updateDarkMode({
        //   isDark: !forgeObj.dark,
        // })
        // );
        setTheme(theme == 'dark' ? 'light' : 'dark')
      },
    },
  ];

  // useEffect(() => {
  //   let isDark = forgeObj.dark;
  //   let rootClzForDark: string = CLZ_ROOT_DARK;
  //   let rootClzForLight: string = CLZ_ROOT_LIGHT;
  //   if (isDark) {
  //     $("body,html")
  //       .addClass(rootClzForDark)
  //       .addClass("dark")
  //       .removeClass(rootClzForLight);
  //   } else {
  //     $("body,html")
  //       .removeClass(rootClzForDark)
  //       .removeClass("dark")
  //       .addClass(rootClzForLight);
  //   }
  // }, [forgeObj.dark]);

  let innerJSX: any;
  let isUserSignInNow =
    !forgeObj.HasUserSelectedOption ||
    (!queryAuthStatus.isFetching && !queryAuthStatus.HasLogin);
  let isEnvNotLoad = !systemObj.LoadSystemData;
  let dis = exportUtils.dispatch();
  useEffect(() => {
    if (!(isUserSignInNow || isEnvNotLoad)) {
      InitUtils.InitAllWithDOMAfterLoginIn(dis);
    }
  }, [isUserSignInNow, isEnvNotLoad]);

  useEffect(() => {
    if (IsDevMode()) {
      $(".icon-ele").attr("href", "/static/" + getIconPngFile());
    }
  }, []);

  // add window resize listneer in useEffect
  useEffect(() => {
    let fn = () => {
      dis(
        systemSlice.actions.updateClientWidthHeight({
          ClientWidth: window.innerWidth,
          ClientHeight: window.innerHeight,
        })
      );
    };
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("resize", fn);
    };
  }, []);

  useEffect(() => {
    // if window size smaller than 1000, then alert
    if (window.innerWidth < 800) {
      AlertUtils.win_alert({
        id: "3QF1S",
        msg: Dot("8qzWJu", "Sorry, currently we haven't supported small screen device yet, please use PC to visit this page.")
      })
    }
  }, [])


  // let langInPath = getFormattedLang(GetUserActualClientLang())
  // let basename = "/app/" + langInPath
  // let basename = fmtURL_Client("/client/" + langInPath)
  let basename = fmtURL_Client("/client/")

  return (
    <HotkeysProvider>
      <Router basename={basename} >
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
                <RouteComponent></RouteComponent>
                <SystemAlertOrPrompt></SystemAlertOrPrompt>
              </div>
            );
          }}
        </HotkeysTarget2>
      </Router>
    </HotkeysProvider >

  );
}

export default App;
