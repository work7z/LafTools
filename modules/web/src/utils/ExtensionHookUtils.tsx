// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 15 Oct 2023
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
  TreeNodeInfo,
} from "@blueprintjs/core";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import _ from "lodash";
import { Dot } from "./TranslationUtils";
import gutils from "./GlobalUtils";
import { ExtensionInfo } from "../reducers/apiSlice";
import ExtSlice, {
  ExtensionSessionParameter,
  ExtensionStatusData,
  FN_SYNC_ID_WITH_SESSION,
  SYNC_KEY_INPUT_REGION_DEFAULT,
  SYNC_KEY_OUTPUT_REGION_DEFAULT,
  fn_renew_createDefaultExtStatusData,
} from "../reducers/extSlice";
import exportUtils from "./ExportUtils";
import { shallowEqual } from "react-redux";
import {
  ExtSessionContext,
  ExtVMContext,
  PropExtSessionContext,
  PropExtVMContext,
} from "../containers/ExtensionSingleView";
import { logutils } from "./LogUtils";
import { FN_GetState } from "../nocycle";
import BigTextSlice from "../reducers/bigTextSlice";

const ExtHookUtils = {
  useExtStatusData(): ExtensionStatusData | null {
    let extInfo = ExtHookUtils.useExtInfo();
    let sessionId = extInfo.sessionId;
    let crtMap = exportUtils.useSelector((v) => {
      return {
        item_map: v.ext.extStatusMap[sessionId] as ExtensionStatusData,
      };
    });
    // logutils.debug("crtMap2", { crtMap, sessionId });
    if (!_.isNil(crtMap.item_map)) {
      return crtMap.item_map as ExtensionStatusData;
    }
    return null;
  },
  useExtInfo(): PropExtSessionContext {
    let ctx = useContext(ExtSessionContext);
    return ctx;
  },
  useExtVM(): PropExtVMContext {
    let ctx = useContext(ExtVMContext);
    return ctx;
  },
  useExtOperator() {
    let dis = exportUtils.dispatch();

    let extOp = {
      initExtStatusMap: ({ sessionId, extId }) => {
        extOp.updateExtStatusMap(
          fn_renew_createDefaultExtStatusData({
            extId,
            sessionId,
          }),
          {}
        );
      },
      updateExtStatusMap(
        statusData: ExtensionStatusData,
        extraKVMap: { [key: string]: string }
      ) {
        dis(ExtSlice.actions.updateExtStatusMap(statusData));
        // iterate key and value for extraKVMap
        for (let key in extraKVMap) {
          let value = extraKVMap[key];
          dis(
            BigTextSlice.actions.updatebigtext({
              key,
              value,
            })
          );
        }
      },
    };
    return extOp;
  },
  useQuickAll(): ExtQuickAllType {
    let dis = exportUtils.dispatch();
    let exOp = ExtHookUtils.useExtOperator();
    let { sessionId, extId } = ExtHookUtils.useExtInfo();
    let fromExtData = function <T, K extends keyof ExtensionStatusData>(
      fieldName: K
    ): T {
      let crtMap = exportUtils.useSelector((v) => {
        let b = v.ext.extStatusMap[sessionId];
        if (b) {
          let thatValue = b[fieldName];
          return {
            item_map: thatValue,
            ctn: _.size(v.ext.extStatusMap),
          };
        } else {
          return {
            item_map: null,
            ctn: 0,
          };
        }
      }, shallowEqual);
      return crtMap.item_map as T;
    };
    let toExtData = function <T, K extends keyof ExtensionStatusData>(
      fieldName: K,
      fieldValue: T
    ): void {
      dis(
        ExtSlice.actions.updateExtStatusMapPart({
          sessionId: sessionId,
          fieldName: fieldName,
          fieldValue: fieldValue,
        })
      );
    };

    return {
      getAllExtData: function (): ExtensionStatusData {
        return FN_GetState().ext.extStatusMap[sessionId];
      },
      getBigTextIdByPropName: function (propName: string): string | null {
        let crtMap = exportUtils.useSelector((v) => {
          let b = v.ext.extStatusMap[sessionId];
          if (b && b.bigtextKIMap) {
            let thatValue = b.bigtextKIMap[propName];
            return {
              value: thatValue,
              ctn: _.size(v.ext.extStatusMap.bigtextKIMap),
            };
          } else {
            return {
              value: null,
              ctn: 0,
            };
          }
        }, shallowEqual);
        return crtMap.value as string;
      },
      exOp: exOp,
      sessionId: sessionId,
      fromExtData,
      toExtData,
    };
  },
};
export type ExtQuickAllType = {
  getBigTextIdByPropName: (o: string) => string | null;
  getAllExtData: () => ExtensionStatusData;
  exOp: ReturnType<typeof ExtHookUtils.useExtOperator>;
  sessionId: string;
  fromExtData: <T, K extends keyof ExtensionStatusData>(
    fieldName: K
  ) => T | undefined;
  toExtData: <T, K extends keyof ExtensionStatusData>(
    fieldName: K,
    fieldValue: T
  ) => void;
};
export type PassExtQuickAllType = {
  sessionId: string;
};

export default ExtHookUtils;
