
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

let FooterContent = () => {
    return <div className='w-8/12 space-y-3 mx-auto bp5-text-muted  break-words pt-8 flex flex-col' >
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
            selectedValue="0"
            onChange={(v) => v}
        ></AdministratorSetupPanel>
    } else {
        showJSX = <LocalUserPanel
            localAccountObject={localAccountObject.current}
            loadLeftPage={loadLeftPage}
            selectedValue="0"
            onChange={(v) => v}
        />
    }

    return showJSX
}

export default () => {
    PageUtils.useUpdateTitle(Dot("SGs7B", "Setup Your LafTools Quickly"), [])

    return <div
        className=" bg-slate-200 dark:bg-gray-800  text-center p-8"
        style={{
            height: `calc(100vh - ${VAL_CSS_MENU_TITLE_PANEL}px)`,
            paddingBottom:'30px',
            overflow:'auto'
        }}
    >
        <Card style={{
            // minHeight: '400px'
        }} className='w-6/12 flex  mx-auto text-left  '>
            <InnerContent></InnerContent>
        </Card>
        <FooterContent></FooterContent>
    </div>
}