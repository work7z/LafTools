
import { Alignment, Button, ButtonProps, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../../utils/cTranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../../reducers/bigTextSlice";
import _ from "lodash";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_config, fn_coll_output, fn_format_button } from "../hooks";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import CopyButton from "../../../../../../../../../components/CopyButton";
import { ActionButtonProps } from "../../../../../../../../../components/ActionButton";


let TextTransformerControl = (props: { loadingStatic: boolean } & TextTransformerProps & TransformerWithRuntime & {
    onProcess: () => any;
}) => {
    let { inputBigTextId } = props;
    let [loadExample, onLoadExample] = useState(false);
    let toolHandler = props.toolHandler
    let extVM = props.extVM
    let crtRuntimeStatus = props.crtRuntimeStatus
    let parentTriggered = crtRuntimeStatus.processOK || crtRuntimeStatus.processing;
    let operaList = toolHandler?.getOperations() || []
    let crtDefaultOperaId = props.crtDefaultOperaId
    let leftActions: ActionButtonProps[] = [
        ...(
            operaList
        ).map(x => {
            let optDetail = x.getOptDetail()
            let crtId = optDetail?.id;
            let crtDesc = optDetail?.description
            let crtName = optDetail?.name || x.name
            let isHighlightOne = crtId == crtDefaultOperaId;
            return {
                text: crtName,
                icon: 'derive-column',
                intent: "primary",
                title: crtDesc,
                afterTitle: crtDesc + "[" + Dot("gU1O2", "Triggerred") + "]",
                enableActionMode: true,
                afterText: crtName,
                lastingTime: 800,
                doNotBeMinimalWhenTrigger: true,
                parentTriggered: parentTriggered,
                highlightOne: isHighlightOne,
                outlined: !isHighlightOne,
                minimal: !isHighlightOne,
                onClick: () => {
                    FN_GetDispatch()(
                        RuntimeStatusSlice.actions.updateValueInStatusMap({
                            sessionId,
                            obj: {
                                defaultOperationId: crtId
                            }
                        })
                    )
                    setTimeout(() => {
                        props.onProcess()
                    }, 0)
                },
            } satisfies ActionButtonProps
        }) satisfies ActionButtonProps[],
        {
            icon: 'document-open',
            text: Dot("2bqHk", "Load from File"),
            intent: "none",
            title: Dot("NNfJo", "Load Data from File"),
            onClick: () => {
                AlertUtils.popNotSupport()
            }
        },
        {
            icon: 'color-fill',
            text: Dot("IWUH5", "Show Example"),
            intent: "none",
            className: "",
            enableActionMode: true,
            afterText: Dot("OO0qPN", "Example Loaded"),
            afterIntent: "none",
            title: Dot("5lW8qp", "Show an example for this tool"),
            afterTitle: Dot("OeO0PeN", "Okay, the example is displayed in the input editor."),
            loading: loadExample,
            onClick: async () => {
                try {
                    onLoadExample(true);
                    let val: string = props.crtDefaultOpera?.getOptDetail()?.exampleInput || ''
                    if (_.isEmpty(val)) {
                        let r = await AjaxUtils.DoStaticRequest({
                            url: "/example/" + toolHandler?.getMetaInfo()?.exampleType + ".txt",
                        });
                        if (r.status != 200) {
                            throw new Error(Dot("vU17B", "Unable to send the request"));
                        }
                        val = r.data;
                    }
                    FN_GetDispatch()(
                        FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, val),
                    );
                } catch (e) {
                    console.log(e);
                    AlertUtils.popError(e as any);
                } finally {
                    onLoadExample(false);
                }
            },
        },
    ];
    if (props.loadingStatic) {
        leftActions.forEach(x => {
            x.loading = true;
        })
    }
    let sessionId = props.sessionId;
    let isCollapsed_config = fn_coll_config(sessionId);
    let isCollapsed_output = fn_coll_output(sessionId);

    let onColl_config = (v: boolean) => {
        FN_GetDispatch()(
            RuntimeStatusSlice.actions.setCollapseConfig({
                sessionId,
                collapseConfig: v,
            }),
        );
    };
    let onColl_output = (v: boolean) => {
        FN_GetDispatch()(
            RuntimeStatusSlice.actions.setCollapseOutput({
                sessionId,
                collapseOutput: v,
            }),
        );
    };
    let isColl = isCollapsed_config

    let rightActions: ActionButtonProps[] = [
        // {
        //     // icon: "duplicate",
        //     intent: "success",
        //     icon: copied ? "tick" : "duplicate",
        //     text:,
        //     minimal: copied,
        //     title: ,
        //     onClick: () => {
        //     }
        // },
        {
            // icon: "export",
            icon: "download",
            intent: "success" as any,
            className: "btn-purple",
            text: Dot("o52xW", "Export"),
            title: Dot("i88tb", "Export Result to File"),
            onClick: () => {
                AlertUtils.popNotSupport()
            }
        },
        {
            icon: "gantt-chart",
            intent: "none" as any,
            className: "none",
            text: "",
            title: Dot("i8q8tb", "Configure WorkFlow for Input"),
            onClick: () => {
                AlertUtils.popNotSupport()
            }
        },
        {
            icon: "console",
            intent: isColl ? "none" : "success",
            className: isColl ? "" : "btn-lime",
            // title: Dot("RzegarVx1", "Whether to show output results separately"),
            title: Dot("RzegsarVx1", "Whether to show the process panel"),
            onClick() {
                onColl_output(!isCollapsed_output);
                onColl_config(!isCollapsed_config);
            }
        },

        // {
        //     icon: "export",
        //     intent: isCollapsed_output ? "none" : "success",
        //     // title: Dot("Fy217", "Configure Text Transformer"),
        //     title: Dot("G3MJN", "Show Output Panel"),
        //     className: isCollapsed_output ? "" : "btn-lime",
        //     onClick: () => {
        //         onColl_output(!isCollapsed_output);
        //     },
        // },
        // {
        //     icon: "cog",
        //     intent: isCollapsed ? "none" : "success",
        //     // title: Dot("Fy217", "Configure Text Transformer"),
        //     title: Dot("Fy217", "Configure this Tool"),
        //     className: isCollapsed ? "" : "btn-lime",
        //     onClick: () => {
        //         onColl(!isCollapsed);
        //     },
        // },

    ];
    return (
        <div
            className="w-full using-edge-ui-bg flex border-b-[1px] dark:border-gray-600 px-1  flex-column items-center justify-between"
            style={{
                height: controlBarHeight,
            }}
        >
            <div className={controlClz}>
                {leftActions.map(fn_format_button("bottom-start"))}
            </div>
            <div className={controlClz}>
                <CopyButton
                    placement="bottom-end"
                    extraButtonProps={{
                        small: true,
                    }}
                    enableTextMode
                    onCopy={() => {
                        let outputValue = FN_GetActualTextValueByBigTextId(props.outputBigTextId)
                        if (outputValue == '') {
                            AlertUtils.popMsg('warning', {
                                message: Dot("1h6jH", "Warning, the output is an empty value whose length is zero!")
                            })
                        }
                        gutils.copy(outputValue)
                    }}></CopyButton>
                {rightActions.map(fn_format_button("bottom-end"))}
            </div>
        </div>
    );
};

export default TextTransformerControl