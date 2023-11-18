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
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../styles/var";
import { Dot } from "../../utils/TranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice from "../../slice/apiSlice";
import { URL_WORKBENCH_TOOLS } from "../../styles/path";
import { Link } from "react-router-dom";
import URLUtils from "../../utils/URLUtils";
import { FnPureToolDefinition } from "../../pages/FixedWorkBench/common/WB_Types";

type PassProp = {
  allPureMenuArr: FnPureToolDefinition[];
  findCurrentPureItem: FnPureToolDefinition | null;
};

export default (props: PassProp): any => {
  let dis = exportUtils.dispatch();
  let toolParam = useParams() as ToolParamType;
  let allPureMenuArr = props.allPureMenuArr;

  if (props.findCurrentPureItem == null) {
    return <div>loading...</div>;
  }

  return (
    <ul className="app-nav-menu">
      {allPureMenuArr.map((x, d, n) => {
        let isActive = toolParam.category == x.id;
        return (
          <Link
            to={URL_WORKBENCH_TOOLS + "/" + x.id}
            className={isActive ? "active-tool-item" : ""}
            key={x.id}
          >
            {x.label}
          </Link>
        );
      })}
    </ul>
  );
};
