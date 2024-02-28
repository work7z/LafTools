// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 19 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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
  Tabs,
  Tab,
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
  CardList,
  Divider,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { MapKV, PopoverButtonProp, ToolParamType } from "../../types/constants";
import { Dot } from "../../utils/TranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice from "../../reducers/apiSlice";
import {ExtensionVM} from '../../types/purejs-types-READ_ONLY'

import { Link } from "react-router-dom";
import PageUtils from "../../utils/PageUtils";
import AuthHookUtils from "../../utils/AuthHookUtils";
import QueryUtils from "../../utils/QueryUtils";
import "./index.scss";
import forgeSlice from "../../reducers/forgeSlice";
import AlertUtils from "../../utils/AlertUtils";
import ToolSlice from "../../reducers/toolSlice";
import { ELEVATION_0 } from "@blueprintjs/core/lib/esm/common/classes";
import GenEditor from "../../components/GenEditor";
import { Select, Switch } from "@blueprintjs/icons";
import FormSelect from "../../components/FormSelect";
import FormSwitch from "../../components/FormSwitch";
import ExtHookUtils, {
  PassExtQuickAllType,
} from "../../utils/ExtensionHookUtils";
import FormSyncGroup from "../../components/FormSyncGroup";
import ExtSlice, {
  ACTION_processFileAction,
  ACTION_processTextAction,
  SYNC_KEY_INPUT_REGION_DEFAULT,
  SYNC_KEY_OUTPUT_REGION_DEFAULT,
} from "../../reducers/extSlice";

export type ExtraInfoESVProp = {
  extId: string;
  extensionVM: ExtensionVM | undefined;
};

export default (prop: ExtraInfoESVProp) => {
  return (
    <Card className="esv-extra-w">
      <Callout title={Dot("07ui6", "More Info")} icon="info-sign">
        <p>
          {!_.isEmpty(prop.extensionVM?.Info?.Description)
            ? prop.extensionVM?.Info?.Description
            : Dot(
              "QL9Sn",
              "At the moment, there doesn't appear to be a description available."
            )}
        </p>
      </Callout>
    </Card>
  );
};
