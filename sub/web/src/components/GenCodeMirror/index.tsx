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
import _ from "lodash";
import { Dot } from "../../utils/TranslationUtils";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import {
  MutationState,
  MutationSubState,
  QuerySubState,
} from "@reduxjs/toolkit/dist/query/core/apiState";
import gutils from "../../utils/GlobalUtils";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ContextMenu, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { Example, ExampleProps } from "@blueprintjs/docs-theme";
import { TreeWrapInfo } from "../../styles/var";
import "./index.scss";
import DragElement from "../DragElement";
import CodeMirror from "@uiw/react-codemirror";
import exportUtils from "../../utils/ExportUtils";
// import { darcula } from "@uiw/codemirror-theme-darcula";
// import { aura } from "@uiw/codemirror-theme-aura";
// import { github } from "@uiw/codemirror-theme-github";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { FN_GetDispatch } from "../../nocycle";
import BigTextSlice from "../../slice/BigTextSlice";

// import darcula from "@uiw/codemirror-theme-darcula";
type GenCodeMirrorProp = {
  bigTextId: string;
};

export default (props: GenCodeMirrorProp) => {
  let forgeObj = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
  }));
  let bigTextId = props.bigTextId;
  let verObj = exportUtils.useSelector((val) => {
    let ver: number = val.bigtext.textKVStatusMap[bigTextId]?.outsideUpdateVer;
    if (_.isNil(ver)) {
      ver = 0;
    }
    return {
      ver: 0,
    };
  });
  let bt = exportUtils.useCachedSelector(
    (val) => {
      return {
        bigText: val.bigtext.textKVMap[bigTextId] || "",
      };
    },
    [verObj.ver]
  );
  let value: string = bt.bigText;
  let setValue = (val: string) => {
    FN_GetDispatch()(
      BigTextSlice.actions.updatebigtext({
        key: bigTextId,
        value: val,
      })
    );
  };
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      onChange={(val) => {
        onChange(val, true);
      }}
      minHeight="100%"
      style={{
        height: "100%",
      }}
      height="100%"
      value={value}
      extensions={[javascript({ jsx: true })]}
      theme={forgeObj.dark ? githubDark : githubLight}
      // theme={"dark"}
    />
  );
};
