// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 26 Nov 2023
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
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  EachWorkSpace,
  VAL_CSS_MENU_TITLE_PANEL,
  VAL_CSS_TAB_TITLE_PANEL,
} from "../../FixedWorkBench/definitions/WB_Types";
import { Dot } from "../../../utils/TranslationUtils";
import { Link } from "react-router-dom";
import { useState } from "react";

let WorkSpaceListItem = (props: { item: EachWorkSpace }) => {
  let [hover, setHover] = useState(false);
  let x = props.item;
  return (
    <Tooltip
      className="block w-full"
      content={Dot("mWXeh", "Workspace ID: {0}", x.Id)}
      placement="right"
    >
      <Link
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        className="mt-1 w-full relative hover:text-black p-2  px-3 flex no-underline hover:no-underline text-black hover:bg-blue-200 hover:bg-opacity-20"
        to={"/workbench/" + x.Id}
        style={{
          flexDirection: "column",
        }}
      >
        <div className="">{x.Label}</div>
        <div className="text-stone-400">{x.Path}</div>
        <div
          className={
            "align-end absolute right-[5px] top-[27%]  " +
            (false && !hover ? " hidden " : "")
          }
        >
          <Button icon="cog" small intent="none" minimal></Button>
        </div>
      </Link>
    </Tooltip>
  );
};

export default () => {
  // here we provide setup list UI, that first row is a input field, second row is manage controls(New, Refresh), remain part is a list that includes all workspace
  let allWorkspaces: EachWorkSpace[] = [
    {
      Id: "default",
      Label: "testdir",
      Path: "/users/jerrylai/testdir",
    },
    {
      Id: "mkdi310",
      Label: "dkk3",
      Path: "/users/jerrylai/.mincontent/1kd/dkk3",
    },
  ];
  let entryJSX = (
    <div
      className="flex flex-col  mt-10  w-[500px] using-edge-ui-bg border-gray-300  border-[1px] shadow-lg shadow-gray-300 rounded self-start px-2 py-2"
      style={{
        minHeight: "400px",
      }}
    >
      <div className="mb-4 text-center ">
        <b>{Dot("eYjWI", "Workspace List")}</b>
      </div>
      <div>
        <InputGroup
          leftIcon="search"
          className="flex flex-row items-center bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500"
          type="text"
          small
          placeholder={Dot("SMD13", "Filter Workspaces")}
          rightElement={
            <ButtonGroup>
              <Tooltip
                placement="bottom"
                content={Dot("adpgq", "Create new workspace")}
              >
                <Button
                  className="mr-2"
                  icon="add"
                  text={Dot("ImUmf", "New")}
                  intent={Intent.PRIMARY}
                  small
                  onClick={() => {
                    // open a dialog to create a new workspace
                  }}
                />
              </Tooltip>
              <Tooltip
                placement="bottom"
                content={Dot("dV5Eq", "Refresh workspace list")}
              >
                <Button
                  icon="refresh"
                  text={Dot("5dF7o", "Refresh")}
                  small
                  intent={Intent.SUCCESS}
                  onClick={() => {
                    // refresh workspace list
                  }}
                />
              </Tooltip>
            </ButtonGroup>
          }
        />
      </div>
      <div className="mt-2">
        <div>
          {allWorkspaces.map((x) => {
            return <WorkSpaceListItem key={x.Id} item={x} />;
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className=" common-bg-color-align flex justify-center content-start align-top "
      style={{
        height: `calc(100vh - ${VAL_CSS_MENU_TITLE_PANEL}px)`,
      }}
    >
      {entryJSX}
    </div>
  );
};
