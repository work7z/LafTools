// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 18 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
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
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./index.scss";
import { Dot } from "../../utils/TranslationUtils";
import AlertUtils from "../../utils/AlertUtils";

interface PassProp {
  onNewNameProvided: (str: string) => any
}
export default (props: PassProp): any => {
  let { onNewNameProvided } = props;
  // state, isNewMode 
  let [newMode, onNewMode] = useState<boolean>(false)
  let [tagName, onTagName] = useState<string>(Dot("7x3f6", "Tab - 1"))
  let edgeClz = " mt-2 "
  if (newMode) {
    let fn_confirm = () => {
      if (tagName.length == 0) {
        AlertUtils.popError(new Error(Dot("Vaf2y", "Tab name could not be blank.")))
        return
      }
      onNewMode(false)
      onNewNameProvided(tagName)
    }
    let fn_cancel = () => {
      onNewMode(false)
    }
    return <div>
      <InputGroup
        value={tagName}
        onChange={(e) => {
          onTagName(e.target.value)
        }}
        small
        onKeyDown={e => {
          // when e == enter
          if (e.keyCode == 13) {
            fn_confirm()
          }
          // when e == ese
          if (e.keyCode == 27) {
            fn_cancel()
          }
        }}
        className={edgeClz + " "}
        rightElement={<ButtonGroup className="flex absolute right-0 top-0">
          <Button small icon="small-tick"
            onClick={fn_confirm}
          ></Button>
          <Button small icon="small-cross" onClick={fn_cancel}></Button>
        </ButtonGroup>}
        // fill 
        placeholder={Dot("FDlRI", "Name this new tab and click to confirm it.")}></InputGroup>
    </div>
  }
  return <Button fill text={Dot("bT4R6", "New Tab")} onClick={() => {
    onNewMode(true)
  }} intent="none" icon="add" small minimal className={edgeClz + " laft-secondary-btn"}>
  </Button>
};
