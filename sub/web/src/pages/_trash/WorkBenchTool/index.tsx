// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 1 Oct 2023
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
} from "@blueprintjs/core";
import { Dot } from "../../../utils/TranslationUtils";
import "./index.scss";
import _ from "lodash";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router";
import {
  SUB_URL_WORKBENCH_TOOLS_CATEGORY,
  URL_WORKBENCH_TOOLS,
} from "../../../styles/path";
import { Link } from "react-router-dom";
import gutils from "../../../utils/GlobalUtils";
import ToolMiddleNavigator from "../../../biz/ToolMiddleNavigator";
import { PayloadListData, ToolParamType } from "../../../styles/var";
import ToolRightViewer from "../../../biz/ToolRightViewer";
import { FnPureToolDefinition, PassToolViewerProp } from "./tool_definitions";
import apiSlice from "../../../slice/apiSlice";
import QueryUtils from "../../../utils/QueryUtils";
import { useEffect } from "react";
import exportUtils from "../../../utils/ExportUtils";
import NotYetOkie from "../../../cpt/NotYetOkie";
import URLUtils from "../../../utils/URLUtils";
import ToolLeftCatagory from "../../../biz/ToolLeftCatagory";

interface PassProp {}

export default (prop: PassProp) => {
  const res_toolCategory = apiSlice.useGetToolCategoryQuery(
    exportUtils.refresh_v1(),
    exportUtils.refresh_v2()
  );
  gutils.ExposureIt("res_toolCategory", res_toolCategory);
  let toolParam = useParams() as ToolParamType;
  gutils.ExposureIt("toolParam", toolParam, true);
  let hist = useHistory();
  gutils.ExposureIt("hist", hist);

  const r = QueryUtils.validateResult(res_toolCategory, {
    label: Dot("KexXW", "Tool Categories"),
  });

  if (r) return r;

  // let payloadData: PayloadListData<FnPureToolDefinition> = [];
  // res_toolCategory.data;

  let allPureMenuArr: FnPureToolDefinition[] = [];
  // payloadData?.payload?.list;

  setTimeout(() => {
    if (
      gutils.empty(toolParam.category, ":category") &&
      !gutils.emptyArr(allPureMenuArr)
    ) {
      hist.push("/workbench/tools/" + allPureMenuArr[0].id);
    }
  }, 0);

  let l1 = 3;
  let l2 = 5;

  let findCurrentPureItem = _.first(
    _.filter(allPureMenuArr, (x) => x.id == toolParam.category)
  );

  return (
    <div className="workbench-tool-wrapper pure-g">
      <div className={`pure-u-${l1}-24 tool-part-L1-menu`}>
        <ToolLeftCatagory
          findCurrentPureItem={findCurrentPureItem || null}
          allPureMenuArr={allPureMenuArr}
        />
      </div>
      <div className={`pure-u-${l2}-24 tool-part-L2-menu`}>
        <ToolMiddleNavigator
          findCurrentPureItem={findCurrentPureItem}
          category={toolParam.category}
        />
      </div>
      <div className={`pure-u-${24 - l2 - l1}-24 tool-part-content`}>
        <ToolRightViewer
          findCurrentPureItem={findCurrentPureItem}
          category={toolParam.category}
        />
      </div>
    </div>
  );
};
