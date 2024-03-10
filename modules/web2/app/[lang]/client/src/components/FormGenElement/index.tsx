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
    Switch,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { LabelValuePair } from "../../types/constants";
import { Dot } from "../../utils/cTranslationUtils";
import FormSwitch from "../FormSwitch";

export type FormGenType = {
    type: "select" | "input" | "radio" | "switch";
    inputProps?: InputGroupProps;
    selectList?: LabelValuePair[]
    value?: string;
    onChange: (str: string) => any
}
export default (props: { config: FormGenType }) => {
    let { config } = props;
    if (config.type == "input") {
        return <InputGroup {...config.inputProps}></InputGroup>
    }
    if (config.type == "select") {
        return <HTMLSelect value={config.value} onChange={x => {
            config.onChange(x.target.value)
        }} options={config.selectList}></HTMLSelect>
    }
    // if(config.type == "radio"){
    //     return <RadioGroup ></RadioGroup>
    // }
    if (config.type == "switch") {
        return <FormSwitch value={config.value || 'false'} onChange={config.onChange} ></FormSwitch>
    }
    return <div>not yet defined</div>
}