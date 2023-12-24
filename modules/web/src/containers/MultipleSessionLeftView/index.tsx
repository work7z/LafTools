// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
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
    ButtonProps,
    Divider,
    Tree,
    TreeNodeInfo,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../types/constants";
import TranslationUtils, { Dot } from "../../utils/TranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice from "../../reducers/apiSlice";
import { ExtensionVM } from '../../types/purejs-types-READ_ONLY'

import { Allotment, AllotmentHandle } from "allotment";
import { SessionMapAttr } from "../../reducers/container/sessionSlice";


type SessionViewProp = {
    sessionId: string | null; // if null, then no session is selected
};



type PassProps = {
    defaultSessionId: string;
    defaultSessionArr: TreeNodeInfo[];
    defaultSessionMap: { [key: string]: SessionMapAttr };
    sessionType: string;
    body: React.FunctionComponent<SessionViewProp>;
};


export default (props: PassProps) => {
    let Body = props.body;
    let [hoverId, onHoverId] = useState<string | null>(null)
    let activeSessionId = props.defaultSessionId;
    let nodes: TreeNodeInfo[] = props.defaultSessionArr;
    // format
    let formattedNodes = useMemo(() => {
        return nodes.map(x => {
            x.isSelected = x.id == activeSessionId;
            x.secondaryLabel = x.id == hoverId ? <div className="whitespace-nowrap flex flex-row">
                <Tooltip placement="bottom" content={Dot("4K_vhq", "Duplicate this tab")}>
                    <Button minimal small icon={"duplicate"}></Button>
                </Tooltip>
                <Tooltip placement="bottom" content={Dot("U4qqq9", "Remove this tab from list")}>
                    <Button minimal small icon={"trash"}></Button>
                </Tooltip>
            </div> : null
            return x;
        })
    }, [nodes, hoverId])
    return (
        <Allotment className="flex flex-row">
            <Allotment.Pane preferredSize={180}>
                <Tree
                    className="laft-small-tree"
                    contents={formattedNodes}
                    onNodeMouseEnter={(x) => {
                        onHoverId(x.id + "")
                    }}
                    onNodeMouseLeave={(x) => {
                        onHoverId(null)
                    }}
                    onNodeClick={(x) => {
                        activeSessionId = x.id + "";
                    }}
                ></Tree>
                <Button fill text={Dot("bT4R6", "New Tab")} intent="none" icon="add" small minimal className="mt-2 laft-secondary-btn"></Button>
            </Allotment.Pane>
            <Allotment.Pane>
                <Body sessionId={activeSessionId} />
            </Allotment.Pane>
        </Allotment>
    );
};
