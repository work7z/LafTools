// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 13 Jan 2024
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


import { Alignment, Button, ButtonProps, FormGroup, Icon, InputGroup, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../utils/TranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice";
import _, { set } from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useRef, useState } from "react";
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
import loadLib from "../../../../../../../../lib/core/loadLib";
import Operation from "../../../../../../../../lib/core/Operation.mjs";

export default (props: CommonTransformerPassProp & TransofrmerWithRuntime) => {
    let crtRuntimeStatus = props.crtRuntimeStatus
    let toolTabIndex = crtRuntimeStatus.toolTabIndex || "output"
    let sessionId = props.sessionId;
    let extVM = props.extVM
    let actions = extVM?.Actions
    let arr: any[] = []
    for (let i = 0; i < 100; i++) {
        arr.push(<div>test {i}</div>)
    }
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
                        label: x.Label,
                        value: x.Id
                    } as LabelValuePair
                })
            }
        }
    ]
    let finalShowContent = <div>{Dot("zkqUFa", "{0} is not yet configured", toolTabIndex)}</div>
    let pdValue = 'p-2'
    let loadingStatic = false
    if (toolTabIndex == "tools") {
        finalShowContent = <FormGenPanel list={generalList}></FormGenPanel >
    } else if (toolTabIndex == "output") {
        pdValue = 'p-0'
        finalShowContent = <div className="w-full h-full overflow-auto">
            <GenCodeMirror
                placeholder={Dot("y_9YM", "Output will be displayed here.")}
                bigTextId={props.outputBigTextId}
            ></GenCodeMirror>
        </div>
    }
    let loadingTextClz = "text-blue-500 dark:text-blue-300"
    let greenClz = "text-lime-700 dark:text-lime-500"
    return <div className="h-full overflow-auto " style={{
        padding: '1px'
    }}>
        <Navbar>
            <Navbar.Group>
                <Navbar.Heading >

                    {/* Page: <strong>{''}</strong> */}
                    <Icon intent={
                        loadingStatic ? "success" :
                            crtRuntimeStatus.processOK ? "success" :
                                crtRuntimeStatus.processError ? "warning" : crtRuntimeStatus.processing ? "primary" : "none"
                    } icon={
                        loadingStatic ? "changes" :
                            crtRuntimeStatus.processError ? "warning-sign" : crtRuntimeStatus.processing ? "refresh" :
                                crtRuntimeStatus.processText ? "tick" :
                                    "code"} iconSize={20} className={"mr-2  " + (
                                        crtRuntimeStatus.processing ? " animate-spin " : ""
                                    )} />
                    <span className={
                        loadingStatic ? "" + (
                            greenClz
                        ) :
                            crtRuntimeStatus.processOK ? greenClz :
                                crtRuntimeStatus.processError ? "text-yellow-600" : crtRuntimeStatus.processing ? loadingTextClz : "  "
                    }>
                        {
                            loadingStatic ? Dot("y_9YqM", "Loading static resources...") :
                                crtRuntimeStatus.processText ? crtRuntimeStatus.processText : Dot("z-o28we", "Process Panel")
                            // crtRuntimeStatus.processError ? Dot("jOXj0", "Opps, something went wrong.") :
                            //     crtRuntimeStatus.processing ?  : 
                        }
                    </span>
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
                    <Tab id="output" icon={
                        crtRuntimeStatus.processError ? "warning-sign" : crtRuntimeStatus.processing ? "changes" : "tick"
                    } title={Dot("FjYbR", "Output")} />
                    <Tab id="tools" icon="cog" title={Dot("XeXF77", "Settings")} tagContent={_.size(toolList)} />
                    <Tab id="history" icon="history" title={Dot("sHoxxW", "History")} />
                </Tabs>
            </Navbar.Group>
        </Navbar>
        <div style={{ height: `calc(100% - 51px)`, overflow: 'auto' }} className={pdValue}>
            {finalShowContent}
        </div>
    </div>
}