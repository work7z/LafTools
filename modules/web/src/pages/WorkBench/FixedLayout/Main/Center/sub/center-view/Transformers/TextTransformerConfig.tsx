
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
import { ExtensionAction, ToolDefaultOutputType, Val_ToolTabIndex } from "../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransofrmerWithRuntime, controlBarHeight, controlClz, fn_coll_config, fn_coll_output, fn_format_button, useCurrentActiveStyle } from "./hooks";


let TextTransformerConfig = (props: CommonTransformerPassProp & TransofrmerWithRuntime) => {
    let crtRuntimeStatus = props.crtRuntimeStatus
    let toolTabIndex = crtRuntimeStatus.toolTabIndex || "general"
    let sessionId = props.sessionId;
    let isCollapsed = fn_coll_config(sessionId);
    let onColl = (v: boolean) => {
        FN_GetDispatch()(
            RuntimeStatusSlice.actions.setCollapseConfig({
                sessionId,
                collapseConfig: v,
            }),
        );
    };
    let currentStyleForActive = useCurrentActiveStyle(props.sessionId, "config");
    let w = "320px";
    let finalShowContent = <div>not yet defiend</div>
    if (toolTabIndex == "general") {
        finalShowContent = <div>general</div>
    } else if (toolTabIndex == "tools") {
        finalShowContent = <div>tools</div>
    }
    return (
        <div
            onClick={() => {
                FN_GetDispatch()(
                    RuntimeStatusSlice.actions.selectLatestViewPanel({
                        sessionId,
                        panelId: "config",
                    }),
                );
            }}
            className={
                "absolute right-0   bg-white dark:bg-black   " +
                CSS_TW_LAYOUT_BORDER +
                " border-r-0   "
            }
            style={{
                ...currentStyleForActive,
                top: controlBarHeight * 3 + "px",
                // width: "26%",
                minWidth: w,
                // maxHeight: "70%",
                height: "70%",
                transition: CSS_TRANSITION_WIDTH_HEIGHT_ONLY,
                transform: isCollapsed ? "translateX(" + w + ")" : "",
            }}
        >
            <div className="absolute left-0 top-0 ">
                {/* <Tooltip
          content={Dot("J5aL1", "Toggle the visibility of tool config panel")}
          style={{
            // transform: "rotate(-90deg) translateY(-54px) translateX(-22px)",
            transform: "translateX(-30px)",
          }}
          // placement="bottom-end"
        > */}
                <Button
                    style={{
                        // transform: "rotate(-90deg) translateY(-54px) translateX(-22px)",
                        transform: "translateX(-30px)",
                    }}
                    title={Dot("J5aL1", "Toggle the visibility of tool config panel")}
                    onClick={() => {
                        onColl(!isCollapsed);
                    }}
                    // text={Dot("0ji-Z", "Collapse Config")}
                    icon={isCollapsed ? "chevron-right" : "chevron-left"}
                    intent="none"
                ></Button>
                {/* </Tooltip> */}
            </div>
            <SysTabPane
                hasOpacityWhenUnfocus={true}
                crtLeftNavId={props.sessionId + "config"}
                leftNavList={[
                    {
                        icon: "cog",
                        label: Dot("I88nZ", "Tools Config"),
                        value: "drawer",
                    },
                ]}
                rightCtrls={
                    <Button
                        onClick={() => {
                            // onColl(!isCollapsed);
                        }}
                        small
                        minimal
                    // rightIcon={!isCollapsed ? "chevron-up" : "chevron-down"}
                    ></Button>
                }
                children={<div>
                    <Navbar>
                        <Navbar.Group>
                            <Navbar.Heading>
                                {/* Page: <strong>{''}</strong> */}
                                {Dot("ZIHEO", "Settings")}
                            </Navbar.Heading>
                        </Navbar.Group>
                        <Navbar.Group align={Alignment.RIGHT}>
                            <Tabs
                                animate={true}
                                fill={true}
                                id="navbar"
                                large={false}
                                onChange={(v) => {
                                    FN_GetDispatch()(RuntimeStatusSlice.actions.setToolTabIndex({ sessionId, tabIndex: v as Val_ToolTabIndex }))
                                }}
                                selectedTabId={toolTabIndex}
                            >
                                {/* icon={"home"} */}
                                {/* icon={"folder-open"} */}
                                <Tab id="general" title={Dot("sHoxW", "General")} tagContent={0} />
                                <Tab id="tools" title={Dot("GKQDO", "Tools")} tagContent={4} />
                            </Tabs>
                        </Navbar.Group>
                    </Navbar>
                    {
                        finalShowContent
                    }
                </div>}
            ></SysTabPane>
        </div>
    );
};

export default TextTransformerConfig;