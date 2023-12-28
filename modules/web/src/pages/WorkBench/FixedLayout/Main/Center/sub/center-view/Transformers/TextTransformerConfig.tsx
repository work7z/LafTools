// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
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


import { Alignment, Button, ButtonProps, FormGroup, InputGroup, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
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
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER, LabelValuePair } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";
import { fn_format_description } from "../../../../../../../../types/workbench-fn";
import { CommonTransformerProps } from "./types";
import { ExtensionAction, ToolDefaultOutputType, Val_ToolTabIndex } from "../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransofrmerWithRuntime, controlBarHeight, controlClz, fn_coll_config, fn_coll_output, fn_format_button, useCurrentActiveStyle } from "./hooks";
import FormGenPanel, { FormGenItem } from "../../../../../../../../components/FormGenPanel";


let TextTransformerConfig = (props: CommonTransformerPassProp & TransofrmerWithRuntime) => {
    let crtRuntimeStatus = props.crtRuntimeStatus
    let toolTabIndex = crtRuntimeStatus.toolTabIndex || "general"
    let sessionId = props.sessionId;
    let extVM = props.extVM
    let actions = extVM?.Actions
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
    let w = "350px";
    let toolList = [
        //
    ];
    let generalList: FormGenItem[] = [
        {
            label: Dot("YuQqTX", "Auto Run?"),
            helperText: Dot("YuQTX", "Whether to run the transformer automatically when the input text is changed."),
            genEleConfig: {
                type: "switch",
            }
        },
        {
            label: Dot("6AumW", "Default Action"),
            helperText: Dot("nxJC7", "The default action to be executed when the transformer is performed."),
            genEleConfig: {
                type: "select",
                selectList: (actions || []).map(x => {
                    return {
                        label: x.LabelByInit,
                        value: x.Id
                    } as LabelValuePair
                })
            }
        }
    ]
    let finalShowContent = <div>not yet defiend</div>
    if (toolTabIndex == "general") {
        finalShowContent = <FormGenPanel list={generalList}></FormGenPanel >
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
                "absolute right-0 overflow-y-visible  bg-white dark:bg-black   " +
                CSS_TW_LAYOUT_BORDER +
                " border-r-0   "
            }
            style={{
                ...currentStyleForActive,
                top: controlBarHeight * 3 + "px",
                // width: "26%",
                // minWidth: w,
                width: w,
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
                children={<div className="h-full overflow-auto">
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
                                <Tab id="tools" title={Dot("GKQDO", "Tools")} tagContent={4} />
                                <Tab id="general" title={Dot("sHoxxW", "Conversion")} tagContent={_.size(generalList)} />
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