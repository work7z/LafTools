
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
import { TransofrmerWithRuntime, fn_coll_output, useCurrentActiveStyle } from "./hooks";

// TODO: provide additionl layout like half to half. ops, I got back-to-back meetings, let us go
let TextTransformerOutput = (props: CommonTransformerPassProp & TransofrmerWithRuntime) => {
    let sessionId = props.sessionId;
    let isCollapsed = fn_coll_output(sessionId);
    let extVM = props.extVM
    let rtStatus = props.crtRuntimeStatus
    let activeActionId = exportUtils.useSelector((x) => {
        let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.activeActionId;
        if (_.isNil(v)) {
            v = "N/A";
        }
        return {
            v: v,
        };
    }).v;
    let onColl = (v: boolean) => {
        FN_GetDispatch()(
            RuntimeStatusSlice.actions.setCollapseOutput({
                sessionId,
                collapseOutput: v,
            }),
        );
    };
    let currentStyleForActive = useCurrentActiveStyle(props.sessionId, "output");
    // let h =' w-[38.2%] h-[38.2%] '
    let h = " w-[44%] h-[42%] min-w-[450px] ";
    if (!extVM) {
        return <div>unknown extVM</div>
    }
    return (
        <div
            onClick={() => {
                FN_GetDispatch()(
                    RuntimeStatusSlice.actions.selectLatestViewPanel({
                        sessionId,
                        panelId: "output",
                    }),
                );
            }}
            className={
                "absolute bottom-0 right-0  " +
                h +
                CSS_TW_LAYOUT_BORDER +
                " border-r-0   " +
                ""
                // (isCollapsed ? " border-b-0 " : "")
            }
            style={{
                ...currentStyleForActive,
                // zIndex: 80,
                ...(isCollapsed
                    ? {
                        height: VAL_CSS_TAB_TITLE_PANEL,
                    }
                    : {}),
                transition: CSS_TRANSITION_WIDTH_HEIGHT_ONLY,
            }}
        >
            <SysTabPane
                hasOpacityWhenUnfocus={true}
                crtLeftNavId={props.sessionId + "output"}
                leftNavList={[
                    {
                        icon: "export",
                        // TODO: let user can decide which id is ok
                        label: Dot("Dj9qqwk", "Output"),
                        value: "drawer",
                    }
                    // ...(extVM.Actions || []).map(x => {
                    //   return 
                    // })
                ]}
                rightCtrls={
                    <Button
                        onClick={() => {
                            onColl(!isCollapsed);
                        }}
                        small
                        minimal
                        rightIcon={!isCollapsed ? "chevron-up" : "chevron-down"}
                    ></Button>
                }
                children={
                    isCollapsed ? (
                        <span></span>
                    ) : (
                        <div className="w-full h-full overflow-auto">
                            <GenCodeMirror
                                placeholder={Dot("y_9YM", "Output will be displayed here.")}
                                bigTextId={props.outputBigTextId}
                            ></GenCodeMirror>
                        </div>
                    )
                }
            ></SysTabPane>
        </div>
    );
};

export default TextTransformerOutput
