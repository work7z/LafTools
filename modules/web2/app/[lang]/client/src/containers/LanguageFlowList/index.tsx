// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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
import { CSS_TEXT_ANCHOR_CSS } from "../../types/styles";
import { getFormattedLang } from "../../i18n";
import { useGetI18nLangList } from "../UserAskMultipleDialogs";

interface PassProp { }
export default (props: PassProp): any => {
  let i18n = useGetI18nLangList()
  let splitArr = location.pathname.split("/")
  return <div>
    <div className='bp5-text-muted space-x-2 '>
      {i18n?.map(x => {
        let m = [...splitArr]
        m[2] = getFormattedLang(x.Value)
        return <a className={CSS_TEXT_ANCHOR_CSS} href={m.join("/")}>{x.LabelByLang}</a>
      })}
    </div>
  </div>;
};
