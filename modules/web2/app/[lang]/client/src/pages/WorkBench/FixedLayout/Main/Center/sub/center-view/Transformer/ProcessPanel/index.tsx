// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 13 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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
import { Allotment, AllotmentHandle } from "allotment";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../../reducers/bigTextSlice";
import _, { set } from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../../components/SysTabPane";
import { CSS_NAV_BP_TAB_HEIGHT, CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER, LabelValuePair } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType, Val_ToolTabIndex } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_config, fn_coll_output, fn_format_button, useCurrentActiveStyle } from "../hooks";
import FormGenPanel, { FormGenItem } from "../../../../../../../../../components/FormGenPanel";
import Operation from "../../../../../../../../../impl/core/Operation.tsx";
import { logutils } from "../../../../../../../../../utils/LogUtils";
import { useShouldVerticalModeOrNot } from "../index.tsx";
export let ifnil = (v1: any, v2: any) => {
    return v1 === undefined || v1 === null ? v2 : v1
}
// {
//     label: Dot("FQzhg", "Ignore Empty Input"),
//     helperText: Dot("crD7I", "To configure whether the transformation should ignore the empty input text whose length is zero."),
//     genEleConfig: {
//         type: "switch",
//         value: crtRuntimeStatus.ignoreEmptyStr,
//         onChange(newVal) {
//             FN_GetDispatch()(
//                 RuntimeStatusSlice.actions.updateValueInStatusMap({
//                     sessionId,
//                     obj: {
//                         ignoreEmptyStr: newVal
//                     }
//                 })
//             )
//         },
//     }
// },
export default (props: { disableSeparateOutputMode: boolean } & CommonTransformerPassProp & TransformerWithRuntime) => {
    let crtRuntimeStatus = props.crtRuntimeStatus
    let shouldVert = useShouldVerticalModeOrNot()

    let toolTabIndex = crtRuntimeStatus.toolTabIndex || 'tools'
    if (toolTabIndex == 'output') {
        toolTabIndex = 'tools'
    }
    let sessionId = props.sessionId;
    let extVM = props.extVM
    let actions = extVM?.Actions
    let toolHandler = props.toolHandler
    let operList = toolHandler?.getOperations() || []
    let { crtDefaultOpera } = props;

    logutils.debug("autorun-crtRuntimeStatus", crtRuntimeStatus)
    let generalList: FormGenItem[] = useMemo(() => {
        let generalList: FormGenItem[] = []
        if (crtDefaultOpera) {
            let config = crtDefaultOpera.getOptDetail().config
            let args = config.args
            let checks = config.checks
            _.forEach(args, (eachArg) => {
                let { type, name, value: _srcVal } = eachArg;
                if (type == 'boolean') {
                    let value = ifnil(crtRuntimeStatus[name], _srcVal)
                    generalList.push({
                        label: name,
                        genEleConfig: {
                            type: "switch",
                            value: value,
                            onChange(newVal) {
                                FN_GetDispatch()(
                                    RuntimeStatusSlice.actions.updateValueInStatusMap({
                                        sessionId,
                                        obj: {
                                            [name]: newVal
                                        }
                                    })
                                )
                            },
                        }
                    })
                } else if (type == 'option') {
                    let value = crtRuntimeStatus[name] || _srcVal[0]
                    generalList.push({
                        label: name,
                        genEleConfig: {
                            type: "select",
                            value: value,
                            selectList: _.map(_srcVal, (eachValue) => {
                                return {
                                    label: eachValue,
                                    value: eachValue
                                }
                            }),
                            onChange(newVal) {
                                FN_GetDispatch()(
                                    RuntimeStatusSlice.actions.updateValueInStatusMap({
                                        sessionId,
                                        obj: {
                                            [name]: newVal
                                        }
                                    })
                                )
                            },
                        }
                    })
                } else if (type == 'binaryShortString') {
                    let value = ifnil(crtRuntimeStatus[name], _srcVal)
                    let onchg = (e) => {
                        FN_GetDispatch()(
                            RuntimeStatusSlice.actions.updateValueInStatusMap({
                                sessionId,
                                obj: {
                                    [name]: e.target.value
                                }
                            })
                        )
                    }
                    generalList.push({
                        label: name,
                        genEleConfig: {
                            type: "input",
                            inputProps: {
                                value: value,
                                onChange: onchg
                            },
                            value: value,
                            onChange: onchg
                        },
                    })
                }
            });

        }
        generalList = generalList.sort(x => x.genEleConfig.type == 'switch' ? -1 : 1)
        generalList = [
            {
                aid: 'autorun',
                label: Dot("wRuF9WpU6", "Auto Run"),
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
            ...generalList
        ]
        return generalList
    }, [crtDefaultOpera])

    let finalShowContent_l = <div>{Dot("zkqUFa", "{0} is not yet configured", toolTabIndex)}</div>
    let finalShowContent_r = <div>{Dot("zkqUFa", "{0} is not yet configured", toolTabIndex)}</div>
    let pdValue = 'p-2'
    let loadingStatic = false
    let toolHanlder = props.toolHandler
    if (toolTabIndex == 'wiki') {
        pdValue = 'p-0'
        finalShowContent_l = <div className="w-full h-full overflow-auto">
            <iframe src={toolHanlder?.getOperations()[0].getOptDetail()?.infoURL} className="w-full h-full border-none outline-none"></iframe>
        </div>
    } else if (toolTabIndex == "tools") {
        finalShowContent_l = <FormGenPanel fixSingleColumn={!shouldVert} list={generalList}></FormGenPanel >
    } else if (toolTabIndex == "faq") {
        finalShowContent_l = <FaqPanel key={sessionId} {...props}></FaqPanel>
    } else if (toolTabIndex == 'code') {
        finalShowContent_l = <CodePanel {...props}></CodePanel>
    }

    finalShowContent_r = (
        <div className="w-full h-full overflow-auto">
            <GenCodeMirror
                readOnly
                lineWrap
                language={props.crtDefaultOpera?.getInputOutputEditorLang()?.outputLang || "text"}
                placeholder={Dot("y_9YM", "Output will be displayed here.")}
                bigTextId={props.outputBigTextId}
            ></GenCodeMirror>
        </div>
    )

    // useEffect(() => {
    //     if (props.disableSeparateOutputMode) {
    //         if (toolTabIndex == 'output') {
    //             FN_GetDispatch()(RuntimeStatusSlice.actions.setToolTabIndex({ sessionId, tabIndex: "tools" }))
    //         }
    //     }
    // }, [props.disableSeparateOutputMode, toolTabIndex])
    let loadingTextClz = "text-blue-500 dark:text-blue-300"
    let greenClz = "text-lime-700 dark:text-lime-500"
    let shouldHideLeftTextInBar = !shouldVert // when bottom is not hide, then hide left text
    let textIcon_f: Intent = loadingStatic ? "success" :
        crtRuntimeStatus.processOK ? "success" :
            crtRuntimeStatus.processError ? "warning" : crtRuntimeStatus.processing ? "primary" : "none"
    let icon_f: IconName = loadingStatic ? "changes" :
        crtRuntimeStatus.processError ? "warning-sign" : crtRuntimeStatus.processing ? "refresh" :
            crtRuntimeStatus.processText ? "tick" :
                "export"
    let clz_f = (
        loadingStatic ? "" + (
            greenClz
        ) :
            crtRuntimeStatus.processOK ? greenClz :
                crtRuntimeStatus.processError ? "text-yellow-600" : crtRuntimeStatus.processing ? loadingTextClz : "  "
    )
    let maintext_f = (
        loadingStatic ? Dot("y_9YqM", "Loading static resources...") :
            crtRuntimeStatus.processText ? crtRuntimeStatus.processText : Dot("z-o2ssde", "Result Viewer")
    )
    let iconJSX = <Icon intent={textIcon_f} icon={icon_f} iconSize={20} className={(
        shouldHideLeftTextInBar ? " mr-1  " : " mr-2  "
    ) + (
            crtRuntimeStatus.processing ? " animate-spin " : ""
        )} />
    let jsx_left_setting_or_faq = (
        <div className='h-full p-[1px]'>
            <Navbar>

                <Navbar.Group align={Alignment.LEFT}>
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
                    </Tabs>
                </Navbar.Group>
            </Navbar>
            <div style={{ height: `calc(100% - ${CSS_NAV_BP_TAB_HEIGHT}px)`, overflow: 'auto' }} className={pdValue}>
                {finalShowContent_l}
            </div>
        </div>
    )
    let jsx_right_output_or_somethingelse = (
        <div className='h-full p-[1px]'>
            <Navbar>
                <Navbar.Group>
                    <Navbar.Heading >
                        {iconJSX}
                        <span className={
                            clz_f
                        }>
                            {maintext_f}
                        </span>
                    </Navbar.Heading>
                    {/* <div className={
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
                    </div> */}
                </Navbar.Group>
                <Navbar.Group align={Alignment.RIGHT}>
                    <Tabs
                        animate={true}
                        fill={true}
                        // id="navbar"
                        large={false}
                        onChange={(v) => {
                            // FN_GetDispatch()(RuntimeStatusSlice.actions.setToolTabIndex({ sessionId, tabIndex: v as Val_ToolTabIndex }))
                        }}
                        selectedTabId={'output'}
                    >
                        {
                            props.disableSeparateOutputMode ? '' : <Tab id="output" icon={
                                crtRuntimeStatus.processError ? "warning-sign" : crtRuntimeStatus.processing ? "changes" : "generate"
                            } title={Dot("output.text.btn", "Output")} />
                        }
                    </Tabs>
                </Navbar.Group>
            </Navbar>
            <div style={{ height: `calc(100% - ${CSS_NAV_BP_TAB_HEIGHT})`, overflow: 'auto' }} className={'p-0'}>
                {finalShowContent_r}
            </div>

        </div>

    )
    return <div key={props.sessionId} className="w-full h-full">
        <Allotment vertical={!shouldVert}>
            <Allotment.Pane>
                {jsx_left_setting_or_faq}
            </Allotment.Pane>
            <Allotment.Pane>
                {jsx_right_output_or_somethingelse}
            </Allotment.Pane>
        </Allotment>
    </div>

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
                    {
                        props.disableSeparateOutputMode ? '' : <Tab id="output" icon={
                            crtRuntimeStatus.processError ? "warning-sign" : crtRuntimeStatus.processing ? "changes" : "tick"
                        } title={Dot("FjYbR", "Output")} />
                    }
                </Tabs>
            </Navbar.Group>
        </Navbar>
        <div style={{ height: `calc(100% - ${CSS_NAV_BP_TAB_HEIGHT})`, overflow: 'auto' }} className={pdValue}>
            {finalShowContent_l}
        </div>
    </div>
}