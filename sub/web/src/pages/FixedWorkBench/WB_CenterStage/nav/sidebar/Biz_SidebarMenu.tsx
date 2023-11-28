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
import { APPINFOJSON, delayFN } from "../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../../../styles/routeMem";
import statusSlice from "../../../../../slice/StatusSlice";
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
import PageUtils from "../../../../../utils/PageUtils";
import TranslationUtils, { Dot } from "../../../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../slice/ForgeSlice";
import { ACTION_callRefreshAll } from "../../../../../slice/SystemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
} from "../../../../../styles/path";
import FixedWorkBenchTool from "../../../../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../../../../FixedWorkBenchFiles";
import FixedWorkBenchHistory from "../../../../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../../../../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice from "../../../../../slice/apiSlice";
import { SysTabPane } from "../../../components/SysTabPane";
import GenTabs from "../../../components/GenVerticalTabs";
import { EachTabPanelProp, TabNavProp } from "../../../definitions/WB_Types";
import { FN_ACTION_CloseMenu_ltr } from "../../../../../sliceAction/layout_action";
import {
  useMergeParamWithWorkSpace,
  useSearchQuery,
} from "../../../definitions/WB_Func";

let RightPanelNoAvailablePanel = () => {
  let dis = exportUtils.dispatch();
  return (
    <SysTabPane
      crtLeftNavId="not_finished_yet"
      leftNavList={[
        {
          label: Dot("qTqyvWdY", "Not finished yet"),
          value: "not_finished_yet",
        },
      ]}
      rightCtrls={
        <Button
          small
          minimal
          rightIcon="minus"
          onClick={() => {
            dis(
              FN_ACTION_CloseMenu_ltr({
                menuRecordKey: "ltr",
                menuKey: "right",
              })
            );
          }}
        ></Button>
      }
      children={
        <div>{Dot("pDBSWq", "no available content for right panel")}</div>
      }
    ></SysTabPane>
  );
};

export let SidebarMenu = (props: TabNavProp): any => {
  let dis = exportUtils.dispatch();
  let mp_with_ws = useMergeParamWithWorkSpace();
  let sq = useSearchQuery();
  let fn_format_menu = (x) => {
    return {
      ...x,
      pathname: mp_with_ws({ e: x.id }),
      panel: x.panel || RightPanelNoAvailablePanel,
    };
  };
  let val_memo_deps = _.values(sq);
  let mainTabs: EachTabPanelProp[] = useMemo(() => {
    let tmparr: EachTabPanelProp[] = [
      // {
      //   desc: Dot("pEk1qkk", "List all the opened tabs"),
      //   icon: "grid-view",
      //   id: "grid-view",
      //   label: Dot("RNeBze0", "Opened Tabs"),
      // },
      {
        desc: Dot("dkkq12", "Configure your tool in this tab."),
        icon: "cog",
        id: "cog",
        label: Dot("RNewBze0", "Tool Config"),
      },
      {
        desc: Dot(
          "dkkq12q",
          "The calculated result will be shown in this panel."
        ),
        icon: "export",
        id: "export",
        label: Dot("RNewBzde0", "Result"),
      },
    ];
    return tmparr.map(fn_format_menu);
  }, [val_memo_deps]);

  let extraTabs: EachTabPanelProp[] = useMemo(() => {
    let tmparr: EachTabPanelProp[] = [
      //
    ];
    return tmparr.map(fn_format_menu);
  }, [val_memo_deps]);

  let activeId = sq.e || _.get(mainTabs, "0.id");

  let v = exportUtils.useSelector((v) => {
    return {
      // show
      right_hide: v.layout.menuHide.right,
    };
  });

  return (
    <GenTabs
      highlightIntent={"success"}
      className={props.className}
      showNavOrContent={props.showNavOrContent}
      whichPart="right"
      activeId={v.right_hide ? "" : activeId + ""}
      onItemClicked={(a, b) => {
        props.onItemClicked && props.onItemClicked(a, b);
      }}
      onActiveIdChange={(x) => 1}
      tabs={mainTabs}
    ></GenTabs>
  );
};
