// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 11 Jan 2024
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

import { Tag } from "@blueprintjs/core"
import { Dot } from "../../utils/TranslationUtils"
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
    Popover,
    Menu,
    MenuDivider,
} from "@blueprintjs/core";
import AlertUtils from "../../utils/AlertUtils";

export type TagType = {
    // tooltip: string; // TODO: provide tooltip for each tag
    id: string;
    name: string
    icon: string
}

// provide React components TagList based on blueprintjs framework
let TagList = (props: {
    tags: TagType[]
    onNewTag: (name: string) => void,
    activeTag?: string
    setActiveTag: (tag: string) => void
}) => {
    let formattedTags: TagType[] = [{
        id: "all",
        name: Dot("YrTdq", "All"),
        icon: "app-header",
    }, ...props.tags]
    return <div className="px-2 py-2 space-x-2 bg-slate-100 dark:bg-slate-700">
        {formattedTags.map((e, i) => {
            let isactive = e.id == props.activeTag
            return <Tag
                icon={e.icon as any}
                className={isactive ? "btn-purple" : 'tag-gray'}
                intent={isactive ? "primary" : "none"}
                onClick={() => {
                    props.setActiveTag(e.id)
                }}
                minimal={!isactive}
                interactive={true}
                children={e.name}
            ></Tag>
        })}
        <Tag minimal icon="add" onClick={() => {
            let tid = "s89rM"
            AlertUtils.win_prompt({
                id: tid,
                msg: Dot("eqkqd4W", "Please provide a name for the new tag"),
                fn(yesOrNo: boolean, obj) {
                    if (!obj?.iptIfHave) {
                        AlertUtils.popError(new Error(Dot("JA_Bp", "Please provide a name for the new tag at first.")))
                        return
                    }
                    if (yesOrNo) {
                        props.onNewTag(obj?.iptIfHave)
                        AlertUtils.deletePromptList(tid);
                    }
                },
            })
        }} interactive intent="success"></Tag>
    </div >
}
export default TagList