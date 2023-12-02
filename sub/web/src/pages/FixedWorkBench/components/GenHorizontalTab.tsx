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
import $ from "jquery";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";

import _ from "lodash";
import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
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
  //
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
  let fn_handleClickEachTab = (tab: EachTab) => () => {
    setActiveTab(tab.id);
  };
  let [eleId_tab] = useState(_.uniqueId(""));
  let [eleId_subTab] = useState(_.uniqueId(""));
  let [eleId_controlBar] = useState(_.uniqueId(""));
  let fn_format_each_tab = (verticalMode = false) => {
    return (tab, tabIdx, tabList) => {
      let isCurrent = activeTab === tab.id;
      return (
        <div
          key={tab.id}
          onClick={fn_handleClickEachTab(tab)}
          style={{}}
          data-active={isCurrent ? "t" : "f"}
          data-tabid={tab.id}
          {...(!verticalMode && tabIdx == _.size(tabList) - 1
            ? {
                id: eleId_subTab + "-last",
              }
            : {})}
          className={` ${
            verticalMode ? "" : " h-each-tab "
          } each-tab  hover:bg-gray-300  whitespace-nowrap  flex h-full hover:cursor-default text-xs select-none items-center ml-0 py-1  last:border-r-[1px] dark:border-r-gray-600 last:border-r-gray-300 px-1  ${
            isCurrent
              ? "border-b-light-blue-600 dark:text-slate-700 border-b-[3px] bg-white hover:bg-white dark:text-white dark:bg-gray-500  dark:hover:bg-gray-500  "
              : " dark:hover:bg-gray-600 "
          } ${
            verticalMode && isCurrent
              ? ` border-t-light-blue-600 border-t-[3px] `
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
              "small-close-btn ml-1  " + ` ${isCurrent ? "gen-active" : ""} `
            }
          ></Icon>
          {/* <XIcon className="h-5 w-5 text-gray-500" /> */}
        </div>
      );
    };
  };
  let PanelThatNotShown = useMemo(() => {
    return ({ fn_format_each_tab }) => {
      let allHiddenTabs = useMemo(() => {
        let parentELE = $("#" + eleId_tab);
        let parentRect = parentELE[0].getBoundingClientRect();
        let allSubTabs = parentELE.find(".each-tab");
        // check all tabs that are not shown (meaning that it not visible in the width and height of parent element eleId_tab)
        let allHiddenTabs = allSubTabs.filter((i, each) => {
          let childRect = each.getBoundingClientRect();
          let isCrt = $(each).data("active") == "t";
          // check if childRect.x + childRect.width, and childRect.y + childRect.height inside parentRect
          let isInsideX =
            childRect.x + childRect.width > parentRect.x &&
            childRect.x < parentRect.x + parentRect.width;
          return !isInsideX && !isCrt;
        });
        return allHiddenTabs;
      }, []);
      // record current scroll position
      let [scrollPosition, setScrollPosition] = useState(0);
      // TODO: add search bar here
      return (
        <div
          className={`${commonBG} scroll overflow-y-auto overflow-x-hidden `}
          style={{
            maxHeight: "300px",
            // minWidth: "300px",
          }}
          ref={(e) => {}}
          onScroll={(x) => {}}
        >
          {/*
          <InputGroup
            placeholder={Dot("hhOT3", "Search by Name")}
            small
            autoFocus
          ></InputGroup> */}
          {allHiddenTabs.map((idx, x) => {
            // get current tab by $(x).data("tabid")
            let tabId = $(x).data("tabid");
            let currentTab = tabs.find((x) => x.id == tabId);
            return (
              <div key={idx}>{fn_format_each_tab(true, idx)(currentTab)}</div>
            );
          })}
        </div>
      );
    };
  }, []);
  let [crtTranslateX, onCrtTranslateX] = useState<number>(0);
  let [p_width, onPWidth] = useState(0);
  let [subP_width, onSubPWidth] = useState(0);
  let moveStep = 80;
  let allSubChildrenWidth = useMemo(() => {
    var totalWidth = 0;
    $("#" + eleId_subTab)
      .children()
      .each(function (idx, ele) {
        if (ele) {
          totalWidth += ele.getBoundingClientRect().width;
        }
      });
    return totalWidth;
  }, [p_width, subP_width, eleId_subTab, eleId_tab]);
  let shouldShowLeftRight = p_width > 0 && p_width < allSubChildrenWidth;

  let isItReachedToRightLimit = useMemo(() => {
    let $controlBar = $("#" + eleId_controlBar);
    if ($controlBar.length != 0) {
      let ctlX = $controlBar[0].getBoundingClientRect().x;

      // let $subLastTab = $("#" + eleId_subTab + "-last");
      // if ($subLastTab.length != 0) {
      // let rect2 = $subLastTab[0].getBoundingClientRect();
      // let lastTabX = rect2.x + rect2.width;
      // debugger;
      // return lastTabX > ctlX;
      // }
    } else {
      return false;
    }
  }, [allSubChildrenWidth, shouldShowLeftRight, crtTranslateX]);

  return (
    <div
      style={{
        height: VAL_CSS_TAB_TITLE_PANEL,
      }}
      id={eleId_tab}
      ref={(e) => {
        let rect = e?.getBoundingClientRect();
        rect && onPWidth(rect?.width);
      }}
      className={`w-full h-full relative border-b-2    border-b-gray-300 dark:border-b-gray-600  ${commonBG} `}
    >
      <div
        className={` flex space-x-0 h-full   w-full  `}
        style={{
          overflowX: "hidden",
          transform: "translateX(" + crtTranslateX + "px)",
        }}
        id={eleId_subTab}
        ref={(e) => {
          let rect = e?.getBoundingClientRect();
          rect && onSubPWidth(rect?.width);
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
        {tabs.map(fn_format_each_tab(false))}
      </div>
      <div
        id={eleId_controlBar}
        className={` absolute  right-0 top-0 h-full px-2  common-border-left pr-1 ${commonBG}`}
        style={
          {
            // paddingLeft: '0'
          }
        }
      >
        <ButtonGroup>
          {[
            ...(shouldShowLeftRight
              ? [
                  {
                    small: true,
                    icon: "chevron-left",
                    tooltip: Dot("sdfk1", "Scroll tabs to left"),
                    disabled: crtTranslateX == 0,
                    onClick: () => {
                      onCrtTranslateX(crtTranslateX + moveStep);
                    },
                  },
                  {
                    small: true,
                    icon: "chevron-right",
                    disabled: isItReachedToRightLimit,
                    tooltip: Dot("sdfk13", "Scroll tabs to right"),
                    onClick: () => {
                      onCrtTranslateX(crtTranslateX - moveStep);
                    },
                  },
                ]
              : []),
            {
              small: true,
              icon: "chevron-down",
              tooltip: Dot("R12bq", "List tabs that are not shown"),
              panel: (
                <PanelThatNotShown fn_format_each_tab={fn_format_each_tab} />
              ),
            },
            {
              small: true,
              icon: "more",
              tooltip: Dot("G9QVo", "Manage Tabs"),
              panel: (
                <div>
                  <Menu small>
                    {/* <MenuItem icon="add" text="Add Tab" /> */}
                    {/* <MenuItem icon="edit" text="Edit Tab" /> */}
                    {/* <MenuItem icon="trash" text="Delete Tab" /> */}
                    <MenuItem
                      // icon="menu-closed"
                      text={Dot("ZrbuC", "Close Tab")}
                    />
                    <MenuItem
                      // icon="collapse-all"
                      text={Dot("ZrbduC", "Close All Tabs")}
                    />
                    {/* <MenuDivider /> */}
                    {/* <MenuItem icon="import" text="Import" /> */}
                    {/* <MenuItem icon="export" text="Export" /> */}
                    {/* <MenuDivider /> */}
                    {/* <MenuItem
                      // icon="cog"
                      text={Dot("lpKAz", "Settings")}
                      disabled
                    /> */}
                  </Menu>
                </div>
              ),
            },
          ].map((x) => {
            return (
              <Popover
                key={x.icon}
                placement="bottom-end"
                minimal
                content={x.panel}
              >
                <Tooltip content={x.tooltip} placement="bottom">
                  <Button
                    {...(x as any)}
                    disabled={x.disabled}
                    minimal
                    className=" h-[28px] w-[28px] "
                    key={x.icon}
                  ></Button>
                </Tooltip>
              </Popover>
            );
          })}
        </ButtonGroup>
      </div>
    </div>
  );
};

// border-b-gray-300 border-b-[1px]
