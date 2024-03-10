// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 25 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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
import { WB_MenuBar } from "../Main/Menu";
import { Dot } from "../../../../utils/cTranslationUtils";
import MainPreSetup from "./Setup";

export default () => {
  return (
    <div
      className="fixed-wb-p  3 "
      style={{
        overflow: "hidden",
      }}
    >
      <WB_MenuBar
        leftPart={
          <div
            className="inline-flex h-full absolute left-[50%]"
            style={{
              transform: "translateX(-50%)",
            }}
          >
            {/* - Empowering Your Creativity */}
            {/* {Dotxx("nJAX6", "Welcome to {0}", Dot("CVUl0", "LafTools"))} */}
            {Dot("XQxJB", "My Workspaces")}
          </div>
        }
      />
      <MainPreSetup></MainPreSetup>
    </div>
  );
};
