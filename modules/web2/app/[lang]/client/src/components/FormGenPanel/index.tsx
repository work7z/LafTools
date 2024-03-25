// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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


import localforage from "localforage";
import {
    Callout,
    PanelStack,
    ProgressBar,
    AnchorButton,
    Tooltip,
    Dialog,
    Drawer,
    Overlay,
    Alert,
    RadioGroup,
    MenuItem,
    Radio,
    ButtonGroup,
    TextArea,
    HotkeysProvider,
    Intent,
    Position,
    Toaster,
    Checkbox,
    NumericInput,
    FormGroup,
    HTMLSelect,
    ControlGroup,
    InputGroup,
    Navbar,
    NavbarHeading,
    NonIdealState,
    NavbarDivider,
    NavbarGroup,
    Alignment,
    Classes,
    Icon,
    Card,
    Elevation,
    Button,
    FormGroupProps,
    InputGroupProps,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { LabelValuePair } from "../../types/constants";
import { Dot } from "../../utils/cTranslationUtils";
import FormGenElement, { FormGenType } from "../FormGenElement";

export type FormGenItem = FormGroupProps & { aid?: string, genEleConfig: FormGenType }
type PropFormGenPanel = {
    onReset: () => any,
    list: (FormGenItem)[]
    fixSingleColumn?: boolean
}
export default (props: PropFormGenPanel) => {
    let chunkItems = props.fixSingleColumn ? [props.list] : _.chunk(props.list, 3);
    let [ok, setOk] = useState(false)
    return <div className="w-full select-none">
        <div className="flex  whitespace-break-spaces pure-g  ">
            {
                chunkItems.map((eachChunkItem, eachChunkItemIdx) => {
                    return <div key={eachChunkItemIdx} className={" mb-2  " + (
                        props.fixSingleColumn ? " w-1/1 " : " p-2 w-1/1 md:w-1/3 lg:w-1/3"
                    )}>
                        {
                            eachChunkItem.map((x, d) => {
                                let innerCtn = <FormGenElement label={x.label + ""} config={x.genEleConfig}></FormGenElement>
                                if (x.genEleConfig.type == 'switch') {
                                    return <div>{innerCtn}</div>
                                }
                                return (
                                    <FormGroup key={d} {...x}>
                                        {innerCtn}
                                    </FormGroup>
                                )
                            })
                        }
                    </div>
                })
            }
        </div>
        <div>
            <Button minimal={ok} intent={ok ? 'success' : 'none'} text={ok ?
                Dot('4Bcqo4Q', "OK, Reset Done!")
                : Dot("vGomqwTc", "Reset Config")
            } onClick={() => {
                props.onReset()
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                }, 1000)
            }}></Button>
        </div>
    </div>
}