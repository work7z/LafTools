// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 13 Oct 2023
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
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
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
import {
  URL_WORKBENCH_FILES,
  URL_WORKBENCH_MANUALS,
  URL_WORKBENCH_NOTES,
  SUB_URL_WORKBENCH_TOOLS_CATEGORY,
} from "../../../../../styles/path";
import WorkBenchTool from "../../../WorkBenchTool";
import WorkBenchNotes from "../../../WorkBenchNotes";
import WorkBenchFiles from "../../../WorkBenchFiles";
import WorkBenchHistory from "../../../WorkBenchHistory";
import "./index.scss";
import { APPINFOJSON } from "../../../../../nocycle";
import { Dot } from "../../../../../utils/TranslationUtils";

export type SystemStatusBarItem = {
  // define a struct for status bar
  text: string;
  icon?: string;
  onClick: () => void;
  active: boolean;
  disabled: boolean;
  tooltip: string;
  intent: Intent;
  id: string;
};

// define React Component with JSX Style to show status items one by one, horizontal layout
const SystemStatusBarItemElement = (props: SystemStatusBarItem) => {
  return (
    <Tooltip
      content={props.tooltip}
      position={Position.BOTTOM}
      disabled={props.disabled}
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
    </Tooltip>
  );
};

const SystemStatusBar = () => {
  let statusBarItemLeft: SystemStatusBarItem[] = [
    // define items for Terminal, TODO, Problems
    {
      text: Dot("K4OJr", "Terminal"),
      icon: "console",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "VAZ8r",
        "It allows developers to execute various commands, such as running scripts, installing packages, and navigating the file system, all from within the editor. "
      ),
      intent: Intent.NONE,
      id: "terminal",
    },
    {
      text: Dot("spCEa", "TODO"),
      icon: "annotation",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot("xP4zV", "Quickly view your TODO items"),
      intent: Intent.NONE,
      id: "todo",
    },
    /*
    {
      text: Dot("BSh3M", "Problems"),
      icon: "error",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "Cid2w",
        "To see if there's any problem while executing your action."
      ),
      intent: Intent.NONE,
      key: "problems",
    },

*/ // write item for service
    {
      text: Dot("8LvRj", "Service"),
      icon: "signal-search",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot("M9ppT", "Quickly view the status of your services"),
      intent: Intent.NONE,
      id: "service",
    },
  ];
  let isActivated = true;
  let statusBarItemRight: SystemStatusBarItem[] = [
    // show items for version, messages, windows

    {
      text: Dot("wsWcX", "Notifications"),
      icon: "notifications",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "39dCt",
        "You would receive latest notification from app services if have."
      ),
      intent: Intent.NONE,
      id: "messages",
    },
    {
      text: `${Dot("2Ocby", "Version")}: ${APPINFOJSON.version}(${
        isActivated ? Dot("fmYND", "Activated") : Dot("sEplO", "Unactivated")
      })`,
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "Ey856",
        "We're not done yet - we're dedicated to providing the latest and greatest features, and we'll keep releasing updates to make sure you have the best experience possible. "
      ),
      intent: isActivated ? Intent.PRIMARY : Intent.WARNING,
      id: "version",
    },
    /*
    {
      text: Dot("tBIX-", "Windows"),
      icon: "grid-view",
      onClick: () => {},
      active: false,
      disabled: false,
      tooltip: Dot(
        "sO0MO",
        "Every time you stay in a window more than 5 seconds, it would be shown here."
      ),
      intent: Intent.NONE,
      key: "windows",
    },
   */
  ];

  return (
    <div className="systemstatus-wrapper">
      {/** show two div space-between layout in flex */}
      <div className="systemstatus-left">
        {statusBarItemLeft.map((item) => {
          return <SystemStatusBarItemElement {...item} />;
        })}
      </div>
      <div className="systemstatus-right">
        <SystemStatusBarItemElement
          onClick={() => {
            //
          }}
          text={
            Dot("BWbpT", "Reading the file from disk...") ||
            Dot("ZWDgz", "No Available Message")
          }
          id={""}
          active={false}
          disabled={false}
          tooltip={Dot("ib5dq", "Your Status Message will be displayed here")}
          intent={"none"}
        />
        {statusBarItemRight.map((item) => {
          return <SystemStatusBarItemElement {...item} />;
        })}
      </div>
    </div>
  );
};

export default SystemStatusBar;
