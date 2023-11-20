// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 21 Oct 2023
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
import gutils from "../../utils/GlobalUtils";

interface PassProp {
  className: string;
  children: any;
}
export default (props: PassProp): any => {
  const [draging, onDrag] = useState(false);
  return (
    <div
      className={[
        props.className,
        draging && false ? " g-drag-wrap " : "",
      ].join(" ")}
      draggable
      onDragEnter={(e) => {
        onDrag(true);
      }}
      onDrop={(e) => {
        onDrag(true);
        e.preventDefault();
        // get files and alert first file name
        gutils.ExposureIt("ondrag_e", e, true);
        console.log(e.dataTransfer.files[0].name);
        alert(e.dataTransfer.files[0].name);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onMouseEnter={(e) => {}}
      onMouseLeave={(e) => {
        if (draging) {
          onDrag(false);
        }
      }}
      style={{
        position: "relative",
      }}
    >
      {draging ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#00a496",
            position: "absolute",
            opacity: 0.1,
          }}
        ></div>
      ) : (
        ""
      )}

      {props.children}
    </div>
  );
};
