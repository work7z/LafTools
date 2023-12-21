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
    ButtonProps,
    Divider,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../styles/var";
import TranslationUtils, { Dot } from "../../utils/TranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice, { ExtensionVM } from "../../reducers/apiSlice";
import { Allotment, AllotmentHandle } from "allotment";


type PassProps = {
    body: () => JSX.Element
}

// TODO: main editor placeholder is useful to show the purpose and meaning of each tools

export default (props: PassProps) => {
    return <Allotment className="flex flex-row">
        <Allotment.Pane preferredSize={180}>
            <div>left menu</div>
        </Allotment.Pane>
        <Allotment.Pane>
            {React.createElement(props.body)}
        </Allotment.Pane>
    </Allotment>
}