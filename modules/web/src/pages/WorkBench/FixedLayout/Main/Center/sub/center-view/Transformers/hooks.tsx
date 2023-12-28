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

export let controlBarHeight = VAL_CSS_CONTROL_PANEL;
export let controlClz = "space-x-1 flex  flex-coumn items-center justify-between";

export type TransofrmerWithRuntime = {
    crtRuntimeStatus: ToolDefaultOutputType;
}
export let fn_coll_output = (sessionId) => {
    return exportUtils.useSelector((x) => {
        let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.collapseOutput;
        if (_.isNil(v)) {
            v = true;
        }
        return {
            v: v,
        };
    }).v;
};

export let useCurrentActiveStyle = (sessionId: string, panelId: string) => {
    let crt_panelId = exportUtils.useSelector((x) => {
        let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.latestViewPanelId;
        if (_.isNil(v)) {
            v = "N/A";
        }
        return {
            v: v,
        };
    }).v;
    return crt_panelId === panelId
        ? {
            zIndex: 20,
        }
        : {};
};

export let fn_coll_config = (sessionId) => {
    return exportUtils.useSelector((x) => {
        let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.collapseConfig;
        if (_.isNil(v)) {
            v = true;
        }
        return {
            v: v,
        };
    }).v;
};

export let fn_format_button = (pmt: string) => {
    return (x: ButtonProps) => {
        return (
            <Tooltip placement={pmt as any} content={x.title}>
                <Button
                    {...x}
                    title={""}
                    small
                    intent={x.intent}
                    text={x.text}
                ></Button>
            </Tooltip>
        );
    };
};

export type TextTransformerProps = CommonTransformerProps;
