// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 17 Nov 2023
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
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";

import _ from "lodash";
import { useState, useContext, useCallback, useRef } from "react";
import "allotment/dist/style.css";
import { VAL_CSS_TAB_TITLE_PANEL } from "../definitions/WB_Types";
import { Dot } from "../../../utils/TranslationUtils";

export type EachTab = {
  id: string;
  label: string;
  icon: string;
};

type PassProp = {
  //
  tabs?: EachTab[];
};

export default () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs: EachTab[] = [];
  // mock data for tabs
  let [moveLeftDistance, onMoveLeftDistance] = useState(0);
  for (let i = 0; i < 100; i++) {
    tabs.push({
      id: "tab" + i,
      label: "tab" + i + "-" + moveLeftDistance,
      icon: "database",
    });
  }
  let commonBG = " using-edge-ui-bg ";
  return (
    <div
      style={{
        height: VAL_CSS_TAB_TITLE_PANEL,
      }}
      className={`w-full h-full relative border-b-2    border-b-gray-300 dark:border-b-gray-600  ${commonBG} `}
    >
      <div
        className={` flex space-x-0 h-full   w-full  `}
        style={{
          overflowX: "auto",
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For Internet Explorer and Edge */,
        }}
        // on mouse scroll
        onWheel={(e) => {
          // e.preventDefault();
          // let newMoveLeftDistance = moveLeftDistance + e.deltaY;
          // if (newMoveLeftDistance < 0) {
          //   newMoveLeftDistance = 0;
          // }
          // onMoveLeftDistance(newMoveLeftDistance);
        }}
      >
        {tabs.map((tab) => {
          let isCurrent = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{}}
              className={`  hover:bg-gray-300  whitespace-nowrap  flex h-full hover:cursor-default text-xs select-none items-center ml-0 py-1  last:border-r-[1px] dark:border-r-gray-600 last:border-r-gray-300 px-1  ${
                isCurrent
                  ? "border-b-light-blue-600 dark:text-slate-700 border-b-[3px] "
                  : " dark:hover:bg-gray-600 "
              }  ${
                isCurrent
                  ? "  bg-white hover:bg-white dark:text-white dark:bg-gray-600 dark:hover:bg-gray-600 "
                  : ""
              }`}
            >
              <Icon
                icon={tab.icon as any}
                className={`h-5 w-5 !inline-flex items-center justify-center ${
                  isCurrent ? "blue-svg" : "gray-svg"
                }  `}
              ></Icon>
              <span>{tab.label}</span>
              <Icon
                icon="cross"
                className={
                  "small-close-btn ml-1  " +
                  ` ${isCurrent ? "gen-active" : ""} `
                }
              ></Icon>
              {/* <XIcon className="h-5 w-5 text-gray-500" /> */}
            </div>
          );
        })}
      </div>
      <div className={` absolute  right-0 top-0 h-full px-2 pr-1 ${commonBG}`}>
        <ButtonGroup>
          {[
            {
              small: true,
              icon: "chevron-down",
              tooltip: Dot("R12bq", "List tabs that are not shown"),
            },
            {
              small: true,
              icon: "more",
              tooltip: Dot("G9QVo", "Manage Tabs"),
            },
          ].map((x) => {
            return (
              <Tooltip content={x.tooltip} placement="bottom">
                <Button
                  {...(x as any)}
                  minimal
                  className=" h-[28px] w-[28px] "
                  key={x.icon}
                ></Button>
              </Tooltip>
            );
          })}
        </ButtonGroup>
      </div>
    </div>
  );
};

// border-b-gray-300 border-b-[1px]
