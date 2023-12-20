// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 12 Nov 2023
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
import { APPINFOJSON, delayFN } from "../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../../../styles/routeMem";
import statusSlice from "../../../../../reducers/StatusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import PageUtils from "../../../../../utils/PageUtils";
import TranslationUtils, { Dot } from "../../../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../reducers/ForgeSlice";
import { ACTION_callRefreshAll } from "../../../../../reducers/SystemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
  URL_WORKBENCH_WORKSPACE,
} from "../../../../../styles/path";
import { type } from "jquery";
import apiSlice from "../../../../../reducers/apiSlice";

import { EachTabPanelProp } from "./WB_Types";
import { InnerToolPanel } from "../Center/nav/functional/panel-group/panels/ToolPanel";
import { InnerFilePanel } from "../Center/nav/functional/panel-group/panels/FilePanel";
import {
  useMergeParamWithWorkSpace,
  useMergeParameter,
  useSearchQuery,
} from "./WB_Func";

export let NoAvailablePanel = () => {
  return <div>{Dot("22XLF", "Not finished yet")}</div>;
};

export let useLeftTabsList = (): EachTabPanelProp[] => {
  // let func_mergeParameter = useMergeParameter();
  let sq = useSearchQuery();
  let func_mergeWithWS = useMergeParamWithWorkSpace();
  return useMemo<EachTabPanelProp[]>((): EachTabPanelProp[] => {
    return [
      {
        desc: Dot(
          "pEk1kk",
          "LafTools presents useful functionalities for you here."
        ),
        icon: "briefcase",
        id: ID_TOOLS,
        // pathname: SUB_URL_WORKBENCH_TOOLS_CATEGORY,
        label: Dot("RNBze0", "Tools"),
        panel: InnerToolPanel,
      },
      {
        desc: Dot(
          "5NJeddqGsu1",
          "This section includes computer materials, wiki articles, usage guides, and more."
        ),
        // pathname: URL_WORKBENCH_MANUAL,
        icon: "manual",
        id: ID_MANUAL,
        label: Dot("YrVqdd683", "Manuals"),
      },
      {
        desc: Dot(
          "qWw3eTH",
          "This part helps to maintain files on your local disk or cloud disk."
        ),
        // pathname: URL_WORKBENCH_FILES,
        icon: "folder-close",
        panel: InnerFilePanel,
        id: ID_FILES,
        label: Dot("znVRwq", "Files"),
      },
      {
        desc: Dot("Ttrqqet", "Write and Save your thoughts here!"),
        // pathname: URL_WORKBENCH_NOTES,
        icon: "git-repo",
        id: ID_NOTES,
        label: Dot("VEfeqZG", "Notes"),
      },

      // write item for manuals

      /*
        {
          desc: Dot(   "5NJeGsu1",
            " E-Mail, you can easily organize your inbox, compose and send messages, and stay on top of your correspondence. Up to now, it's used as a communication tool between users and our team only."
          ),
          pathname: URL_WORKBENCH_HISTORY,
          icon: "inbox",
          id: ID_HISTORY,
          label: Dot("YrVq683", "Mail"),
        },
        */
    ].map((x) => {
      return {
        ...x,
        pathname: func_mergeWithWS({
          f: x.id,
        }),
      };
    });
  }, [_.values(sq)]);
};
