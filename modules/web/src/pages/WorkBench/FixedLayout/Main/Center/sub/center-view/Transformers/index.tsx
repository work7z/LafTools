// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 9 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
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

import { Alignment, Button, ButtonProps, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import {
  VAL_CSS_TAB_TITLE_PANEL,
  VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../utils/TranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice";
import _ from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";
import { fn_format_description } from "../../../../../../../../types/workbench-fn";
import { CommonTransformerProps } from "./types";
import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";
import { TransofrmerWithRuntime, controlBarHeight, fn_coll_config, fn_coll_output, useCurrentActiveStyle } from "./hooks";
import TextTransformerControl from "./SideControl";
import TextTransformerOutput from "./unused/PanelOutput";
import TextTransformerConfig from "./unused/PanelConfig";
import LoadingText from "../../../../../../../../components/LoadingText";
import { Allotment, AllotmentHandle } from "allotment";
import PanelMain from "./PanelMain";
import LibIndex from '../../../../../../../../lib/index'

export type AppOptViewMode = "fixed" | "float"

export default (props: CommonTransformerProps) => {
  let sessionId = props.sessionId;
  let bodyHeight = `calc(100% - ${controlBarHeight}px)`;
  let inputBigTextId = props.inputBigTextId;
  let outputBigTextId = props.outputBigTextId;
  let extId = props.extId
  let commonPassProp: CommonTransformerPassProp = {
    ...props
  };
  let extVM = props.extVM
  let desc = fn_format_description(extVM?.Info?.DescriptionByInit)
  // process fn
  let fn_notifyTextChange = async (originalValue: string) => {
    let processedNewValue = await LibIndex.process(originalValue, {
      extVM,
      extId,
    });
    // when text is changed, then trigger function to process
    FN_GetDispatch()(FN_SetTextValueFromOutSideByBigTextId(outputBigTextId, processedNewValue.result));
    FN_GetDispatch()(
      RuntimeStatusSlice.actions.setCollapseOutput({
        sessionId,
        collapseOutput: false,
      }),
    );
    FN_GetDispatch()(RuntimeStatusSlice.actions.setToolTabIndex({ sessionId, tabIndex: "output" }))
  }
  let crtRuntimeStatus = exportUtils.useSelector((x) => {
    let v = x.runtimeStatus.toolOutputStatusMap[sessionId];
    return {
      v
    }
  }).v;
  // let crtOptMode: TextOptMode = "fixed"
  let crtOptMode: AppOptViewMode = ((): AppOptViewMode => {
    return "float"
  })()
  let isFixedMode = crtOptMode === "fixed"
  let isFloatMode = !isFixedMode



  useEffect(() => {
    FN_GetDispatch()(
      RuntimeStatusSlice.actions.initAtOnceBySessionIdAndValue({
        sessionId,
        value: {
          latestViewPanelId: "output",
          toolTabIndex: "output",
          collapseConfig: false,
          collapseOutput: false,
        },
      }),
    )
  }, [])
  let isCollapsed_config = fn_coll_config(sessionId);
  if (!crtRuntimeStatus) {
    return <LoadingText></LoadingText>
  }

  return (
    <div key={sessionId} className="w-full h-full relative">
      {/* onProcess={fn_notifyTextChange} */}
      <TextTransformerControl crtOptMode={crtOptMode} crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></TextTransformerControl>
      <div
        style={{
          height: bodyHeight,
        }}
        className="w-full overflow-auto"
      >
        <Allotment
          vertical
        >
          <Allotment.Pane>
            <GenCodeMirror
              lineWrap
              placeholder={desc || Dot("xPHqP", "The description is not yet defined.")}
              language="javascript"
              bigTextId={inputBigTextId}
              onTextChange={fn_notifyTextChange}
            ></GenCodeMirror>

          </Allotment.Pane>
          {isCollapsed_config ? '' :
            <Allotment.Pane>
              <PanelMain crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></PanelMain>
            </Allotment.Pane>
          }
        </Allotment>
      </div>
      {
        isFixedMode ? [
          <TextTransformerOutput crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></TextTransformerOutput>,
          <TextTransformerConfig crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></TextTransformerConfig>
        ] : []
      }
    </div>
  );
};
