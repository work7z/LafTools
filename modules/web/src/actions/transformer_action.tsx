// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Mon, 15 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import { FN_GetDispatch } from "../nocycle";
import RuntimeStatusSlice from "../reducers/runtimeStatusSlice";
import LibProcessEntryPoint from '../lib/entrypoint'
import { ExtensionVM } from "../types/purejs-types-READ_ONLY";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "./bigtext_action";
import gutils from "../utils/GlobalUtils";
import _ from "lodash";
import moment from "moment";
import Operation from "../lib/core/Operation.mjs";
import { ToolHandler } from "../lib/meta/tools/handler";
window["moment"] = moment

type PassType = {
    sessionId: string,
    extVM: ExtensionVM,
    extId: string,
    outputBigTextId: string
    inputBigTextId: string
    toolHandler: ToolHandler
}

let tmpLog = {}

export let ACTION_Transformer_Process_Text = (obj: PassType): any => {
    let { extVM, extId, sessionId, outputBigTextId, inputBigTextId } = obj;
    return async () => {
        let originalValue = FN_GetActualTextValueByBigTextId(inputBigTextId)
        let toolHandler = obj.toolHandler
        let beginTime = new Date().getTime()
        let checkId = _.uniqueId("")
        tmpLog[sessionId] = checkId
        // before process
        FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, ""));
        FN_GetDispatch()(
            RuntimeStatusSlice.actions.resetProcessValueBeforeProcess({
                sessionId,
            })
        )
        try {
            // processing
            let processedNewValue = await LibProcessEntryPoint.process(originalValue, {
                extVM,
                extId,
                operation: toolHandler.getOperations()[0]
            });
            // after process
            if (processedNewValue.error) {
                FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, processedNewValue.error));
            } else {
                FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, processedNewValue.result));
            }
            let elapsedTime = Math.abs(moment(beginTime).diff(moment(), "seconds"));
            FN_GetDispatch()(
                RuntimeStatusSlice.actions.updateProcessValue({
                    value: processedNewValue,
                    sessionId,
                    elapsedTime: elapsedTime + "s"
                })
            )
            setTimeout(() => {
                if (tmpLog[sessionId] != checkId) return;
                FN_GetDispatch()(
                    RuntimeStatusSlice.actions.cleanProcessText({
                        sessionId,
                    })
                )
                delete tmpLog[sessionId]
            }, 500)
        } catch (e) {
            FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, "Error: " + gutils.getErrMsg(e)));
        }
    }
}