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
  TreeNodeInfo,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, delayFN } from "../../../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../../../../utils/LogUtils";
import _ from "lodash";

import statusSlice from "../../../../../../../../../reducers/statusSlice";
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
import PageUtils from "../../../../../../../../../utils/PageUtils";
import TranslationUtils, {
  Dot,
} from "../../../../../../../../../utils/cTranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";


import { type } from "jquery";
import apiSlice from "../../../../../../../../../reducers/apiSlice";

import FunctionalMenu_Panel from "..";

export let InnerFilePanel = (): any => {
  return (
    <FunctionalMenu_Panel
      loading={false}
      crtLeftNavId="all"
      leftNavList={[
        {
          label: Dot("TyqvWY3", "Local File"),
          value: "all",
        },
      ]}
      children={<div>THIS IS LOCAL FILE2</div>} onPopClose={function (): void {
        throw new Error("Function not implemented.");
      }} onPopRedirectPage={function (x: TreeNodeInfo<{}>, newTab: boolean) {
        throw new Error("Function not implemented.");
      }}    ></FunctionalMenu_Panel>
  );
};
