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
import { Dot } from "../../utils/TranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice, { ExtensionVM } from "../../reducers/apiSlice";

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
  let RightJSX = props.rightJSX;
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

const ProcessButtonGroup = (props: {
  actions: PopoverButtonProp[];
  controls: PopoverButtonProp[];
}) => {
  let action_rights: ButtonProps[] = [
    // {
    //   text: Dot("q6K7o", "Load From Notes"),
    //   icon: "document-open",
    //   intent: Intent.NONE,
    // },
  ];
  let fn_format_buttons = (v, i) => {
    if (_.isEmpty(v)) {
      return <Divider></Divider>;
    }
    // if v.overlap is not empty, then wrap the button with overlap
    if (!_.isEmpty(v.overlay)) {
      return (
        <Tooltip content={v.overlay} position={Position.BOTTOM}>
          <Button small={true} {...v} />
        </Tooltip>
      );
    }
    return <Button small={true} {...v} />;
  };
  const [isEnable, setIsEnable] = useState(true);
  return (
    <div className="esv-content-process-button-group">
      <div className="esv-content-process-button-group-line-w">
        <div>
          {_.isEmpty(props.actions) ? (
            ""
          ) : (
            <ButtonGroup>{props.actions.map(fn_format_buttons)}</ButtonGroup>
          )}
        </div>
        <div>
          {/* <ButtonGroup>{action_rights.map(fn_format_buttons)}</ButtonGroup> */}
          {/* {Dot("O02-W", "Not loading...")} */}
        </div>
      </div>
      <div className="esv-content-process-button-group-line-w">
        <div>
          <ButtonGroup>{props.controls.map(fn_format_buttons)}</ButtonGroup>
        </div>
        <div>
          {/* <Checkbox
            checked={isEnable}
            label={Dot("VjZCv", "Realtime Conversion")}
            onChange={() => {
              setIsEnable(!isEnable);
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

const ContentInESV = (props: ContentProp) => {
  const extInfo = ExtHookUtils.useExtInfo();
  const extVM = ExtHookUtils.useExtVM();
  const dis = exportUtils.dispatch();
  const quickALL = ExtHookUtils.useQuickAll();

  let inputSyncId = quickALL.getBigTextIdByPropName(
    SYNC_KEY_INPUT_REGION_DEFAULT
  ) as string;
  let outputSyncId = quickALL.getBigTextIdByPropName(
    SYNC_KEY_OUTPUT_REGION_DEFAULT
  ) as string;

  gutils.ExposureIt(
    "input_output_SyncId",
    {
      inputSyncId,
      outputSyncId,
    },
    true
  );

  let actions: PopoverButtonProp[] = [
    ...(extVM.inst
      ? [
        ..._.map(extVM.inst.Actions, (x) => {
          let endWithText = _.endsWith(x.Id, ".text");
          let endWithFile = _.endsWith(x.Id, ".file");
          return {
            text: x.Label,
            overlay: endWithText
              ? Dot("XKpI0", "Click to process your text in the input region")
              : endWithFile
                ? Dot(
                  "ANUZ7",
                  "Click to select a file for processing. The toolbox will directly process it in service and show the result in the output region."
                )
                : null,
            icon: "lightning",
            intent: Intent.PRIMARY,
            onClick: async () => {
              if (endWithText) {
                dis(
                  fn_call_convert_with_action({
                    newValue: FN_GetState().bigtext.textKVMap[
                      inputSyncId
                    ] as string,
                    sessionId: extInfo.sessionId,
                    actionId: x.Id,
                    outputSyncId,
                  })
                );
              } else if (endWithFile) {
                // dis(
                //   ACTION_processFileAction({
                //     action: x,
                //     mute: false,
                //   })
                // );
              } else {
                AlertUtils.popMsg("danger", {
                  message: Dot("KIc63", "Function not yet supported"),
                });
              }
            },
          } as PopoverButtonProp;
        }),
      ]
      : []),
    {
      text: Dot("LPJrV", "Copy Result"),
      icon: "duplicate",
      intent: Intent.SUCCESS,
      overlay: Dot(
        "j-VM7",
        "Copy the value of output region to your clipboard."
      ),
      onClick: () => {
        AlertUtils.copyWithAlertCopied(
          FN_GetState().bigtext.textKVMap[outputSyncId] as string
        );
      },
    },
    // {
    //   text: Dot("9Xv8-", "Save As Note"),
    //   disabled: true,
    //   icon: "floppy-disk",
    //   intent: Intent.SUCCESS,
    // },
  ];

  let realtimeAction = quickALL.fromExtData("realtimeAction") as string;
  let realtimeDebounce = quickALL.fromExtData("realtimeDebounce") as string;
  let usingRealtimeMode = quickALL.fromExtData("usingRealtimeMode") as boolean;

  // KEYPART: content in esv
  let onRealtimeCapture = useMemo(() => {
    return _.debounce((newValue: string) => {
      (async () => {
        if (usingRealtimeMode) {
          dis(
            ACTION_fn_call_ext_for_action({
              outputSyncId,
              sessionId: extInfo.sessionId,
              newValue,
              actionId: realtimeAction,
            })
          );
        }
      })();
    }, gutils.ConvertStrToNumberOrZero(realtimeDebounce));
  }, [
    inputSyncId,
    outputSyncId,
    extInfo.sessionId,
    realtimeAction + realtimeDebounce + usingRealtimeMode,
  ]);
  let sessionId = extInfo.sessionId;

  let controls: PopoverButtonProp[] = [
    {
      text: Dot("rR1vd", "Input From File"),
      icon: "document-open",
      intent: Intent.NONE,
      overlay: Dot(
        "rR4R_FO1vd",
        "You could select and confirm the file you want to process, then toolbox will read it and paste the content to input region."
      ),
      onClick: async () => {
        dis(
          ACTION_fn_input_from_file({
            inputSyncId,
            outputSyncId,
            sessionId,
            usingRealtimeMode,
            realtimeAction,
          })
        );
      },
    },
    {
      text: Dot("2Y1mR", "Clear Text"),
      icon: "eraser",
      intent: Intent.NONE,
      overlay: Dot(
        "DoWY7",
        "Set the text of either input region or output region as empty."
      ),
    },
    {
      text: Dot("_trez", "Swap Text"),
      icon: "swap-horizontal",
      intent: Intent.NONE,
      overlay: Dot("n98EW", "Swap the text of input region and output region."),
    },
    {
      text: Dot("L3zEM", "Show Example"),
      icon: "eye-open",
      intent: Intent.NONE,
      overlay: Dot("iNQvo", "Show an example to start with."),
    },
    {
      text: "",
      icon: "help",
      intent: Intent.NONE,
      overlay: Dot("pmAee", "Read more information about this tool."),
    },
  ];
  return (
    <Card className="esv-content-w esv-content-layout-form">
      <ProcessTextArea
        syncId={inputSyncId}
        placeholder={Dot(
          "mNucv",
          "Please input your text, load from file or drag a file here, then toolbox will use it to process accordingly."
        )}
        title={Dot("AW9N8", "Input Region")}
        rightJSX={ConfigControlPanel}
        onChangeCapture={onRealtimeCapture}
      />
      <ProcessButtonGroup actions={actions} controls={controls} />
      <ProcessTextArea
        syncId={outputSyncId}
        placeholder={Dot(
          "hmqzl",
          `After clicking one of above button controls, result will appear here.`
        )}
        title={Dot("P4ROa", "Output Region")}
        onChangeCapture={(newValue) => {
          //
        }}
      />
    </Card>
  );
};
let ConfigControlPanel = (props: HeightProp & PassExtQuickAllType) => {
  const [tabId, setTabId] = useState("config");
  let quickALL = ExtHookUtils.useQuickAll();
  let extVM = ExtHookUtils.useExtVM();
  let realtimeAction = quickALL.fromExtData("realtimeAction") as string;
  let realtimeDebounce = quickALL.fromExtData("realtimeDebounce") as string;
  return (
    <div></div>
    // <GenTabs
    //   height={props.height}
    //   tabs={[
    //     {
    //       id: "config",
    //       title: Dot("sojBI", "Conversion"),
    //       panel: (
    //         <div className="pt-5 compact-form">
    //           <FormSyncGroup
    //             formGroupProp={{
    //               label: Dot("uCEe8", "Realtime Conversion"),
    //             }}
    //             tooltip={Dot(
    //               "KH10M",
    //               "If you want to input and see the output in the realtime mode, then you can turn it on."
    //             )}
    //           >
    //             <FormSwitch
    //               value={quickALL.fromExtData("usingRealtimeMode")}
    //               onChange={(e) => {
    //                 quickALL.toExtData("usingRealtimeMode", e);
    //               }}
    //             ></FormSwitch>
    //           </FormSyncGroup>
    //           {quickALL.fromExtData("usingRealtimeMode") ? (
    //             <FormSyncGroup
    //               formGroupProp={{
    //                 label: Dot("pHZDB", "Realtime Action"),
    //               }}
    //               tooltip={Dot(
    //                 "ja21j",
    //                 "If the realtime mode is enabled, please select the action you would like to use it to convert, it should be the first one by default"
    //               )}
    //             >
    //               <FormSelect
    //                 onChange={(e) => {
    //                   quickALL.toExtData("realtimeAction", e);
    //                 }}
    //                 list={_.map(
    //                   _.filter(
    //                     extVM.inst?.Actions,
    //                     (x) => !_.endsWith(x.Id, ".file")
    //                   ),
    //                   (x) => {
    //                     return {
    //                       label: x.Label,
    //                       value: x.Id,
    //                     };
    //                   }
    //                 )}
    //                 value={realtimeAction}
    //               ></FormSelect>
    //             </FormSyncGroup>
    //           ) : (
    //             ""
    //           )}
    //           {quickALL.fromExtData("usingRealtimeMode") ? (
    //             <FormSyncGroup
    //               formGroupProp={{
    //                 label: Dot("DadYp", "Realtime Debounce") + `(ms)`,
    //               }}
    //               tooltip={Dot(
    //                 "rtJ0_",
    //                 "The debounce option can be useful for improving performance and reducing unnecessary function calls during real-time operations. For example, setting the debounce time to 200ms means that your input will be processed by the debounce control 200ms after the last input change."
    //               )}
    //             >
    //               <InputGroup
    //                 onChange={(e) => {
    //                   quickALL.toExtData("realtimeDebounce", e.target.value);
    //                 }}
    //                 value={realtimeDebounce}
    //                 type="number"
    //               ></InputGroup>
    //             </FormSyncGroup>
    //           ) : (
    //             ""
    //           )}
    //         </div>
    //       ),
    //     },
    //   ]}
    //   selectedTabId={tabId}
    //   onTabChange={(id) => {
    //     setTabId(id);
    //   }}
    //   onTabClose={(id) => {
    //     console.log(id);
    //   }}
    // ></GenTabs>
  );
};
export default ContentInESV;
export { ContentInESV };
