
import { Alignment, Button, ButtonProps, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../utils/TranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice";
import _ from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";
import { fn_format_description } from "../../../../../../../../types/workbench-fn";
import { CommonTransformerProps } from "./types";
import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransofrmerWithRuntime, controlBarHeight, controlClz, fn_coll_config, fn_coll_output, fn_format_button } from "./hooks";


let TextTransformerControl = (props: TextTransformerProps & TransofrmerWithRuntime) => {
    let { inputBigTextId } = props;
    let [loadExample, onLoadExample] = useState(false);
    let extVM = props.extVM
    let actions: ExtensionAction[] | undefined = extVM?.Actions
    let leftActions: ButtonProps[] = [
        ...(actions || []).map(x => {
            return {
                text: x.Label,
                intent: "primary",
                title: x.TooltipByInit,
                onClick: () => {
                    //
                },
            }
        }) as ButtonProps[],
        // {
        //   text: Dot("g4lqi", "Get MD2 Hash"),
        //   intent: "primary",
        //   title: Dot("Zpqqpf", "Encrypt the data with MD2"),
        // },
        {
            text: Dot("2bqHk", "Load from File"),
            intent: "none",
            title: Dot("NNfJo", "Load Data from File"),
            onClick: () => {
                //
            },
        },
        {
            text: Dot("IWUH5", "Show Example"),
            intent: "none",
            className: "",
            title: Dot("NNd1o", "Use Example for Testing"),
            loading: loadExample,
            onClick: async () => {
                try {
                    onLoadExample(true);
                    let r = await AjaxUtils.DoStaticRequest({
                        url: "/example/javascript-s.txt",
                    });
                    if (r.status != 200) {
                        throw new Error(Dot("vU17B", "Unable to send the request"));
                    }
                    let val = r.data;
                    FN_GetDispatch()(
                        FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, val),
                    );
                    AlertUtils.popOK(Dot("gsHQM", "Loaded example data successfully"));
                } catch (e) {
                    console.log(e);
                    AlertUtils.popError(e as any);
                } finally {
                    onLoadExample(false);
                }
            },
        },
    ];
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
    let rightActions: ButtonProps[] = [
        {
            icon: "duplicate",
            intent: "success",
            text: Dot("Mg4ldi", "Copy"),
            title: Dot("2JyFN", "Copy Result to Clipboard"),
        },
        {
            // icon: "export",
            icon: "download",
            intent: "success" as any,
            className: "btn-purple",
            text: Dot("o52xW", "Export"),
            title: Dot("i88tb", "Export Result to File"),
        },
        {
            icon: "gantt-chart",
            intent: "none" as any,
            className: "none",
            text: "",
            title: Dot("i8q8tb", "Configure WorkFlow for Input"),
        },
        {
            icon: "console",
            intent: isColl ? "none" : "success",
            className: isColl ? "" : "btn-lime",
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
                {rightActions.map(fn_format_button("bottom-end"))}
            </div>
        </div>
    );
};

export default TextTransformerControl