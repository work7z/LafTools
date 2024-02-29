// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 18 Oct 2023
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExtensionAction, ExtensionVM, ValueRes } from "../types/purejs-types-READ_ONLY";
import {
  ExtVMContext,
  PropExtSessionContext,
} from "../containers/ExtensionSingleView";
import CacheUtils from "../utils/CacheUtils";
import statusSlice from "./statusSlice";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import BigTextSlice from "./bigTextSlice";
import { Dot } from "../utils/cTranslationUtils";
import gutils from "../utils/GlobalUtils";
import { FN_GetState } from "../nocycle";
import { PayloadValueData } from "../types/constants";
import SyncStateUtils from "../utils/SyncStateUtils";
// import FileUtils from "../utils/FileUtils";
// import AlertUtils from "../utils/AlertUtils";

export type ExtensionSessionParameter = {
  extId: string;
  sessionId: string;
};

export const SYNC_KEY_INPUT_PREFIX = "input_";
export const SYNC_KEY_OUTPUT_PREFIX = "output_";
export const SYNC_KEY_INPUT_REGION_DEFAULT = SYNC_KEY_INPUT_PREFIX + "default";
export const SYNC_KEY_OUTPUT_REGION_DEFAULT =
  SYNC_KEY_OUTPUT_PREFIX + "default";
export type FN_SYNC_ID_TYPE = {
  value: string;
};
export const FN_SYNC_ID_WITH_SESSION = (
  sessionId: string,
  subValue: string
): FN_SYNC_ID_TYPE => {
  return {
    value: sessionId + subValue,
  };
};

export type ExtensionStatusData = {
  extId: string;
  sessionId: string;
  usingRealtimeMode: boolean;
  realtimeAction?: string;
  realtimeDebounce: number;
  formMap: { [key: string]: any }; // key, value
  bigtextKIMap: { [key: string]: string }; // key, value, usually for textarea
};

type ExtensionState = {
  extStatusMap: { [sessionId: string]: ExtensionStatusData };
};

const initialState: ExtensionState = CacheUtils.getFromCache("ext", {
  extStatusMap: {},
}) as ExtensionState;

export let fn_renew_createDefaultExtStatusData = ({ sessionId, extId }) => {
  return {
    extId: extId,
    sessionId: sessionId,
    realtimeDebounce: 200,
    usingRealtimeMode: true,
    formMap: {},
    bigtextKIMap: {
      [SYNC_KEY_INPUT_REGION_DEFAULT]:
        sessionId + SYNC_KEY_INPUT_REGION_DEFAULT,
      [SYNC_KEY_OUTPUT_REGION_DEFAULT]:
        sessionId + SYNC_KEY_OUTPUT_REGION_DEFAULT,
    },
  };
};

if (initialState.extStatusMap) {
  _.forEach(initialState.extStatusMap, (x, d, n) => {
    initialState.extStatusMap[d] = _.defaultsDeep(
      x,
      fn_renew_createDefaultExtStatusData({
        sessionId: x.sessionId,
        extId: x.extId,
      })
    );
  });
}

const ExtSlice = createSlice({
  name: "ext",
  initialState,
  reducers: {
    ...SyncStateUtils.getSyncStateReducers("ext", {
      RunOnEnterWorkBench: true,
      RequireUserId: true,
      RequireWorkspaceId: true,
      SyncLocationOnParameter: 'ext',
    }),
    updateExtStatusMapPart: (
      state: ExtensionState,
      action: PayloadAction<{
        sessionId: string;
        fieldName: keyof ExtensionStatusData;
        fieldValue: any;
      }>
    ) => {
      let b = state.extStatusMap[action.payload.sessionId] as any;
      if (b) {
        b[action.payload.fieldName as keyof ExtensionStatusData] = action
          .payload.fieldValue as any;
      }
    },

    // update extStatusMap by dialogId, extId and its value
    updateExtStatusMap(
      state: ExtensionState,
      action: PayloadAction<ExtensionStatusData>
    ) {
      state.extStatusMap[action.payload.sessionId] = action.payload;
    },
  },
});

export default ExtSlice;

// prepare two ACTION_ function to handle text process and file process
export type ProcessAction = {
  actionId: ExtensionAction;
  mute?: boolean;
  extInfo?: PropExtSessionContext;
};

export const fn_call_convert_with_action = (obj: {
  newValue: string;
  sessionId: string;
  actionId: string;
  outputSyncId: string;
}): any => {
  let { outputSyncId } = obj;
  return async (dis) => {
    try {
      dis(
        statusSlice.actions.updateProcessLoadType({
          key: outputSyncId,
          value: {
            loading: true,
            loadingTitle: Dot(
              "ixyP0",
              "Processing the realtime action automatically"
            ),
            loadingDesc: null,
          },
        })
      );
      let BigtextKIMapForValue = _.mapValues(
        _.pickBy(
          FN_GetState().ext.extStatusMap[obj.sessionId].bigtextKIMap,
          (x, d) => d.startsWith(SYNC_KEY_INPUT_PREFIX)
        ),
        (x) => {
          return FN_GetState().bigtext.textKVMap[x];
        }
      );
      let res = await AjaxUtils.DoLocalRequestWithNoThrow<
        PayloadValueData<{
          OutputText: string;
        }>
      >({
        url: "/tool/exts/convertText",
        isPOST: true,
        data: {
          ActionId: obj.actionId,
          FormMap: FN_GetState().ext.extStatusMap[obj.sessionId].formMap,
          InputText: BigtextKIMapForValue[SYNC_KEY_INPUT_REGION_DEFAULT],
          BigtextKIMapForValue,
        },
      });
      if (res.error) {
        throw res.error;
      }

      dis(
        BigTextSlice.actions.updatebigtext({
          key: outputSyncId,
          value: res.response?.data.payload.value.OutputText + "",
        })
      );
      dis(
        statusSlice.actions.updateProcessLoadType({
          key: outputSyncId,
          value: {
            loading: false,
          },
        })
      );
    } catch (e) {
      let errorTitle = Dot(
        "9eZHM",
        "Oops! It seems we encounter some warnings or errors. "
      );
      let errorDesc = gutils.getErrAxiosMsg(e as string) as string;
      dis(
        statusSlice.actions.updateProcessLoadType({
          key: outputSyncId,
          value: {
            error: true,
            errorTitle,
            errorDesc,
          },
        })
      );
    }
  };
};

export const ACTION_processTextAction = (arg: ProcessAction): any => {
  return async (dispatch: any, getState: any) => {
    //
  };
};
export const ACTION_processFileAction = (arg: ProcessAction): any => {
  return async (dispatch: any, getState: any) => {
    //
  };
};
