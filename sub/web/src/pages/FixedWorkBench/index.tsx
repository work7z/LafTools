// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 2 Nov 2023
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

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import ALL_NOCYCLE, {
  APPINFOJSON,
  FN_GetDispatch,
  delayFN,
} from "../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../utils/GlobalUtils";
import { logutils } from "../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../styles/routeMem";
import statusSlice from "../../slice/StatusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
  useParams,
} from "react-router-dom";
import PageUtils from "../../utils/PageUtils";
import TranslationUtils, { Dot } from "../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../slice/ForgeSlice";
import systemSlice, { ACTION_callRefreshAll } from "../../slice/SystemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
} from "../../styles/path";
import FixedWorkBenchTool from "../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../FixedWorkBenchFiles";

import FixedWorkBenchHistory from "../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice from "../../slice/apiSlice";
import { SysTabPane } from "./components/SysTabPane";
import GenTabs from "./components/GenVerticalTabs";
import { useLeftTabsList } from "./definitions/WB_Common";
import {
  EachTabPanelProp,
  FixedMenuBarProp,
  FixedMenuItem,
  RefAlloProp,
  TabNavProp,
  VAL_CSS_MENU_TITLE_PANEL,
  VAL_CSS_TAB_TITLE_PANEL,
} from "./definitions/WB_Types";
import { WB_ControllerBar as WB_ControllBar } from "./WB_ControlBar";
import { WB_MenuBar as WB_MenuBar } from "./WB_MenuBar";
import { WB_CenterStage as WB_CenterStage } from "./WB_CenterStage";
import "./index.scss";
import QueryUtils from "../../utils/QueryUtils";
import AlertUtils from "../../utils/AlertUtils";
import Blink from "../../components/Blink";
import SyncStateUtils from "../../utils/SyncStateUtils";
import {
  getWorkspaceIdFromPath,
  setupWorkspaceData,
  useReadCurrentWorkspaceId,
} from "../../common/workspace-utils";

export default () => {
  const workspaceId = getWorkspaceIdFromPath();
  gutils.ExposureIt("workspaceId", workspaceId, true);
  // validate if workspaceId exist in system
  // workspaceId
  let idQueryRes = apiSlice.useGetWorkspaceOneByIdAndUserIdQuery(
    {
      Id: workspaceId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  let res = QueryUtils.validateResult(idQueryRes, {
    label: Dot("JfFHw", "Get Workspace Info Request"),
    onlyErr: true,
  });
  let hist = useHistory();
  // const [available, onAvaialble] = useState(false);
  let available = exportUtils.useSelector((val) => {
    return {
      available: val.system.IsWorkBenchPageAvailable,
    };
  }).available;
  let onAvaialble = (a: boolean) => {
    FN_GetDispatch()(systemSlice.actions.updateIsWorkBenchPageAvailable(a));
  };
  let FetchedWorkspaceId = idQueryRes.data?.payload?.value?.Id;
  useEffect(() => {
    if (FetchedWorkspaceId == "") {
      AlertUtils.win_alert({
        id: "Un77m",
        msg: Dot(
          "0gywa",
          "Workspace not found, you will be redirected to workspace index page."
        ),
        fn() {},
      });
      onAvaialble(false);
      hist.replace("/workbench");
    }
  }, [FetchedWorkspaceId]);
  // setup
  useEffect(() => {
    if (FetchedWorkspaceId != "") {
      (async () => {
        await setupWorkspaceData();
        onAvaialble(true);
      })();
    }
  }, [FetchedWorkspaceId, workspaceId]);
  if (res) {
    return res;
  }
  if (!available) {
    return (
      <p className="p-10  w-full h-full align-center justify-center">
        {Dot("oBz8D", "Loading")} <Blink min={3} max={10}></Blink>
      </p>
    );
  }
  return (
    <div
      className="fixed-wb-p "
      style={{
        overflow: "hidden",
      }}
    >
      <WB_MenuBar />
      <WB_CenterStage />
      <WB_ControllBar />
    </div>
  );
};
