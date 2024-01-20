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
import { Dot } from "../../utils/TranslationUtils";
import FormGenElement, { FormGenType } from "../FormGenElement";

export type FormGenItem = FormGroupProps & { genEleConfig: FormGenType }
type PropFormGenPanel = {
    list: (FormGenItem)[]
}
export default (props: PropFormGenPanel) => {
    let chunkItems = _.chunk(props.list, 3);
    return <div className="flex  whitespace-break-spaces pure-g space-y-2">
        {
            chunkItems.map((eachChunkItem, eachChunkItemIdx) => {
                return <div key={eachChunkItemIdx} className=" mb-2 pure-u-s-24-24 pure-u-12-24 pure-u-xxl-6-24 ">
                    {
                        eachChunkItem.map((x, d) => {
                            return (
                                <FormGroup key={d} {...x}>
                                    <FormGenElement config={x.genEleConfig}></FormGenElement>
                                </FormGroup>
                            )
                        })
                    }
                    {/* <hr className="mb-2"/> */}
                </div>
            })
        }
    </div>
}