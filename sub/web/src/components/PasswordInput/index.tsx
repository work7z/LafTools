// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
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
  InputGroupProps,
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
import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import { Dot } from "../../utils/TranslationUtils";

interface PasswordInputProps {
  strong?: boolean;
}
export default (props: PasswordInputProps & InputGroupProps): any => {
  const [showPassword, onShowPassword] = useState(false);
  let [tmpValue, onTmpValue] = useState(props.value);
  const warnMsg = useMemo(() => {
    let password = tmpValue;
    if (_.isNil(password)) {
      return "";
    }
    if (password == "" || password.length < 6) {
      return Dot("MN2lT", "The length of Password cannot less than 6");
    }
    if (!password.match(/[\d\W]/g) || !password.match(/[a-z]/g)) {
      return Dot(
        "RObhX",
        `Password cannot be simple, please include number, alphbet or symbol`
      );
    }
    return "";
  }, [tmpValue]);

  const lockButton = (
    <Button
      small={props.small}
      icon={showPassword ? "unlock" : "lock"}
      intent={
        props.strong && !_.isEmpty(warnMsg) ? Intent.WARNING : Intent.SUCCESS
      }
      minimal={true}
      onClick={() => {
        onShowPassword(showPassword ? false : true);
      }}
    />
  );
  return (
    <div>
      <InputGroup
        {...props}
        type={
          (props.type == "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type) || "text"
        }
        rightElement={
          props.type == "password" ? lockButton : props.rightElement
        }
        onChange={(e) => {
          if (!_.isNil(e)) {
            onTmpValue(e.target.value);
          }
          if (props.onChange) {
            props.onChange(e);
          }
        }}
      />
      {props.strong && !_.isEmpty(warnMsg) ? <p>{warnMsg}</p> : ""}
    </div>
  );
};
