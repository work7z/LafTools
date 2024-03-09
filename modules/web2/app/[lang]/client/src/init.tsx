import ALL_NOCYCLE from "./nocycle";

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

export let useConstructedKeyAndInit = () => {
    let dis = useDispatch();

    let m1 = exportUtils.useSelector((val) => {
        return {
            LangIncrement: val.system.LangIncrement,
        };
    });

    // listen system light/dark mode changes
    let constructedKey = `${m1.LangIncrement}`;

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

    return constructedKey
}