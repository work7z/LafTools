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
  Popover,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/TranslationUtils";
import { useParams } from "react-router";
import { ToolParamType } from "../../types/constants";
import mottoList from "../../config/motto";

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, "g"), replace);
}

interface BlinkProp {
  singleLineMode?: boolean
}
export default (props: BlinkProp): any => {
  let singleLineMode = props.singleLineMode
  let mottoLine: string | JSX.Element = mottoList[_.random(0, mottoList.length - 1)]()
  let p_mottoLine = mottoLine;
  if (singleLineMode) {
    return <div>{p_mottoLine}</div>
  }
  if (mottoLine) {
    mottoLine = replaceAll(mottoLine, "--", "-");
    mottoLine = replaceAll(mottoLine, "——", "-");
    let idx = _.lastIndexOf(mottoLine, "-");
    if (idx != -1) {
      mottoLine = (
        <span>
          <div
            style={{
              textAlign: "left",
            }}
          >
            "{mottoLine.substring(0, idx).trim()}"
          </div>
          <div className="mt-1" style={{ textAlign: "right" }}>
            -- {mottoLine.substring(idx + 2).trim()}
          </div>
        </span>
      );
      // mottoLine = (
      //   <div
      //     style={{
      //       // display: "flex",
      //       // justifyContent: "space-between",
      //       // flexWrap: "wrap",
      //       display: "grid",
      //       gridTemplateColumns: "1fr 1fr",
      //       gap: "10px",
      //     }}
      //   >
      //     {/* <div>"{mottoLine.substring(0, idx).trim()}"</div>
      //     <div>-- {mottoLine.substring(idx + 2).trim()}</div> */}
      //     <div style={{ textAlign: "left" }}>
      //       "{mottoLine.substring(0, idx).trim()}"
      //     </div>
      //     <div style={{ textAlign: "right" }}>
      //       -- {mottoLine.substring(idx + 2).trim()}
      //     </div>
      //   </div>
      // );
    }
  }
  return (
    <div
      style={{
        // textAlign: "center",
        // padding: "10px 6px",
        margin: "0 auto",
        whiteSpace: "break-spaces",
        width: "100%",
        // minWidth: "230px",
        fontSize: "11px",
      }}
      className="py-2 px-2 whitespace-break-spaces overflow-hidden bp5-text-muted bp5-text-small  h-full   "
    // title={mottoLine}
    // onDoubleClick={() => {
    // mottoLineRes.refetch();
    // }}
    >
      {mottoLine}
    </div>
  );
};
