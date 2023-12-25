// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 24 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
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
import {
  APPINFOJSON,
  FN_GetDispatch,
  delayFN,
} from "../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../utils/GlobalUtils";
import _ from "lodash";
import { SysTabPane } from "../../../../../../../components/SysTabPane";
import { FN_ACTION_CloseMenu_ltr } from "../../../../../../../actions/layout_action";
import { useSearchQuery } from "../../../../../../../types/workbench-hook";
import { Dot } from "../../../../../../../utils/TranslationUtils";
// import MultipleSessionLeftView from "../../../containers/MultipleSessionLeftView/index";
import TextTranslator from "./TextTranslator";
import MultipleSessionLeftView from "../../../../../../../containers/MultipleSessionLeftView";


export default () => {
  return (
    <MultipleSessionLeftView
      defaultSessionId="en2zhcn"
      defaultSessionMap={
        {
          "en2zhcn": {
            T_SourceLang:'en',
            T_TargetLang:'zh_CN'
          },
          "zhcn2en": {
            T_SourceLang:'zh_CN',
            T_TargetLang:'en'
          },
        }
      }
      defaultSessionList={
        // TODO: for other languages, provide corresponding config
        [
          {
            label: Dot("QRAdA", "English to Chinese"),
            id: "en2zhcn",
          },
          {
            label: Dot("bVlBN", "Chinese to English"),
            id: "zhcn2en",
          }
        ]
      }
      sessionType="translator" body={TextTranslator}></MultipleSessionLeftView>
  )
} 