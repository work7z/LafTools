// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <get>
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
} from "@blueprintjs/core";
import gutils from "../../utils/GlobalUtils";
import "./index.scss";
import { Dot } from "../../utils/TranslationUtils";
import { useHistory } from "react-router";
import { useEffect, useRef, useState } from "react";
import { CSS_TEXT_ANCHOR_CSS, LAFTOOLS_DEFAULT_USERNAME, URL_WORKBENCH, VAL_CSS_MENU_TITLE_PANEL } from "../../types/constants";
import LanguageFlowList from '../../containers/LanguageFlowList'
import RouteUtils from "../../utils/RouteUtils";
import PageUtils from "../../utils/PageUtils";
import MottoLine from "../../components/MottoLine";
import { AdminUserPassProp, AdministratorSetupPanel, LocalUserPanel, UserPassProp } from "../../containers/UserAskMultipleDialogs";
import apiSlice from "../../reducers/apiSlice";
import { ACTION_callRefreshAll } from "../../reducers/systemSlice";
import { FN_GetDispatch } from "../../nocycle";
import exportUtils from "../../utils/ExportUtils";

export let FooterContent = () => {
    return <div className='  w-8/12 space-y-3 mx-auto bp5-text-muted  break-words pt-8 flex flex-col pb-6' >
        <LanguageFlowList></LanguageFlowList>
        <i className="text-xs">            <MottoLine singleLineMode={true}></MottoLine></i>
        <div className='space-x-3'>
            {
                [
                    {
                        label: Dot("OQWm4", "Report a Bug"),
                        link: "https://github.com/work7z/LafTools/issues"
                    },
                    {
                        label: Dot("zmDWx", "Contact Us"),
                        link: "mailto:work7z@outlook.com"
                    },
                    {
                        label: Dot("V6U_f", "Terms of Service"),
                        link: "https://codegen.cc/main/license/main"
                    },
                    {
                        label: Dot("d5LAU", "Licensed under AGPLv3"),
                        link: "https://github.com/work7z/LafTools/"
                        // link: 'https://en.wikipedia.org/wiki/Affero_General_Public_License'
                    },

                ].map(x => {
                    return <a href={x.link} className={CSS_TEXT_ANCHOR_CSS} target='_blank'>{x.label}</a>
                })
            }
        </div>
        <div>
            <b>
                <a className={CSS_TEXT_ANCHOR_CSS} href="https://laf-tools.com" target='_blank'>{Dot("flK30", "Powered by LafTools team")}</a>
            </b>
        </div>
        {/* <div>
        LafTools <a href="https://laf-tools.com">https://laf-tools.com</a>
    </div> */}
    </div>
}

let InnerContent = () => {
    const localAccountObject: { current: UserPassProp } = useRef({
        username: LAFTOOLS_DEFAULT_USERNAME,
        password: "",
    });
    let hist = useHistory()
    const admin_localAccountObject: { current: AdminUserPassProp } = useRef({
        username: LAFTOOLS_DEFAULT_USERNAME,
        password: "",
        confirmPassword: "",
        token: "",
        NeedAdminInit: true,
    });
    let stepIdx = 1
    const [loadLeftPage, onloadLeftPage] = useState("");
    const infoQueryObj = apiSlice.useGetVisitAdminInitInfoQuery(
        {
            stepIdx,
            ...exportUtils.refresh_v1()
        },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    let showDoAdminStuff = !(
        infoQueryObj.isSuccess
        && infoQueryObj.data?.payload?.value?.HasAdminInit
    )
    let showJSX = <div>not yet defined</div>
    if (showDoAdminStuff) {
        showJSX = <AdministratorSetupPanel
            stepIdx={stepIdx}
            loadLeftPage={loadLeftPage}
            admin_localAccountObject={admin_localAccountObject.current}
            localAccountObject={localAccountObject.current}
            notifyCreatedOK={()=>{
                infoQueryObj.refetch()
            }}
            selectedValue="0"
            onChange={(v) => v}
        ></AdministratorSetupPanel>
    } else {
        showJSX = <LocalUserPanel
            localAccountObject={localAccountObject.current}
            loadLeftPage={loadLeftPage}
            selectedValue="0"
            notifyCreatedOK={()=>{
                FN_GetDispatch()(
                    ACTION_callRefreshAll()
                )
                hist.push(URL_WORKBENCH)
                infoQueryObj.refetch()
                // TODO: remove the ugly reload code
                location.reload()
            }}
            onChange={(v) => v}
        />
    }

    return showJSX
}

export default () => {
    PageUtils.useUpdateTitle(Dot("SGs7B", "Setup Your LafTools Quickly"), [])

    return <div
        className="flex flex-col bg-slate-200 dark:bg-gray-800  text-center p-8"
        style={{
            height: `calc(100vh - ${VAL_CSS_MENU_TITLE_PANEL}px)`,
            paddingBottom:'30px',
            overflow:'auto',
        }}
    >
        <div className="" style={{
            flex: 1
        }}>
        <Card style={{
            // minHeight: '400px'
        }} className='w-6/12 flex  mx-auto text-left  '>
            <InnerContent></InnerContent>
        </Card>
        </div>
        <FooterContent></FooterContent>
    </div>
}