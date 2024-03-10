// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 18 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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
import { CommonTransformerPassProp as CommonTransformerPassProp } from "../../types/workbench-types";
import { Dot } from "../../utils/cTranslationUtils";

interface PassProp { }

let UnknownPart = (props: CommonTransformerPassProp & { reason?: string }) => {
  return <div className="p-5"><h1>{props.reason}</h1><br /> {Dot("RPVRl", "It appears that this extension is not compatible with the current version of LafTools. Please consider installing the latest version to support this extension, or feel free to contact us by raising an issue on GitHub.")}</div>
}
export default UnknownPart
