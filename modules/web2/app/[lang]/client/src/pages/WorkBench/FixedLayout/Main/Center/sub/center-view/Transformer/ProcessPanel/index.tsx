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


import { Alignment, Button, ButtonProps, FormGroup, Icon, IconName, InputGroup, Intent, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import FaqPanel from './FaqPanel'
import CodePanel from './CodePanel'
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../../utils/cTranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../../reducers/bigTextSlice";
import _, { set } from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER, LabelValuePair } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType, Val_ToolTabIndex } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_config, fn_coll_output, fn_format_button, useCurrentActiveStyle } from "../hooks";
import FormGenPanel, { FormGenItem } from "../../../../../../../../../components/FormGenPanel";
import Operation from "../../../../../../../../../lib/core/Operation.tsx";
import { logutils } from "../../../../../../../../../utils/LogUtils";

export default (props: CommonTransformerPassProp & TransformerWithRuntime) => {
    let crtRuntimeStatus = props.crtRuntimeStatus
    let toolTabIndex = crtRuntimeStatus.toolTabIndex || "output"
    let sessionId = props.sessionId;
    let extVM = props.extVM
    let actions = extVM?.Actions
    let toolHandler = props.toolHandler
    let operList = toolHandler?.getOperations() || []
    let arr: any[] = []
    for (let i = 0; i < 100; i++) {
        arr.push(<div>test {i}</div>)
    }
    logutils.debug("autorun-crtRuntimeStatus", crtRuntimeStatus)
    let generalList: FormGenItem[] = [
        {
            label: Dot("FQzhg", "Ignore Empty Input"),
            helperText: Dot("crD7I", "To configure whether the transformation should ignore the empty input text whose length is zero."),
            genEleConfig: {
                type: "switch",
                value: crtRuntimeStatus.ignoreEmptyStr,
                onChange(newVal) {
                    FN_GetDispatch()(
                        RuntimeStatusSlice.actions.updateValueInStatusMap({
                            sessionId,
                            obj: {
                                ignoreEmptyStr: newVal
                            }
                        })
                    )
                },
            }
        },
        {
            label: Dot("YquQqTXq", "Auto Run?"),
            helperText: Dot("Ye3TXses", "To configure whether the transformation will be executed automatically when the input text is changed."),
            genEleConfig: {
                type: "switch",
                value: crtRuntimeStatus.autoRun,
                onChange(newVal) {
                    FN_GetDispatch()(
                        RuntimeStatusSlice.actions.updateValueInStatusMap({
                            sessionId,
                            obj: {
                                autoRun: newVal
                            }
                        })
                    )
                },
            }
        },
        {
            label: Dot("6AumW", "Default Action"),
            helperText: Dot("nxJC7", "The default action to be executed when the transformer is performed."),
            genEleConfig: {
                type: "select",
                value: crtRuntimeStatus.defaultOperationId,
                onChange(newVal) {
                    // debugger
                    FN_GetDispatch()(
                        RuntimeStatusSlice.actions.updateValueInStatusMap({
                            sessionId,
                            obj: {
                                defaultOperationId: newVal
                            }
                        })
                    )
                },
                selectList: (operList || []).map(x => {
                    return {
                        label: x.name,
                        value: x.id
                    } as LabelValuePair
                })
            }
        }
    ]
    // generalList = [...generalList, ...generalList, ...generalList, ...generalList]
    let finalShowContent = <div>{Dot("zkqUFa", "{0} is not yet configured", toolTabIndex)}</div>
    let pdValue = 'p-2'
    let loadingStatic = false
    let toolHanlder = props.toolHandler

    let v = exportUtils.useSelector((v) => {
        return {
            // show
            bottom_hide: v.layout.menuHide.bottom,
        };
    });
    if (toolTabIndex == 'wiki') {
        pdValue = 'p-0'
        finalShowContent = <div className="w-full h-full overflow-auto">
            <iframe src={toolHanlder?.getMetaInfo().infoURL} className="w-full h-full border-none outline-none"></iframe>
        </div>
    } else if (toolTabIndex == "tools") {
        finalShowContent = <FormGenPanel fixSingleColumn={!v.bottom_hide} list={generalList}></FormGenPanel >
    } else if (toolTabIndex == "output") {
        pdValue = 'p-0'
        finalShowContent = <div className="w-full h-full overflow-auto">
            <GenCodeMirror
                lineWrap
                language={props.crtDefaultOpera?.getInputOutputEditorLang()?.outputLang || "text"}
                placeholder={Dot("y_9YM", "Output will be displayed here.")}
                bigTextId={props.outputBigTextId}
            ></GenCodeMirror>
        </div>
    } else if (toolTabIndex == "faq") {
        finalShowContent = <FaqPanel key={sessionId} {...props}></FaqPanel>
    } else if (toolTabIndex == 'code') {
        finalShowContent = <CodePanel {...props}></CodePanel>
    }
    let loadingTextClz = "text-blue-500 dark:text-blue-300"
    let greenClz = "text-lime-700 dark:text-lime-500"
    let shouldHideLeftTextInBar = !v.bottom_hide // when bottom is not hide, then hide left text
    let textIcon_f: Intent = loadingStatic ? "success" :
        crtRuntimeStatus.processOK ? "success" :
            crtRuntimeStatus.processError ? "warning" : crtRuntimeStatus.processing ? "primary" : "none"
    let icon_f: IconName = loadingStatic ? "changes" :
        crtRuntimeStatus.processError ? "warning-sign" : crtRuntimeStatus.processing ? "refresh" :
            crtRuntimeStatus.processText ? "tick" :
                "console"
    let clz_f = (
        loadingStatic ? "" + (
            greenClz
        ) :
            crtRuntimeStatus.processOK ? greenClz :
                crtRuntimeStatus.processError ? "text-yellow-600" : crtRuntimeStatus.processing ? loadingTextClz : "  "
    )
    let maintext_f = (
        loadingStatic ? Dot("y_9YqM", "Loading static resources...") :
            crtRuntimeStatus.processText ? crtRuntimeStatus.processText : Dot("z-o28we", "Process Panel")
    )
    let iconJSX = <Icon intent={textIcon_f} icon={icon_f} iconSize={shouldHideLeftTextInBar ? 12 : 20} className={(
        shouldHideLeftTextInBar ? " mr-1  " : " mr-2  "
    ) + (
            crtRuntimeStatus.processing ? " animate-spin " : ""
        )} />
    return <div key={props.sessionId} className="h-full overflow-auto relative" style={{
        padding: '1px'
    }}>
        <Navbar>
            <Navbar.Group>

                {
                    shouldHideLeftTextInBar ? <div className={
                        "   " + (

                            loadingStatic || crtRuntimeStatus.processOK ? "" + (
                                "bg-lime-100 dark:bg-lime-800 "
                            ) :
                                crtRuntimeStatus.processError ? "bg-yellow-200 dark:bg-yellow-800 " : crtRuntimeStatus.processing ? " bg-sky-200 dark:bg-sky-800 " : "  bg-zinc-100 dark:bg-zinc-800"
                        ) + ' ' + (
                            "   text-black dark:text-white absolute top-0 right-0 p-1 text-xs flex justify-between items-center"
                        )
                    } style={{
                    }}>{iconJSX}
                        <span style={{
                            fontSize: '9px',
                            marginTop: '-1.5px'
                        }}>
                            {maintext_f}</span>
                    </div> : <Navbar.Heading >
                        {iconJSX}
                        <span className={
                            clz_f
                        }>
                            {maintext_f}
                        </span>
                    </Navbar.Heading>
                }
            </Navbar.Group>
            <Navbar.Group align={shouldHideLeftTextInBar ? Alignment.LEFT : Alignment.RIGHT}>
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
                    <Tab id="tools" icon="cog" title={Dot("XeXF77", "Settings")} tagContent={_.size(generalList)} />

                    <Tab id="faq" icon="manual" title={"FAQ"} />
                    {
                        !toolHandler || toolHanlder?.getMetaInfo()?.hideCodePanel ? '' : <Tab id="code" icon="code" title={Dot("JQEVK", "Code")} />
                    }
                    {/* <Tab id="wiki" icon="globe" title={"Wiki"} /> */}
                    <Tab id="output" icon={
                        crtRuntimeStatus.processError ? "warning-sign" : crtRuntimeStatus.processing ? "changes" : "tick"
                    } title={Dot("FjYbR", "Output")} />
                    {/* <Tab id="history" icon="history" title={Dot("sHoxxW", "History")} /> */}
                </Tabs>
            </Navbar.Group>
        </Navbar>
        <div style={{ height: `calc(100% - 51px)`, overflow: 'auto' }} className={pdValue}>
            {finalShowContent}
        </div>
    </div>
}