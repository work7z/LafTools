// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 14 Nov 2023
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
} from "../../../../../styles/path";
import { type } from "jquery";
import apiSlice from "../../../../../reducers/apiSlice";
import { SysTabPane } from "./SysTabPane";
import {
  FixedMenuItem,
  VAL_CSS_MENU_TITLE_PANEL,
} from "../definitions/WB_Types";

export let RegularMenu = (props: {
  childrenNodes: FixedMenuItem[] | undefined;
  clzName: string;
}) => {
  let fn_formatChildren = (childrenNodes: FixedMenuItem[] | undefined): any => {
    return _.map(childrenNodes, (x) => {
      if (x.spliter) {
        return <MenuDivider />;
      }
      return (
        <MenuItem
          icon={(x.icon || undefined) as any}
          onClick={() => {
            //
          }}
          text={x.label}
        >
          {!_.isEmpty(x.children) ? fn_formatChildren(x.children) : null}
        </MenuItem>
      );
    });
  };
  return (
    <Menu className={props.clzName}>
      {fn_formatChildren(props.childrenNodes)}
    </Menu>
  );
};
