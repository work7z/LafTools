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
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../utils/GlobalUtils";
import { logutils } from "../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../styles/routeMem";
import statusSlice from "../../../slice/StatusSlice";
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
import URLUtils from "../../../utils/URLUtils";
import TranslationUtils, { Dot } from "../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../slice/ForgeSlice";
import { ACTION_callRefreshAll } from "../../../slice/SystemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
  SUB_URL_WORKBENCH_TOOLS_CATEGORY,
  URL_WORKBENCH_FILES,
  URL_WORKBENCH_MANUALS as URL_WORKBENCH_MANUAL,
  URL_WORKBENCH_NOTES,
} from "../../../styles/path";
import FixedWorkBenchTool from "../../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../../FixedWorkBenchFiles";

import FixedWorkBenchHistory from "../../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice from "../../../slice/apiSlice";

import {
  SystemStatusBarItem,
  VAL_CSS_MENU_TITLE_PANEL,
} from "../common/WB_Types";
import { useMergeParamWithWorkSpace, useSearchQuery } from "../common/WB_Func";
import {
  FN_ACTION_CloseMenu_ltr,
  FN_ACTION_OpenMenu_ltr,
  FN_ACTION_OpenMenu_ttm,
} from "../../../sliceAction/layout_action";

const SystemStatusBarItemElement = (props: SystemStatusBarItem) => {
  let p_ws = useMergeParamWithWorkSpace();
  return (
    <Tooltip
      content={props.tooltip}
      position={Position.BOTTOM}
      disabled={props.disabled}
    >
      <Link
        to={p_ws({
          b: props.id,
        })}
      >
        <Button
          minimal={true}
          text={props.text}
          small={true}
          className="statusbar-item focus:outline-none"
          icon={props.icon as any}
          onClick={props.onClick}
          active={props.active}
          disabled={props.disabled}
          intent={props.intent}
        />
      </Link>
    </Tooltip>
  );
};

export let WB_ControllerBar = () => {
  let sq = useSearchQuery();
  if (sq.b == undefined) {
    sq.b = "overview";
  }
  let v = exportUtils.useSelector((v) => {
    return {
      // show
      bottom_hide: v.layout.menuHide.bottom,
      // size
      bottom_size: v.layout.menuSize.bottom,
    };
  });

  let statusBarItemLeft: SystemStatusBarItem[] = [
    // define items for Terminal, TODO, Problems
    {
      text: Dot("Kw4OJr", "Terminal"),
      icon: "console",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "VAZq8r",
        "It allows developers to execute various commands, such as running scripts, installing packages, and navigating the file system, all from within the editor. "
      ),
      intent: Intent.NONE,
      id: "terminal",
    },
    // {
    //   text: Dot("spCqEa", "TODO"),
    //   icon: "annotation",
    //   onClick: () => {},
    //   active: false,
    //   disabled: false,
    //   tooltip: Dot("xeP4zV", "Quickly view your TODO items"),
    //   intent: Intent.NONE,
    //   key: "todo",
    // },
    {
      text: Dot("dpRY4", "Dictionary"),
      icon: "book",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot("xeP4zVd", "Quickly look up an English vocabulary."),
      intent: Intent.NONE,
      id: "dictionary",
    },
    /*
    {
      text: Dot("BShq3M", "Problems"),
      icon: "error",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "Cide2w",
        "To see if there's any problem while executing your action."
      ),
      intent: Intent.NONE,
      key: "problems",
    },

 {
      text: Dot("8LdevRj", "Service"),
      icon: "signal-search",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot("Mq9ppT", "Quickly view the status of your services"),
      intent: Intent.NONE,
      key: "service",
    },


*/

    {
      text: Dot("wsWcXd", "Notifications"),
      icon: "notifications",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "39dsCt",
        "You would receive latest notification from app services if have."
      ),
      intent: Intent.NONE,
      id: "notifications",
    },
    // when the user click any menu, then
    {
      text: Dot("8LdRj", "Overview"),
      icon: "panel-stats",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "Mq9pdpT",
        "List all relevant resources for the functional menu you selected."
      ),
      intent: Intent.NONE,
      id: "overview",
    },
  ].map((x) => {
    if (sq.b == x.id && !v.bottom_hide) {
      x.active = true;
    }
    x.onClick = () => {
      if (v.bottom_hide || !x.active) {
        let dis = FN_GetDispatch();
        // TODO: update bottom hide logic here
        dis(
          FN_ACTION_OpenMenu_ttm({
            menuRecordKey: "ttm",
            menuKey: "bottom",
          })
        );
      } else {
        let dis = FN_GetDispatch();
        dis(
          FN_ACTION_CloseMenu_ltr({
            menuRecordKey: "ttm",
            menuKey: "bottom",
          })
        );
      }
    };
    return x;
  });
  let isActivated = true;

  let statusBarItemRight: SystemStatusBarItem[] = [
    // show items for version, messages, windows
    {
      text: `${Dot("2Ocbey", "Version")}: ${APPINFOJSON.version}(${
        isActivated ? Dot("fmYNwD", "Activated") : Dot("sEplqO", "Unactivated")
      })`,
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "Eyq856",
        "We're not done yet - we're dedicated to providing the latest and greatest features, and we'll keep releasing updates to make sure you have the best experience possible. "
      ),
      intent: isActivated ? Intent.PRIMARY : Intent.WARNING,
      id: "version",
    },
    /*
    {
      text: Dot("tBIX-d", "Windows"),
      icon: "grid-view",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "sO0MOe",
        "Every time you stay in a window more than 5 seconds, it would be shown here."
      ),
      intent: Intent.NONE,
      key: "windows",
    },
   */
  ];
  return (
    <div
      className="fixed-wb-nav-foot"
      style={{
        padding: `0 ${VAL_CSS_MENU_TITLE_PANEL}px`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {statusBarItemLeft.map((item) => {
          return <SystemStatusBarItemElement {...item} />;
        })}
      </div>
      <div>
        <SystemStatusBarItemElement
          onClick={() => {
            //
          }}
          text={
            Dot("BW3bpT", "Reading the file from disk...") ||
            Dot("ZW1Dgz", "No Available Message")
          }
          id={""}
          active={false}
          disabled={false}
          tooltip={Dot("ib135dq", "Your Status Message will be displayed here")}
          intent={"none"}
        />
        {statusBarItemRight.map((item) => {
          return <SystemStatusBarItemElement {...item} />;
        })}
      </div>
    </div>
  );
  // return (
  //   <div className="fixed-wb-nav-foot-wrapper">
  //     <div className="fixed-web-nav-foot-center">center</div>

  //   </div>
  // );
};
