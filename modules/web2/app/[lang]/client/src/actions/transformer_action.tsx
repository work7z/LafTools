// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Mon, 15 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

import { FN_GetDispatch, FN_GetState } from "../nocycle";
import RuntimeStatusSlice from "../reducers/runtimeStatusSlice";
import LibProcessEntryPoint, { RecipeConfig } from '@/app/[lang]/client/src/impl/tools/r_process'
import { ExtensionVM } from "../types/purejs-types-READ_ONLY";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "./bigtext_action";
import gutils from "../utils/GlobalUtils";
import _ from "lodash";
import moment from "moment";
// import { ToolHandler } from "@/app/[lang]/client/src/impl/tools/handler";
import { ToolHandler } from "@/app/[lang]/client/src/impl/tools/r_handler";
import { CommonTransformerPassProp } from "../types/workbench-types";
import { logutils } from "../utils/LogUtils";
import Operation from "../impl/core/Operation";
import AlertUtils from "../utils/AlertUtils";
import { Dot } from "../utils/cTranslationUtils";
import { fn_defaultArgValues_fromConfig } from "../pages/WorkBench/FixedLayout/Main/Center/sub/center-view/Transformer/ProcessPanel/hooks";
window["moment"] = moment

type PassType = {
    sessionId: string,
    extVM: ExtensionVM,
    extId: string,
    outputBigTextId: string
    inputBigTextId: string
    toolHandler: ToolHandler
    commonPassProp: CommonTransformerPassProp
    originalValue: string
    fromChangeEvent: boolean
}

let tmpLog = {}

export let ACTION_Transformer_Process_Text = (obj: PassType): any => {
    let { originalValue, extVM, extId, sessionId, outputBigTextId, inputBigTextId, commonPassProp } = obj;
    return async () => {
        let toolHandler = obj.toolHandler
        let m = FN_GetState().runtimeStatus.toolOutputStatusMap[sessionId]
        let operaList = commonPassProp.operaList
        let crtRuntimeStatus = m
        if (!crtRuntimeStatus) {
            logutils.warn("no available crtRuntimeStatus")
            return;
        };
        let crtDefaultOpera = obj.commonPassProp.crtDefaultOpera
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
            if (!crtDefaultOpera) {
                logutils.warn("no available opera")
                AlertUtils.popMsg("warning", {
                    message: Dot("0mYyJJ6Ta", "Operation is unavailable at present, please try again later.")
                })
                return;
            }
            let recipeConfigs: RecipeConfig[] = []
            let operaList: Operation[] = [crtDefaultOpera,]
            for (let eachOp of operaList) {
                let crtPipeMapItem = obj.commonPassProp.crtToolCfg?.pipemap && obj.commonPassProp.crtToolCfg?.pipemap[eachOp.fileID]
                // we use default value from config first
                let dftArgsValueArr_from_config = fn_defaultArgValues_fromConfig(eachOp.getOptDetail().config.args || [])
                let argsValueArr: any[] = dftArgsValueArr_from_config
                // overwrite the config from user if have
                if (crtPipeMapItem && crtPipeMapItem.a) {
                    let crtPipeMapItemsArgs = crtPipeMapItem.a
                    _.forEach(argsValueArr, (x, d, n) => {
                        let crtPipeArgVal = crtPipeMapItemsArgs[d]
                        if (!_.isNil(crtPipeArgVal)) {
                            _.set(argsValueArr, d + "", crtPipeArgVal)
                        }
                    })
                }
                if (_.isNil(argsValueArr)) {
                    throw new Error("Error Code: hkmaMr7qP")
                }
                recipeConfigs.push({
                    op: eachOp,
                    args: argsValueArr
                })
            }
            let processedNewValue = await LibProcessEntryPoint.process(originalValue, {
                extVM,
                extId,
                recipeConfigs: recipeConfigs,
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
            console.log(e)
            FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, "Error: " + gutils.getErrMsg(e)));
        }
    }
}

export let ACTION_Transformer_Process_Text_Delay = _.debounce((obj: PassType & { dispatch: any }) => {
    obj.dispatch(ACTION_Transformer_Process_Text(obj))
}, 300)