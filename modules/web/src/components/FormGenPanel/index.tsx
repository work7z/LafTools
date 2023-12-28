
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
    return <div className="p-2 whitespace-break-spaces">
        {
            props.list.map((x, d) => {
                return (
                    <FormGroup key={d} {...x}>
                        <FormGenElement config={x.genEleConfig}></FormGenElement>
                    </FormGroup>
                )
            })
        }
    </div>
}