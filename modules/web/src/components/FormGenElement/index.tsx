
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
import { Dot } from "../../utils/TranslationUtils";

export type FormGenType = {
    type: "select" | "input" | "radio" | "switch";
    inputProps?: InputGroupProps;
    selectList?: LabelValuePair[]
}
export default (props: { config: FormGenType }) => {
    let { config } = props;
    if (config.type == "input") {
        return <InputGroup {...config.inputProps}></InputGroup>
    }
    if (config.type == "select") {
        return <HTMLSelect options={config.selectList}></HTMLSelect>
    }
    // if(config.type == "radio"){
    //     return <RadioGroup ></RadioGroup>
    // }
    if (config.type == "switch") {
        return <Switch label={Dot("h8E01", "Enabled")}></Switch>
    }
    return <div>not yet defined</div>
}