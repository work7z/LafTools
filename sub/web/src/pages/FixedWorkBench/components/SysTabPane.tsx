// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 12 Nov 2023
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
  Spinner,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, delayFN } from "../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../utils/GlobalUtils";
import { logutils } from "../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../styles/routeMem";
import statusSlice from "../../../slice/StatusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import PageUtils from "../../../utils/PageUtils";
import TranslationUtils, { Dot } from "../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../slice/ForgeSlice";
import { ACTION_callRefreshAll } from "../../../slice/SystemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
} from "../../../styles/path";
import FixedWorkBenchTool from "../../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../../FixedWorkBenchFiles";

import FixedWorkBenchHistory from "../../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice from "../../../slice/apiSlice";
import { SysTabPaneProp } from "../definitions/WB_Types";
import Blink from "../../../components/Blink";
import { CSS_TEXT_ANCHOR_CSS } from "../../../styles/tw";

export let SysTabPane = (props: {} & SysTabPaneProp) => {
  // let [clickFocus, onClickFocus] = useState<boolean>(false);
  let [refId, onRefId] = useState(_.uniqueId(""));
  let hasMultipleList = _.size(props.leftNavList) != 1;
  let crtObjectIdx = _.chain(props.leftNavList)
    .findIndex((x) => x.value == props.crtLeftNavId)
    .value();
  if (crtObjectIdx == -1) {
    crtObjectIdx = 0;
  }
  let crtObject = props.leftNavList[crtObjectIdx];
  let activeId = crtObject?.value;
  let crtObjLabel: any = crtObject?.label;
  if (props.loading) {
    crtObjLabel = (
      <span>
        Loading
        <Blink max={2} min={5} />
      </span>
    );
  }
  let jsx_btn =
    true || hasMultipleList ? (
      <Button
        small
        className={
          "bp5-popover-dismiss  bp3-popover-dismiss " +
          (!hasMultipleList
            ? "hover:!bg-transparent hover:!cursor-default"
            : "")
        }
        minimal
        icon={(crtObject?.icon + "") as any}
        text={crtObjLabel}
        rightIcon={hasMultipleList ? "caret-down" : undefined}
      ></Button>
    ) : (
      <span className="p-2">{crtObjLabel}</span>
    );

  // const [refId, onRefId] = useState(_.uniqueId(""));
  const [showPop, onShowPop] = useState(false);

  const [focusCrt, onFocusCrt] = useState(false);

  // if the user click out of this container, then set clickFocus as false
  useEffect(() => {
    let fn = (e) => {
      let target = e.target;
      let isInside = false;
      while (target) {
        try {
          if (
            target.className &&
            // target.className.indexOf("sys-tab-pane-wp") > -1
            target.id == refId
          ) {
            isInside = true;
            break;
          }
          target = target.parentNode;
        } catch (e) {
          isInside = true;
          break;
        }
      }
      if (!isInside) {
        onFocusCrt(false);
      } else {
        onFocusCrt(true);
      }
    };
    document.body.addEventListener("click", fn);
    return () => {
      document.body.removeEventListener("click", fn);
    };
  }, []);

  return (
    <div
      className={` ${focusCrt ? ` wp-focus-p ` : ""} ` + "sys-tab-pane-wp"}
      id={refId}
      onClick={() => {}}
    >
      <div className={`${false ? "wp-active" : ""} sys-tab-pane-wp-title`}>
        <div>
          {hasMultipleList ? (
            <Popover
              placement="bottom-start"
              captureDismiss={true}
              minimal
              canEscapeKeyClose
              interactionKind="click"
              shouldReturnFocusOnClose
              // usePortal={false}
              // isOpen={showPop}
              // enforceFocus={false}
              // onOpening={() => {
              //   onShowPop(true);
              // }}
              // onClosing={() => {
              //   onShowPop(false);
              // }}
              content={
                <Menu>
                  {props.leftNavList.map((x) => {
                    let isCrt = x.value == activeId;
                    let menuItem = (
                      <MenuItem
                        key={x.value}
                        text={x.label}
                        onClick={(e) => {
                          // e.stopPropagation();
                          //
                        }}
                        intent={isCrt ? "primary" : "none"}
                      />
                    );
                    // tailwindcss remove anchor style

                    return x.pathname ? (
                      <Link
                        key={x.label}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={CSS_TEXT_ANCHOR_CSS}
                        to={x.pathname}
                      >
                        {menuItem}
                      </Link>
                    ) : (
                      menuItem
                    );
                  })}
                </Menu>
              }
            >
              {jsx_btn}
            </Popover>
          ) : (
            jsx_btn
          )}
        </div>
        <div>{props.rightCtrls}</div>
      </div>
      <div className="sys-tab-pane-wp-body">
        {props.children || "No Child Node"}
      </div>
    </div>
  );
};
