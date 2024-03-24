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

import { type ItemRenderer, Suggest } from "@blueprintjs/select";
import { Alignment, Button, ButtonProps, FormGroup, Icon, IconName, InputGroup, Intent, Menu, MenuItem, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
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
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_output, fn_format_button, useCurrentActiveStyle, useGetNotifyTextFunction } from "../hooks";
import FormGenPanel, { FormGenItem } from "../../../../../../../../../components/FormGenPanel";
import Operation from "../../../../../../../../../impl/core/Operation.tsx";
import { logutils } from "../../../../../../../../../utils/LogUtils";
import { useShouldVerticalModeOrNot } from "../index.tsx";
import EditableOptions from "@/app/[lang]/client/src/components/EditableOptions/index.tsx";
import { ProcessPanelProps } from "./index.tsx";
import ParamStateSlice, { ToolPipeline } from "@/app/[lang]/client/src/reducers/state/paramStateSlice.tsx";
export let ifnil = (v1: any, v2: any) => {
    return v1 === undefined || v1 === null ? v2 : v1
}
export let fn_defaultArgValues = (args) => {
    return args.map(x => x.value)
}
export let useGeneralListRead = (props: ProcessPanelProps) => {
    let sessionId = props.sessionId;
    let extVM = props.extVM
    let actions = extVM?.Actions
    let crtRuntimeStatus = props.crtRuntimeStatus
    let toolHandler = props.toolHandler
    let operList = toolHandler?.getOperations() || []
    let { crtDefaultOpera } = props;
    let crtToolCfg = props.crtToolCfg
    let notifyTextChgFn = useGetNotifyTextFunction(props)
    let generalList: FormGenItem[] = useMemo(() => {
        let generalList: FormGenItem[] = []
        if (crtDefaultOpera) {
            let config = crtDefaultOpera.getOptDetail().config
            let state_pipeobj = crtToolCfg?.pipemap;
            if (!state_pipeobj) {
                state_pipeobj = {}
            }
            let crtOpId = (props.fn_isSidebarMenuOpModeNow(props) ? props.crtSideMenuOperaId : props.crtDefaultOperaId) + "";
            let state_crtPipeline = state_pipeobj[crtOpId + ""] || {}
            let configArgs = config.args
            let configChecks = config.checks

            if (!state_crtPipeline) {
                state_crtPipeline = {
                    a: fn_defaultArgValues(configArgs),
                    d: 'f'
                }
            }

            if (!state_crtPipeline.a && _.size(state_crtPipeline.a) != _.size(configArgs)) {
                state_crtPipeline.a = fn_defaultArgValues(configArgs)
            }

            let _eachArgIdx: number = -1
            _.forEach(configArgs, (eachArg) => {
                _eachArgIdx++
                let eachArgIdx = _eachArgIdx
                let { type, name, value: _defaultValue } = eachArg;
                let state_currentValue = state_crtPipeline.a[eachArgIdx]
                let updateValueToState = (newVal) => {
                    let newA = [...state_crtPipeline.a]
                    newA[eachArgIdx] = newVal
                    FN_GetDispatch()(
                        ParamStateSlice.actions.updateCrtToolCfg({
                            sessionId: props.sessionId,
                            pipeMapKey: crtOpId,
                            pipeMapValue: {
                                a: newA,
                                d: state_crtPipeline.d
                            }
                        })
                    )
                    notifyTextChgFn(true)
                }
                // let currentCheck = checks[eachArgIdx]
                // TODO: add check
                switch (type) {
                    case 'boolean':
                        {
                            let value = ifnil(state_currentValue, _defaultValue)
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "switch",
                                    value: value ? 'true' : 'false',
                                    onChange(newVal) {
                                        updateValueToState(newVal == 'true')
                                    },
                                }
                            })
                        }
                        break;
                    case 'option':
                        {
                            let value = state_currentValue || _defaultValue[0]
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "select",
                                    value: value,
                                    selectList: _.map(_defaultValue, (eachValue) => {
                                        return {
                                            label: eachValue,
                                            value: eachValue
                                        }
                                    }),
                                    onChange(newVal) {
                                        updateValueToState(newVal)
                                    },
                                }
                            })
                        }
                        break;
                    case "string":
                    case "binaryString":
                    case "byteArray":
                    case "shortString":
                    case 'binaryShortString':
                    case "number":
                        {
                            let isNumber = type == "number"
                            let hasShort = type.indexOf("short") > -1 || type.indexOf("Short") > -1
                            let value = ifnil(state_currentValue, _defaultValue)
                            let onchg = (e) => {
                                updateValueToState(e.target.value)
                                // props.onProcess()
                            }
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "input",
                                    inputProps: {
                                        intent: (value.length == 0) ? "danger" : "none",
                                        type: isNumber ? "number" : "text",
                                        value: value,
                                        onChange: onchg,
                                        fill: !hasShort
                                    },
                                    value: value,
                                    onChange: onchg
                                },
                            })
                        }
                        break;
                    case 'editableOption':
                    case "editableOptionShort":
                        {
                            let value = ifnil(state_currentValue, _defaultValue[0]['value'])
                            let onchg = (val: string) => {
                                updateValueToState(val)
                            }
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "jsx",
                                    jsxEle: <EditableOptions list={_defaultValue} value={value} onChange={onchg} />
                                },
                            })
                        }
                        break;
                    default:
                        {
                            generalList.push({
                                label: name,
                                genEleConfig: {
                                    type: "jsx",
                                    jsxEle: <div>Not yet supported, {name} missed {type}</div>
                                },
                            })
                        }
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
    }, [crtDefaultOpera, crtDefaultOpera, crtToolCfg, props.crtSideMenuOperaId])
    return generalList;
}