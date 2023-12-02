// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 8 Oct 2023
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
import gutils from "../../utils/GlobalUtils";
import "./index.scss";
import { Dot } from "../../utils/TranslationUtils";
import { useHistory } from "react-router";
import { useEffect } from "react";

export default () => {
  // router redirect to /workbench/tools in the useEffect code
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/workbench");
    }, 1000);
  }, []);

  return (
    <div className="entry-wrapper">
      {Dot("OrCt5", "Redirecting to the workbench...")}
    </div>
  );
  // return (
  //   <div className="entry">
  //     <div className="entry__body">
  //       <div className="entry__icon">
  //         <img src={gutils.getStaticPath("/icon.png")} />
  //       </div>
  //       <div className="entry__title">
  //         {Dot("iDsRh", "Preparing for your LafTools")}
  //       </div>
  //       <div className="entry__subtitle">Please wait for a moment</div>
  //       <div className="entry__progress">
  //         <ProgressBar intent={Intent.PRIMARY} />
  //       </div>
  //     </div>
  //   </div>
  // );
};
