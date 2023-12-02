// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 5 Oct 2023
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

import { logutils } from "./LogUtils";
import {
  createApi,
  fetchBaseQuery,
  TypedUseQueryHookResult,
  TypedUseQueryStateResult,
  TypedUseQuerySubscriptionResult,
  TypedUseMutationResult,
} from "@reduxjs/toolkit/query/react";
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

import _ from "lodash";
import { Dot } from "./TranslationUtils";
import gutils from "./GlobalUtils";
import AlertUtils from "./AlertUtils";

export let getAjaxValueRes = function <A extends { [key: string]: any }>(r): A {
  return r.response?.data?.payload?.value;
};

const QueryUtils = {
  getDoAjaxValueRes: getAjaxValueRes,
  validateResult: (
    res_toolCategory: TypedUseQueryHookResult<any, any, any>,
    options: { label: string; onlyErr?: boolean }
  ): React.JSX.Element | undefined => {
    let errObj = _.get(res_toolCategory, "data.errors");
    if (res_toolCategory.isFetching && !options.onlyErr) {
      return (
        <NonIdealState
          className="whitespace-break-spaces"
          title={Dot("aHAfR", "Fetching data for {0}...", options.label)}
        ></NonIdealState>
      );
    } else if (res_toolCategory.isError) {
      return (
        <NonIdealState
          className="whitespace-break-spaces"
          title={Dot(
            "YQN9u",
            "An Error occurred while loading {0}, please check below detail.",
            options.label
          )}
          description={
            `[${res_toolCategory.status}] ` +
            gutils.getWebErrMsg(res_toolCategory.error)
          }
          action={
            <Button
              onClick={() => {
                res_toolCategory.refetch();
                AlertUtils.popMsg("success", {
                  message: Dot("jPNCb", "Retried."),
                });
              }}
            >
              {Dot("ySVf-", "Re-try this Request")}
            </Button>
          }
        ></NonIdealState>
      );
    }
    return undefined;
  },
};
export default QueryUtils;
