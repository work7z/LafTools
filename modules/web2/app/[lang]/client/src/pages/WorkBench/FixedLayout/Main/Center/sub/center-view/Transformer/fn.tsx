import { FN_GetActualTextValueByBigTextId } from "@/app/[lang]/client/src/actions/bigtext_action";
import { CommonTransformerPassProp } from "@/app/[lang]/client/src/types/workbench-types";
import { useRuntimeStatusAndToolConfig } from "./hooks";
import { ACTION_Transformer_Process_Text, ACTION_Transformer_Process_Text_Delay } from "@/app/[lang]/client/src/actions/transformer_action";
import { FN_GetDispatch } from "@/app/[lang]/client/src/nocycle";
import RuntimeStatusSlice from "@/app/[lang]/client/src/reducers/runtimeStatusSlice";
import AlertUtils from "@/app/[lang]/client/src/utils/AlertUtils";
import { Dot } from "@/app/[lang]/client/src/utils/cTranslationUtils";

export let getNotifyTextFunction = (commonPassProps: CommonTransformerPassProp) => {
    let { extVM, extId, sessionId, outputBigTextId, inputBigTextId, toolHandler } = commonPassProps
    let { crtRuntimeStatus, } = useRuntimeStatusAndToolConfig({
        sessionId
    })

    return (fromTextInputEvent: boolean) => {
        if (fromTextInputEvent && crtRuntimeStatus?.autoRun != 'true') {
            return;
        }
        if (extVM && extId && sessionId && outputBigTextId && toolHandler) {
            let originalValue = FN_GetActualTextValueByBigTextId(inputBigTextId)
            if (originalValue == '' && crtRuntimeStatus.ignoreEmptyStr == 'true') {
                FN_GetDispatch()(
                    RuntimeStatusSlice.actions.moveTabToToolsPart({
                        sessionId,
                    })
                )
            } else {

                if (!fromTextInputEvent) {
                    FN_GetDispatch()(
                        ACTION_Transformer_Process_Text({
                            originalValue,
                            extVM,
                            extId,
                            sessionId,
                            outputBigTextId,
                            inputBigTextId,
                            toolHandler: toolHandler,
                            fromChangeEvent: fromTextInputEvent,
                            commonPassProp: commonPassProps
                        })
                    )
                } else {
                    ACTION_Transformer_Process_Text_Delay({
                        dispatch: FN_GetDispatch(),
                        originalValue,
                        extVM,
                        extId,
                        sessionId,
                        outputBigTextId,
                        inputBigTextId,
                        toolHandler: toolHandler,
                        fromChangeEvent: fromTextInputEvent,
                        commonPassProp: commonPassProps
                    })
                }
            }
        } else {
            AlertUtils.popError(new Error(Dot("6IHssvayw", "Unable to process with the error ID: {0}", "nkf1yJ6Gk")))
        }
    }
}