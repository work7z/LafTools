// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 15 Nov 2023
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
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ExtHookUtils, { ExtQuickAllType } from "../utils/ExtensionHookUtils";
import {
  ExtVMContext,
  PropExtSessionContext,
} from "../containers/ExtensionSingleView";
import CacheUtils from "../utils/CacheUtils";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import { Dot } from "../utils/cTranslationUtils";
import gutils from "../utils/GlobalUtils";
import { FN_GetState } from "../nocycle";
import { PayloadValueData } from "../types/constants";
import FileUtils from "../utils/FileUtils";
import AlertUtils from "../utils/AlertUtils";
import BigTextSlice from "../reducers/bigTextSlice";
import statusSlice from "../reducers/statusSlice";

export let ACTION_fn_input_from_file = ({
  inputSyncId,
  outputSyncId,
  sessionId,
  usingRealtimeMode,
  realtimeAction,
}: {
  outputSyncId: string;
  inputSyncId: string;
  usingRealtimeMode: boolean;
  realtimeAction: string;
  sessionId: string;
}): any => {
  return async (dis) => {
    try {
      let file = await FileUtils.selectFileByAsync("*");
      // check if file is greater than 10mB
      if (file.size > 30 * 1024 * 1024) {
        throw new Error(
          Dot(
            "Z7OTt",
            "The file you selected is too large, please select a file less than 30MB."
          )
        );
      }

      dis(
        statusSlice.actions.updateProcessLoadType({
          key: inputSyncId,
          value: {
            loading: true,
            loadingTitle: Dot("SAnnQ", "Loading the file {0}"),
            loadingDesc: null,
          },
        })
      );

      AlertUtils.popMsg("success", {
        message: Dot(
          "CfZAX",
          "The File {0} Selected, we are uploading it to the core service.",
          file.name
        ),
      });
      let { RefID } = await FileUtils.uploadFileToTempDir(file);
      let fileContentStr = await FileUtils.readTempFileByRefID(RefID);
      dis(
        BigTextSlice.actions.updatebigtext({
          key: inputSyncId,
          value: fileContentStr,
        })
      );
      dis(
        statusSlice.actions.updateProcessLoadType({
          key: inputSyncId,
          value: {
            loading: false,
          },
        })
      );
      if (usingRealtimeMode) {
        dis(
          ACTION_fn_call_ext_for_action({
            outputSyncId,
            sessionId: sessionId,
            newValue: fileContentStr,
            actionId: realtimeAction,
          })
        );
      }
    } catch (e) {
      let errorTitle = Dot(
        "S4MMV",
        "Oops! We found some issues while loading the file."
      );
      let errorDesc = gutils.getErrAxiosMsg(e as string) as string;
      dis(
        statusSlice.actions.updateProcessLoadType({
          key: inputSyncId,
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
function ACTION_fn_call_ext_for_action(arg0: {
  outputSyncId: string;
  sessionId: string;
  newValue: string;
  actionId: string;
}): any {
  throw new Error("Function not implemented.");
}
