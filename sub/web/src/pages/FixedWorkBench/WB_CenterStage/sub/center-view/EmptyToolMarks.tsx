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
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../../../nocycle";

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
import { Allotment, AllotmentHandle } from "allotment";
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
  URL_WORKBENCH_WORKSPACE,
} from "../../../../../styles/path";
import FixedWorkBenchTool from "../../../../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../../../../FixedWorkBenchFiles";

import FixedWorkBenchHistory from "../../../../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../../../../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice from "../../../../../slice/apiSlice";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../definitions/WB_Types";
import { FunctionalMenu } from "../../nav/functional";
import { SidebarMenu } from "../../nav/sidebar/Biz_SidebarMenu";
import Biz_DrawerMenu from "../../nav/control";
import layoutSlice from "../../../../../slice/LayoutSlice";
import {
  FN_CLOSE_LTR_MENU,
  FN_SHOW_LTR_MENU,
} from "../../nav/functional/panel-group/controls/FunctionalControls";
import GenCodeMirror from "../../../../../components/GenCodeMirror";
import GenHorizontalTab, {
  EachTab,
} from "../../../components/GenHorizontalTab";
import WorkspaceSlice from "../../../../../slice/workspaceSlice";
import { ClosableText } from "../../../../../components/ClosableText";
import TextTransformer from "./TextTransformer";
import { CommonPassProp } from "./transformer_types";
import {
  useMergeParamWithWorkSpace,
  useMergeParameter,
} from "../../../definitions/WB_Func";
import ToolInnerImplView from "./ToolInnerImplView";

export default () => {
  let helpers: {
    label: string;
    subLabel?: string;
  }[] = [
    {
      label: Dot("QM2Ob", "Recent Tools"),
      subLabel: "Ctrl + E",
    },
    {
      label: Dot("pKHRT", "Go to Tools"),
      subLabel: Dot("HyIC_", "Slash Key (/)"),
    },
    {
      label: Dot("F0CCF", "HotKeys List"),
      subLabel: Dot("PpCHA", "Question Key(?)"),
    },
    {
      label: Dot("psZoP", "Drop files here to process them"),
      subLabel: Dot("mBgF1", "Mouse Action"),
    },
  ];
  let s = exportUtils.useSelector((v) => {
    return {
      close: v.forge.closePWAReminder,
    };
  });
  return (
    <div className="bg-slate-100 relative p-5 dark:bg-black  w-full p-0 m-0 h-full">
      <h1 className="m-0 mb-3">{Dot("dDGrH", "LafTools Navigator")}</h1>
      <ul className="list">
        {/* <div>{Dot("FOyHW", "Search Everywhere")}</div> */}
        {/* <div>{Dot("uwqGE", "Go to Tools")}</div> */}
        {helpers.map((x) => {
          return (
            <li className="flex mb-3">
              <div className="mr-2">{x.label}</div>
              <div className="text-gray-500">{x.subLabel}</div>
            </li>
          );
        })}
      </ul>
      <div className="absolute bottom-2 right-1 text-gray-600 dark:text-gray-400">
        <div>
          <ClosableText
            isClose={s.close}
            onClose={() => {
              FN_GetDispatch()(
                forgeSlice.actions.updateFieldNameValue({
                  closePWAReminder: true,
                })
              );
            }}
            text={Dot(
              "pqs7y3",
              "Kindly consider registering this webpage as a PWA to have full keymap support."
            )}
          ></ClosableText>
        </div>
      </div>
    </div>
  );
};
