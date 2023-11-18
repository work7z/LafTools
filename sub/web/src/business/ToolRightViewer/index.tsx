// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 3 Oct 2023
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

import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import ExtensionSingleView from "../ExtensionSingleView";
import { PassToolViewerProp } from "../../pages/FixedWorkBench/definitions/WB_Types";

type PassProp = PassToolViewerProp;

export default (props: PassProp): any => {
  const param = useParams() as ToolParamType;
  let toolParam = param;
  if (_.isNil(props.findCurrentPureItem)) {
    return (
      <NonIdealState
        icon="warning-sign"
        title={Dot(
          "UU_7h",
          "Please click any category item on the left first menu, the current category is empty or invalid."
        )}
      ></NonIdealState>
    );
  }
  if (_.isNil(param.extId)) {
    return (
      <NonIdealState
        icon="warning-sign"
        title={Dot(
          "9a335",
          "Please click any extension item on the left first menu, the current one is empty or invalid."
        )}
      ></NonIdealState>
    );
  }

  return (
    <div className="w100 h100">
      <ExtensionSingleView extId={toolParam.extId + ""} />
    </div>
  );
};
