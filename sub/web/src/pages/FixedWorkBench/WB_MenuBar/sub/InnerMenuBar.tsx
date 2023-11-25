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
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, delayFN } from "../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../utils/GlobalUtils";
import { logutils } from "../../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../../styles/routeMem";
import statusSlice from "../../../../slice/StatusSlice";
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
import PageUtils from "../../../../utils/PageUtils";
import TranslationUtils, { Dot } from "../../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../slice/ForgeSlice";
import { ACTION_callRefreshAll } from "../../../../slice/SystemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
  SUB_URL_WORKBENCH_TOOLS_CATEGORY,
  URL_WORKBENCH_FILES,
  URL_WORKBENCH_MANUALS as URL_WORKBENCH_MANUAL,
  URL_WORKBENCH_NOTES,
} from "../../../../styles/path";
import FixedWorkBenchTool from "../../../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../../../FixedWorkBenchFiles";

import FixedWorkBenchHistory from "../../../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../../../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice from "../../../../slice/apiSlice";
import { SysTabPane } from "../../components/SysTabPane";
import {
  FixedMenuBarProp,
  FixedMenuItem,
  VAL_CSS_MENU_TITLE_PANEL,
} from "../../definitions/WB_Types";

export let FixedMenuBar = (props: FixedMenuBarProp) => {
  let [activeId, onActiveId] = useState(null);
  let [refId, onRefId] = useState<string>(_.uniqueId(""));
  let [hasClickAnyButton, onClickAnyButton] = useState<boolean>(false);
  let [currentButton, on_currentButton] = useState<string | null>(null);

  let goToMenuItem = (keyId) => {
    on_currentButton(keyId);
    onClickAnyButton(keyId == null ? false : true);
  };

  // if the user click a location which is not inside current component, then set clickAnyButton as false
  useEffect(() => {
    let fn = (e) => {
      let target = e.target;
      let isInside = false;
      // debugger;
      while (target) {
        try {
          if (
            target.className &&
            (target.className.indexOf("fixed-wb-nav-menu") > -1 ||
              target.className.indexOf("bp5-menu") > -1)
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
        goToMenuItem(null);
      }
    };
    document.body.addEventListener("click", fn);
    return () => {
      document.body.removeEventListener("click", fn);
    };
  }, []);

  let RegularMenu = (props: {
    childrenNodes: FixedMenuItem[] | undefined;
    clzName: string;
  }) => {
    let fn_formatChildren = (
      childrenNodes: FixedMenuItem[] | undefined
    ): any => {
      return _.map(childrenNodes, (x) => {
        if (x.spliter) {
          return <MenuDivider />;
        }
        return (
          <MenuItem
            icon={(x.icon || undefined) as any}
            onClick={() => {
              //
            }}
            text={x.label}
          >
            {!_.isEmpty(x.children) ? fn_formatChildren(x.children) : null}
          </MenuItem>
        );
      });
    };
    return (
      <Menu className={props.clzName}>
        {fn_formatChildren(props.childrenNodes)}
        {/* <MenuItem
          icon="new-text-box"
          onClick={handleClick}
          text="New text box"
        />
        <MenuItem icon="new-object" onClick={handleClick} text="New object" />
        <MenuItem icon="new-link" onClick={handleClick} text="New link" />
        <MenuItem text="Settings..." icon="cog" intent="primary">
          <MenuItem icon="tick" text="Save on edit" />
          <MenuItem icon="blank" text="Compile on edit" />
        </MenuItem> */}
      </Menu>
    );
  };

  let handleClick = () => 1;
  return (
    <div
      id={refId}
      className="fixed-wb-nav-menu"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: props.requiredPageIcon
          ? VAL_CSS_MENU_TITLE_PANEL + 1 + "px"
          : undefined,
      }}
    >
      <div className="focus:outline-none">
        {props.requiredPageIcon ? (
          <Tooltip
            content={Dot(
              "e_8pZ",
              "A versatile toolbox for developers to improve productivity."
            )}
          >
            <img
              className=" rotate-img LafTools-toolbox-img"
              title={Dot("xdqwe", "Welcome to use LafTools!")}
              style={{
                width: VAL_CSS_MENU_TITLE_PANEL + "px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
              src={gutils.getStaticPath("/icon.png")}
            />
          </Tooltip>
        ) : (
          ""
        )}

        {props.leftPart
          ? props.leftPart
          : _.map(props.menus, (x) => {
              return (
                <Popover
                  key={x.id}
                  hasBackdrop={false}
                  transitionDuration={0}
                  minimal
                  interactionKind={
                    hasClickAnyButton ? "hover-target" : "click-target"
                  }
                  isOpen={currentButton == x.id}
                  placement="bottom-start"
                  content={
                    <RegularMenu
                      clzName="nav-same-menu"
                      childrenNodes={x.children || []}
                    ></RegularMenu>
                  }
                >
                  <Button
                    small
                    onClick={() => {
                      goToMenuItem(x.id);
                    }}
                    onMouseEnter={() => {
                      if (hasClickAnyButton) {
                        goToMenuItem(x.id);
                      }
                    }}
                    minimal
                    text={Dot("CPW5r", x.label || Dot("6yOXx", "Unknown Name"))}
                  ></Button>
                </Popover>
              );
            })}
      </div>
      <div>{props.rightShownContent}</div>
    </div>
  );
};
