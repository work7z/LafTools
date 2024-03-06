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
import _ from 'lodash'
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
import exportUtils from "../../utils/ExportUtils";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { javascript, jsxLanguage } from "@codemirror/lang-javascript";
import { FN_GetDispatch } from "../../nocycle";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY } from "../../actions/bigtext_action";
import { go } from '@codemirror/legacy-modes/mode/go';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { json, jsonld } from '@codemirror/legacy-modes/mode/javascript';
import { css, sCSS, less } from '@codemirror/legacy-modes/mode/css';
import { html } from '@codemirror/legacy-modes/mode/xml';
import { python } from '@codemirror/legacy-modes/mode/python';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
// import { sql } from '@codemirror/legacy-modes/mode/sql';
import { xml } from '@codemirror/legacy-modes/mode/xml';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { c, cpp, csharp } from '@codemirror/legacy-modes/mode/clike';

import { StreamLanguage } from '@codemirror/language';


import { EditorView } from "codemirror"
import { useTheme } from "next-themes";
// import { langs, langNames, loadLanguage } from '@uiw/codemirror-extensions-langs';
// console.log('langNames', langs.mysql())

type GenCodeMirrorProp = {
  bigTextId: string;
  lineWrap?: boolean;
  language?: string;
  directValue?: string;
  placeholder?: string;
  onTextChange?: (newText: string) => any
};
const langMap = {
  javascript: () => javascript({ jsx: true }),
  shell: () => StreamLanguage.define(shell),
  css: () => StreamLanguage.define(css),
  html: () => StreamLanguage.define(html),
  json: () => StreamLanguage.define(json),
  jsonld: () => StreamLanguage.define(jsonld),
  python: () => StreamLanguage.define(python),
  ruby: () => StreamLanguage.define(ruby),
  xml: () => StreamLanguage.define(xml),
  yaml: () => StreamLanguage.define(yaml),
  c: () => StreamLanguage.define(c),
  cpp: () => StreamLanguage.define(cpp),
  csharp: () => StreamLanguage.define(csharp),
  go: () => StreamLanguage.define(go),
}
export let useForgeObj = () => {
  let { theme } = useTheme()
  let forgeObj = {
    dark: theme === "dark"
  }
  return forgeObj
}
export default (props: GenCodeMirrorProp) => {
  let forgeObj = useForgeObj()
  // exportUtils.useSelector((val) => ({
  //   dark: val.forge.DarkThemeMode,
  // }));
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
    if (!_.isNil(m?.internalValue)) {
      finalText = m?.internalValue || '';
    }
    return {
      bigText: finalText,
    };
  });


  let bt = useMemo(() => {
    return bt_raw;
  }, [verObj.ver]);
  let propRef = React.useRef<{
    fn_onTextChange?: (newText: string) => any
  }>({
    fn_onTextChange: props.onTextChange
  })
  useEffect(() => {
    propRef.current.fn_onTextChange = props.onTextChange
  }, [props.onTextChange])
  useEffect(() => {
    if (verObj.ver != 1) {
      let actualText = FN_GetActualTextValueByBigTextId(bigTextId)
      console.log("onTextChange :", bt.bigText, bt_raw)
      propRef.current.fn_onTextChange && propRef.current.fn_onTextChange(actualText)
    }
  }, [verObj.ver])
  let value: string = props.directValue || bt.bigText;
  let setValue = (val: string) => {
    // debugger;
    FN_GetDispatch()(FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY(bigTextId, val));
  };
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
    propRef.current.fn_onTextChange && propRef.current.fn_onTextChange(val)
  }, []);
  let langPack = props.language && langMap[props.language] ? (langMap[props.language])() : null
  return (
    <CodeMirror
      key={verObj.ver}
      onChange={(val) => {
        onChange(val, true);
      }}
      placeholder={props.placeholder}
      minHeight="100%"
      style={{
        height: "100%",
      }}
      height="100%"
      value={value}
      basicSetup={{
        foldGutter: true,
        highlightActiveLineGutter: true
      }}
      extensions={[
        langPack,
        props.lineWrap ? EditorView.lineWrapping : null
      ].filter(x => x != null) as any}
      theme={forgeObj.dark ? githubDark : githubLight}
    />
  );
};
