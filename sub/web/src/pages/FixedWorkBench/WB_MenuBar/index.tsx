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
import ALL_NOCYCLE, {
  APPINFOJSON,
  delayFN,
  getIconPngFile,
} from "../../../nocycle";

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

import { FixedMenuItem, langList } from "../definitions/WB_Types";
import { FixedMenuBar } from "./sub/InnerMenuBar";
import {
  pushToWorkSpace,
  useReadCurrentWorkspaceId,
  useWorkSpaceListGet,
} from "../../../common/workspace-utils";
import AlertUtils from "../../../utils/AlertUtils";

type PassProp = {
  leftPart?: JSX.Element;
};

let AboutThisSoftware = () => {
  return (
    <div className="center flex flex-col  m-auto w-full self-center">
      <img style={{ width: "120px" }} src={"/static/" + getIconPngFile()}></img>
      <p className="mt-2">LafTools - {APPINFOJSON.version}</p>
      <p>
        {Dot("hRFxV", "For more information, please visit our website")} -&gt;
        <a href="https://laf-tools.com" target="_blank">
          laf-tools.com
        </a>
      </p>
    </div>
  );
};

export let WB_MenuBar = (props: PassProp) => {
  let val_1 = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
  }));
  const var_3 = exportUtils.useSelector((val) => ({
    LoadingForPageData: val.system.LoadingForPageData,
  }));
  let stObj = exportUtils.useSelector((val) => {
    return {
      currentPlateId: val.status.nav.currentPlateId,
    };
  });
  let hist = useHistory();
  let dis = exportUtils.dispatch();

  let workspaceList: FixedMenuItem[] = [];
  let allWorkspacesList = useWorkSpaceListGet() || [];
  let crtWorkspaceId = useReadCurrentWorkspaceId();
  _.forEach(allWorkspacesList, (x, d, n) => {
    workspaceList.push({
      id: x.Id,
      label: x.Label,
      intent: crtWorkspaceId == x.Id ? "primary" : "none",
      link: "/workbench/" + x.Id,
      routerLinkType: true,
      // onClick: () => {
      // AlertUtils.popOK(
      //   Dot("-GJ_72", "Switched to the selected workspace {0}", x.Label)
      // );
      // },
      // onClick: () => {
      //   pushToWorkSpace(x.Id);
      // },
    });
  });

  let menus: FixedMenuItem[] = [
    {
      id: "file",
      label: Dot("wQYoz", "File"),
      children: [
        {
          id: "file-new-file",
          label: Dot("F4uS2", "New File"),
          disabled: true,
        },
        {
          id: "file-new-window",
          label: Dot("qF4uS23", "New Window"),
          link: location.href,
        },
        // {
        //   id: "file-new-workspace",
        //   label: Dot("qF4uS2", "Create Workspace"),
        // },
        {
          id: "gJf4R",
          spliter: true,
        },
        {
          id: "file-open-file",
          label: Dot("pJoOz", "Open File"),
          disabled: true,
        },
        {
          id: "file-open-workspace",
          label: Dot("1NTgQ", "Open Workspace"),
          disabled: true,
        },
        {
          id: "g7dVE",
          label: Dot("g5SK9", "Open Recent"),
          children: [
            {
              label: Dot("Opcty", "Files"),
              id: "XSxYm",
              disabled: true,
            },
            {
              label: Dot("zN2ES", "Workspaces"),
              id: "65-Xk",
              disabled: true,
            },
          ],
        },
        {
          id: "dwq",
          spliter: true,
        },
        {
          id: "SFnhx",
          label: Dot("aCkOP", "Exit"),
          onClick: () => {
            hist.push("/workbench");
          },
        },
      ],
    },
    {
      id: "edit",
      label: Dot("wQdYoz", "Edit"),
      children: [
        {
          id: "rZfcx",
          label: Dot("kOi5A", "Print Page"),
          onClick: () => {
            window.print();
          },
        },
      ],
    },
    {
      id: "view",
      label: Dot("wQdqwYoz", "View"),
      children: [
        {
          id: "view.full",
          // label: !PageUtils.isFullScreen()
          //   ? Dot("lRHDQ", "Exit Full Screen Mode")
          //   : Dot("M7jct", "Enter Full Screen Mode"),
          label: Dot("2S5ap", "Toggle Full Screen Mode"),
          onClick: () => {
            // page show full screen or not
            PageUtils.toggleFullScreen();
          },
        },
      ],
    },
    {
      id: "tabs",
      label: Dot("qqwYoz", "Tabs"),
      children: [
        {
          id: "tab.closeCur",
          label: Dot("xbz0B2", "Close Tab"),
          onClick: ALL_NOCYCLE.Fn_LastCloseTab,
        },
        {
          id: "tab.closeAll",
          label: Dot("xbz0B", "Close All Tabs"),
          onClick: ALL_NOCYCLE.Fn_LastCloseAllTab,
        },
      ],
    },
    {
      id: "workspace",
      label: Dot("qqwYqwe", "Workspaces"),
      children: workspaceList,
    },
    {
      id: "help",
      label: Dot("qqqwYoz", "Help"),
      children: [
        {
          id: "help.website",
          label: Dot("WPrTW", "Official Website"),
          link: "https://laf-tools.com",
        },
        {
          id: "help.github",
          label: Dot("mSFei", "Source Code on GitHub"),
          link: "https://github.com/work7z/LafTools",
        },
        {
          id: "qPR4G",
          spliter: true,
        },
        {
          id: "help.reportIssue",
          label: Dot("VOsZc", "Report Issue"),
          link: "https://github.com/work7z/LafTools/issues",
        },
        {
          id: "lxIYP",
          spliter: true,
        },
        {
          id: "help.condition",
          label: Dot("VeY9K", "Terms of Use"),
          link: "https://codegen.cc/main/license/main",
        },
        {
          id: "help.about",
          label: Dot("Z2QTU", "About"),
          onClick: () => {
            AlertUtils.win_alert({
              id: "0kcZT",
              msg: <AboutThisSoftware />,
            });
          },
        },
      ],
    },
  ];

  return (
    <FixedMenuBar
      requiredPageIcon
      leftPart={props.leftPart}
      menus={menus}
      rightShownContent={
        <div>
          <Tooltip
            content={Dot("rf0mql3", `Light or Dark Theme`)}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              // text="Software Updates"
              intent={val_1.dark ? "primary" : "none"}
              // title={Dot(`Spcfdee`, `Light or Dark Mode`)}
              text={""}
              icon={val_1.dark ? "flash" : "moon"}
              onClick={() => {
                dis(forgeSlice.actions.updateDarkMode({ isDark: !val_1.dark }));
              }}
            />
          </Tooltip>

          <Tooltip
            content={Dot("IKqqATS", "Refresh Current Page Data")}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              // text="Software Updates"
              intent={"none"}
              // text={Dot("kPJ-A4", "Refresh")}
              loading={var_3.LoadingForPageData}
              icon={"refresh"}
              onClick={() => {
                dis(ACTION_callRefreshAll());
              }}
            />
          </Tooltip>

          <Popover
            content={
              // write items for en_US, zh_CN, zh_HK
              <Menu>
                {langList.map((x) => {
                  return (
                    <MenuItem
                      text={x.label}
                      key={x.value}
                      onClick={() => {
                        TranslationUtils.CurrentLanguage = x.value;
                        dis(ACTION_UPDATE_LANG_AND_APPLY_CHANGE(x.value));
                      }}
                      intent={
                        x.value == TranslationUtils.CurrentLanguage
                          ? "primary"
                          : "none"
                      }
                    />
                  );
                })}
              </Menu>
            }
          >
            <Tooltip
              content={
                Dot("LWaeFqd", "Switch to your preferred language") +
                (TranslationUtils.CurrentLanguage != "en_US"
                  ? "(Language)"
                  : "")
              }
              usePortal={false}
              position="bottom"
            >
              <Button
                small={false}
                minimal
                intent={"none"}
                // text={
                //   Dot("TBPqy7", "Language") +
                //   ` (${TranslationUtils.CurrentLanguage})`
                // }
                onClick={() => {
                  //
                }}
                icon={"globe"}
              />
            </Tooltip>
          </Popover>
          <Tooltip
            content={Dot("Ma5mv", "Toggle the visibility of toolbar tabs")}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              intent={"none"}
              // title={Dot(`YPPPL`, `Toggle the visibility of toolbars tabs`)}
              // text={APPINFOJSON.version}
              icon={"multi-select"}
              onClick={() => {
                //
              }}
            />
          </Tooltip>
          <Tooltip
            content={Dot("iNqF1T", "Manage Cloud Account")}
            position="bottom"
          >
            <Button
              className={Classes.MINIMAL}
              small={true}
              intent={false ? "primary" : "warning"}
              // title={Dot(`ZAKaFq`, `My Cloud Account`)}
              icon={"cloud"}
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip content={Dot("LqWaFd", "System Settings")} position="bottom">
            <Button
              className={Classes.MINIMAL}
              small={true}
              intent={"none"}
              // title={Dot(`RhqzcdD`, `System Settings`)}
              // text={APPINFOJSON.version}
              icon={"cog"}
              onClick={() => {
                dis(forgeSlice.actions.updateDarkMode({ isDark: !val_1.dark }));
              }}
            />
          </Tooltip>
        </div>
      }
    />
  );
};
