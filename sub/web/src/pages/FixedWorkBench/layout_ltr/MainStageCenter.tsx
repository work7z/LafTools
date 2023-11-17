// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 16 Nov 2023
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
import { APPINFOJSON, delayFN } from "../../../nocycle";
import { SystemStatusBarItem } from "../../WorkBench/cpt/SystemStatusBar/index";

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
import URLUtils from "../../../utils/URLUtils";
import TranslationUtils, { Dot } from "../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment, AllotmentHandle } from "allotment";
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
  SUB_URL_WORKBENCH_TOOLS_CATEGORY,
  URL_WORKBENCH_FILES,
  URL_WORKBENCH_MANUALS as URL_WORKBENCH_MANUAL,
  URL_WORKBENCH_NOTES,
  URL_WORKBENCH_WORKSPACE,
} from "../../../styles/path";
import FixedWorkBenchTool from "../../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../../FixedWorkBenchFiles";
import WorkBenchNotes from "../../WorkBenchNotes";
import FixedWorkBenchHistory from "../../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice from "../../../slice/apiSlice";
import { VAL_CSS_TAB_TITLE_PANEL } from "../common/WB_Types";
import { FunctionalMenu } from "../TopMiddleFoot/middle/Biz_FunctionalMenu";
import { SidebarMenu } from "../TopMiddleFoot/middle/Biz_SidebarMenu";
import Biz_DrawerMenu from "../TopMiddleFoot/middle/Biz_DrawerMenu";
import layoutSlice from "../../../slice/LayoutSlice";
import {
  FN_CLOSE_LTR_MENU,
  FN_SHOW_LTR_MENU,
} from "../LeftInnerPanel/Ctrl_Left_FunctionalMenu";
import GenCodeMirror from "../../../cpt/GenCodeMirror";
import { InnerCenterView } from "./InnerCenterView";
const snapMin = 100;

export let REF_mainstage: {
  inst_ltr: AllotmentHandle | null;
  inst_ttm: AllotmentHandle | null;
} = {
  inst_ltr: null,
  inst_ttm: null,
};
let runOnceForMainStage = {
  ltr: _.once(() => {
    setTimeout(() => {
      REF_mainstage.inst_ltr && REF_mainstage.inst_ltr.reset();
    }, 0);
  }),
  ttm: _.once(() => {
    setTimeout(() => {
      REF_mainstage.inst_ttm && REF_mainstage.inst_ttm.reset();
    }, 0);
  }),
};
gutils.ExposureIt("REF_mainstage", REF_mainstage, true);

export let MainStage = (props: { className: string }) => {
  let hist = useHistory();

  let v = exportUtils.useSelector((v) => {
    return {
      // show
      left_hide: v.layout.menuHide.left,
      right_hide: v.layout.menuHide.right,
      bottom_hide: v.layout.menuHide.bottom,
      // size
      left_size: v.layout.menuSize.left,
      middle_size: v.layout.menuSize.middle,
      right_size: v.layout.menuSize.right,
      bottom_size: v.layout.menuSize.bottom,
    };
  });

  let dis = exportUtils.dispatch();

  // let fn_syncSizes = useMemo(() => {
  //   return {
  //   };
  // }, [_.values(v)]);
  let fn_syncSizes = {
    sync_Vertical: _.throttle((size) => {
      dis(layoutSlice.actions.updateMenuRecord({ menu: "ttm", record: size }));
    }, 100),

    sync_Horizontal: _.throttle((size) => {
      dis(layoutSlice.actions.updateMenuRecord({ menu: "ltr", record: size }));
      // left
      if (v.left_hide && size[0] > 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "left",
            hide: false,
          })
        );
      } else if (!v.left_hide && size[0] == 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "left",
            hide: true,
          })
        );
      }
      // right
      if (v.right_hide && size[2] > 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "right",
            hide: false,
          })
        );
      } else if (!v.right_hide && size[2] == 0) {
        dis(
          layoutSlice.actions.updateMenuHide({
            menu: "right",
            hide: true,
          })
        );
      }
    }, 200),
  };

  // return <div>ok</div>;

  return (
    <div className={props.className}>
      <Allotment
        vertical
        ref={(e) => {
          REF_mainstage.inst_ttm = e;
          runOnceForMainStage.ttm();
        }}
        onChange={(size) => {
          logutils.debug("size", size);
          fn_syncSizes.sync_Vertical(size);
        }}
      >
        <Allotment.Pane>
          <div className="w-full h-full">
            <Allotment
              ref={(e) => {
                gutils.ExposureIt("REF_mainstage", REF_mainstage, true);
                REF_mainstage.inst_ltr = e;
                runOnceForMainStage.ltr();
              }}
              onChange={(size) => {
                logutils.debug("size", size);
                fn_syncSizes.sync_Horizontal(size);
              }}
            >
              <Allotment.Pane
                preferredSize={v.left_size}
                visible={!v.left_hide}
                snap
                minSize={snapMin}
              >
                <FunctionalMenu
                  showNavOrContent="content"
                  className="w-full"
                ></FunctionalMenu>
              </Allotment.Pane>
              <Allotment.Pane preferredSize={v.middle_size}>
                <InnerCenterView></InnerCenterView>
              </Allotment.Pane>
              <Allotment.Pane
                visible={!v.right_hide}
                preferredSize={v.right_size}
                snap
                minSize={snapMin}
              >
                <SidebarMenu
                  showNavOrContent="content"
                  className="w-full"
                ></SidebarMenu>
              </Allotment.Pane>
            </Allotment>
          </div>
        </Allotment.Pane>
        <Allotment.Pane
          visible={!v.bottom_hide}
          preferredSize={v.bottom_size}
          snap
          minSize={snapMin}
        >
          <Biz_DrawerMenu />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};
