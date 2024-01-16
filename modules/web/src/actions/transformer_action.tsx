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
import { FN_SetTextValueFromOutSideByBigTextId } from "./bigtext_action";
import gutils from "../utils/GlobalUtils";
import _ from "lodash";
import moment from "moment";
window["moment"] = moment

type PassType = {
    sessionId: string,
    extVM: ExtensionVM,
    extId: string,
    outputBigTextId: string
}

export let ACTION_Transformer_Process_Text = (obj: PassType): any => {
    let { extVM, extId, sessionId, outputBigTextId } = obj;
    return async (originalValue: string) => {
        let beginTime = new Date().getTime()
        let processId = _.uniqueId("")
        // before process
        FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, ""));
        FN_GetDispatch()(
            RuntimeStatusSlice.actions.resetProcessValueBeforeProcess({
                sessionId,
            })
        )
        await gutils.sleep(2000)
        // processing
        let processedNewValue = await LibProcessEntryPoint.process(originalValue, {
            extVM,
            extId,
        });
        // after process
        if (processedNewValue.error) {
            FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, processedNewValue.error));
        } else {
            FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, processedNewValue.result));
        }
        let elapsedTime = moment(beginTime).diff(moment(), "seconds");
        FN_GetDispatch()(
            RuntimeStatusSlice.actions.updateProcessValue({
                value: processedNewValue,
                sessionId,
                elapsedTime:elapsedTime+"s"
            })
        )
    }
}