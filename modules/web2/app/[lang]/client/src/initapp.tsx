import ALL_NOCYCLE, { FN_GetDispatch } from "./nocycle.tsx";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import SubApp from "./SubApp.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import { store, RootState } from "./store/index";
import gutils from "./utils/GlobalUtils.tsx";
import "purecss/build/pure.css";
import "purecss/build/grids-responsive-min.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./system.scss";

import { logutils } from "./utils/LogUtils.tsx";
import PageUtils from "./utils/PageUtils.tsx";
import InitUtils from "./utils/InitUtils.tsx";
import exportUtils from "./utils/ExportUtils.tsx";
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
import { ACTION_callInitAllDataAtOnceFromInitSystemEnv } from "./reducers/systemSlice.tsx";
import _ from "lodash";

ALL_NOCYCLE.store = store;

let callInitOnce = _.once(() => {
    FN_GetDispatch()(ACTION_callInitAllDataAtOnceFromInitSystemEnv());
})

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

        // Listen for changes
        matchMedia.addListener(handleColorScheme);
    }, []);

    useEffect(() => {
        callInitOnce()
    }, [1]);


    return constructedKey
}