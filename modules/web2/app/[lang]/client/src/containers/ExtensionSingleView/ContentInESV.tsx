// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 15 Oct 2023
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
  Spinner,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { MapKV, PopoverButtonProp, ToolParamType } from "../../types/constants";
import { Dot } from "../../utils/cTranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice from "../../reducers/apiSlice";
import { ExtensionVM } from '../../types/purejs-types-READ_ONLY'

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
  FN_SYNC_ID_TYPE,
  FN_SYNC_ID_WITH_SESSION,
  SYNC_KEY_INPUT_REGION_DEFAULT,
  SYNC_KEY_OUTPUT_REGION_DEFAULT,
  fn_call_convert_with_action as ACTION_fn_call_ext_for_action,
  fn_call_convert_with_action,
} from "../../reducers/extSlice";
import Blink from "../../components/Blink";
import BigTextSlice from "../../reducers/bigTextSlice";
import statusSlice, {
  ProcessLoadType,
  fn_new_ProcessLoadType,
} from "../../reducers/statusSlice";
import { logutils } from "../../utils/LogUtils";
import { FN_GetState } from "../../nocycle";
import FileUtils from "../../utils/FileUtils";
import { ACTION_fn_input_from_file } from "../../actions/ext_action";

export type ContentProp = {
  extId: string;
  extensionVM: ExtensionVM | undefined;
};

export const StatusWrapDIV = (props: {
  children: JSX.Element;
  height: number;
  syncId: string;
}) => {
  let syncValueObj = exportUtils.useSelector((v) => {
    return {
      syncStatus: v.status.ProcessLoadTypeKVMap[
        props.syncId
      ] as ProcessLoadType | null,
    };
  });
  let dis = exportUtils.dispatch();
  let isSyncIdNonEmpty = !_.isEmpty(props.syncId);
  if (!isSyncIdNonEmpty) {
    logutils.warn("SYNC_ID why is empty!!!! please check the component");
  } else {
  }
  if (syncValueObj.syncStatus != null && isSyncIdNonEmpty) {
    if (syncValueObj.syncStatus.loading) {
      return (
        <div
          style={{
            height: props.height,
          }}
        >
          <NonIdealState
            icon="geosearch"
            title={syncValueObj.syncStatus.loadingTitle}
            description={
              <div>
                {syncValueObj.syncStatus.loadingDesc ||
                  Dot("XikdD", "Moments please, we're almost there!")}
                <Spinner style={{ display: "inline-block" }} size={15} />
              </div>
            }
            action={
              <Button
                onClick={() => {
                  dis(
                    statusSlice.actions.updateProcessLoadType({
                      key: props.syncId,
                      value: null,
                    })
                  );
                }}
              >
                {Dot("1a3Sc", "Cancel Loading")}
              </Button>
            }
          ></NonIdealState>
        </div>
      );
    }
    if (syncValueObj.syncStatus?.error) {
      return (
        <div
          style={{
            height: props.height,
          }}
        >
          <NonIdealState
            icon="error"
            title={syncValueObj.syncStatus.errorTitle}
            description={
              <p>
                {Dot(
                  "1yIQu",
                  "You can try to reprocess your action or click below button to dismiss the error. "
                )}
                <b>
                  {Dot("", "Message: {0}", syncValueObj.syncStatus.errorDesc)}
                </b>
              </p>
            }
            action={
              <Button
                onClick={() => {
                  dis(
                    statusSlice.actions.updateProcessLoadType({
                      key: props.syncId,
                      value: null,
                    })
                  );
                }}
              >
                {Dot("t63Qw", "Dismiss")}
              </Button>
            }
          ></NonIdealState>
        </div>
      );
    }
  }

  return props.children;
};

export const ProcessTextArea = (props: {
  syncId: string;
  placeholder: string;
  title: string | JSX.Element;
  onChangeCapture: (newValue: string) => any;
  rightJSX?: (obj: HeightProp & PassExtQuickAllType) => JSX.Element;
}) => {
  let extInfo = ExtHookUtils.useExtInfo();
  let quickALL = ExtHookUtils.useQuickAll();
  let dis = exportUtils.dispatch();
  let syncValueObj = exportUtils.useSelector((v) => {
    return {
      syncValue: v.bigtext.textKVMap[props.syncId] as string,
    };
  });
  let syncValue = syncValueObj.syncValue;
  const [editorHeight, setEditorHeight] = useState(230);
  let titleHeight = 24;
  let rightPanelTotalH = titleHeight + editorHeight;
  let mainJSX = (
    <StatusWrapDIV height={rightPanelTotalH} syncId={props.syncId}>
      <GenEditor
        editorVal={{
          value: syncValue,
          onChange: (v) => {
            console.log(v);
            dis(
              BigTextSlice.actions.updatebigtext({
                key: props.syncId,
                value: v,
              })
            );

            props.onChangeCapture && props.onChangeCapture(v);
          },
          height: editorHeight,
        }}
        placeholder={props.placeholder}
        title={props.title}
      />
    </StatusWrapDIV>
  );

  if (_.isNil(props.rightJSX)) {
    return mainJSX;
  }
  let RightJSX: any = props.rightJSX;
  return (
    <div className="pure-g hp100">
      <div className="pure-u-18-24 hp100">{mainJSX}</div>
      <div
        className="pure-u-6-24 hp100"
        style={{
          paddingLeft: "5px",
          height: rightPanelTotalH,
          maxHeight: rightPanelTotalH,
        }}
      >
        <RightJSX height={rightPanelTotalH} sessionId={"s"} />
      </div>
    </div>
  );
};

type HeightProp = {
  height: number;
};

const ContentInESV = (props: ContentProp) => {
  return ''
};
export default ContentInESV;
export { ContentInESV };
