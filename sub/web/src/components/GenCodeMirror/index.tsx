// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 16 Nov 2023
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
  TreeNode,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from 'codemirror';
import exportUtils from "../../utils/ExportUtils";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { FN_GetDispatch } from "../../nocycle";
import { FN_SetTextValueFromInsideByBigTextId } from "../../sliceAction/bigtext_action";

// import darcula from "@uiw/codemirror-theme-darcula";
type GenCodeMirrorProp = {
  bigTextId: string;
  lineWrap?: boolean;
  onTextChange?:(newText?:string)=>any
};

export default (props: GenCodeMirrorProp) => {
  let forgeObj = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
  }));
  let bigTextId = props.bigTextId;
  let mRef = useRef({
    renderCtn: 0,
    lastSelectResult: null,
  });
  mRef.current.renderCtn++;
  let verObj = exportUtils.useSelector((val) => {
    let valueVer = val.bigtext.textKVStatusMap[bigTextId]?.outsideUpdateVer;
    if (_.isNil(valueVer)) {
      valueVer = 1;
    }
    return {
      ver: valueVer,
    };
  });
  let bt_raw = exportUtils.useSelector((val) => {
    let crt = mRef.current;
    let m = val.bigtext.textKVStatusMap[bigTextId];
    let finalText = m?.value || "";
    if (m?.internalValue) {
      finalText = m?.internalValue;
    }
    return {
      bigText: finalText,
    };
  });
  let bt = useMemo(() => {
    return bt_raw;
  }, [verObj.ver]);
  let value: string = bt.bigText;
  let setValue = (val: string) => {
    FN_GetDispatch()(FN_SetTextValueFromInsideByBigTextId(bigTextId, val));
  };
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
    props.onTextChange && props.onTextChange(val)
  }, []);
  console.log("rendering", value, verObj.ver);
  return (
    <CodeMirror
      key={verObj.ver}
      onChange={(val) => {
        onChange(val, true);
      }}
      minHeight="100%"
      style={{
        height: "100%",
      }}
      height="100%"
      value={value}
      extensions={[
        javascript({ jsx: true }),
        props.lineWrap ? EditorView.lineWrapping : null
        // EditorState.readOnly.of(true)
      ].filter(x => x) as any}
      theme={forgeObj.dark ? githubDark : githubLight}

    // theme={"dark"}
    />
  );
};
