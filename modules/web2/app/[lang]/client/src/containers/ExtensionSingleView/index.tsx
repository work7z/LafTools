// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
// LafTools Team <work7z@outlook.com>
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
  ButtonProps,
  Divider,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../types/constants";
import TranslationUtils, { Dot } from "../../utils/cTranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice from "../../reducers/apiSlice";

import { Link } from "react-router-dom";
import PageUtils from "../../utils/PageUtils";
import AuthHookUtils from "../../utils/AuthHookUtils";
import QueryUtils from "../../utils/QueryUtils";
import "./index.scss";
import forgeSlice from "../../reducers/forgeSlice";
import AlertUtils from "../../utils/AlertUtils";
import ToolSlice from "../../reducers/toolSlice";
import ContentInESV from "./ContentInESV";
import StatusBarInESV from "./StatusBarInESV";
import ExtHookUtils from "../../utils/ExtensionHookUtils";
import { logutils } from "../../utils/LogUtils";
import {
  SYNC_KEY_INPUT_REGION_DEFAULT,
  SYNC_KEY_OUTPUT_REGION_DEFAULT,
} from "../../reducers/extSlice";
import ExtraInfoESV from "./ExtraInfoESV";
import moment from "moment";
import AdaptUtils from "../../utils/AdaptUtils";
import { ExtensionVM } from "../../types/purejs-types-READ_ONLY";

type PassWProp = {
  sessionId: string;
  extId: string;
};
export type PropExtSessionContext = {
  sessionId: string;
  extId: string;
};
export type PropExtVMContext = {
  inst: ExtensionVM | undefined;
};
let tmp: PropExtSessionContext = {
  sessionId: "default_sessionId",
  extId: "default_extId",
};
let tmp2: PropExtVMContext = {
  inst: undefined,
};
export const ExtSessionContext = React.createContext(tmp);
export const ExtVMContext = React.createContext(tmp2);

let Footer = () => {
  let items = []
  // rotate items every 3 seconds, by useState and useEffect
  let [index, setIndex] = useState(0);
  useEffect(() => {
    let timer = setInterval(() => {
      // random index in items
      setIndex(Math.floor(Math.random() * items.length));
    }, 13000);
    return () => {
      clearInterval(timer);
    };
  }, [index]);
  return (
    <div className="esv-footer-w">
      <div>
        Copyright © 2016 - {moment().format("YYYY")}{" "}
        {Dot("jaj7M", "All rights reserved.")}{" "}
      </div>
      {TranslationUtils.CurrentLanguage == "zh_CN" &&
        AdaptUtils.isPortalMode() ? (
        <span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="nofollow"
            style={{}}
          >
            粤ICP备16114169号-7
          </a>
        </span>
      ) : (
        "" || (
          <span>
            {/* <a
            href="javascript:void(0);"
            target="_blank"
            rel="nofollow"
            style={{}}
          >
            Guangdong ICP No. 16114169-7
          </a> */}
            {/* <a
            href="https://laf-tools.com/"
            target="_blank"
            rel="nofollow"
            style={{}}
          >
            {Dot("cfYYN", "Discover More")}
          </a> */}
          </span>
        )
      )}
      {/* <div>
       
          <span>
            <a
              className="normaltext"
              href="mailto:work7z@outlook.com"
              target="_blank"
              rel="nofollow"
            >
              {items[index]}
            </a>
          </span>
      </div> */}
      <div>
        <span>
          <Tooltip
            content={Dot(
              "PapkF",
              "If you have any questions or suggestions about LafTools, please feel free to let us know. We are always looking for ways to improve our product and provide the best possible experience for our users. You can contact us at work7z@outlook.com. Thank you for using LafTools!"
            )}
          >
            {items[index]}
          </Tooltip>
        </span>
      </div>
    </div>
  );
};
