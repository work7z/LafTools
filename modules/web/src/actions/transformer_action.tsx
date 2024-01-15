import { FN_GetDispatch } from "../nocycle";
import RuntimeStatusSlice from "../reducers/runtimeStatusSlice";
import LibProcessEntryPoint from '../lib/entrypoint'
import { ExtensionVM } from "../types/purejs-types-READ_ONLY";
import { FN_SetTextValueFromOutSideByBigTextId } from "./bigtext_action";

type PassType = {
    sessionId: string,
    extVM: ExtensionVM,
    extId: string,
    outputBigTextId: string
}

export let ACTION_Transformer_Process_Text = (obj: PassType): any => {
    let { extVM, extId, sessionId, outputBigTextId } = obj;
    return async (originalValue: string) => {
        // before process
        FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, ""));

        // processing
        let processedNewValue = await LibProcessEntryPoint.process(originalValue, {
            extVM,
            extId,
        });

        // after process
        FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, processedNewValue.result));
        RuntimeStatusSlice.actions.updateProcessValue({
            value: processedNewValue,
            sessionId,
        })
    }
}