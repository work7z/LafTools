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
import { useEffect, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";

import { CommonTransformerProps } from "./types";
import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";
import { TransofrmerWithRuntime, controlBarHeight, fn_coll_config, fn_coll_output, useCurrentActiveStyle } from "./hooks";
import TextTransformerControl from "./ControlBar";
import TextTransformerOutput from "./PanelOutput";
import TextTransformerConfig from "./PanelConfig";
import LoadingText from "../../../../../../../../components/LoadingText";
import { Allotment, AllotmentHandle } from "allotment";
import PanelMain from "./ProcessPanel";
import LibProcessEntryPoint from '../../../../../../../../lib/entrypoint'
import { ACTION_Transformer_Process_Text } from "../../../../../../../../actions/transformer_action";
import Operation from "../../../../../../../../lib/core/Operation.mjs";
import gutils from "../../../../../../../../utils/GlobalUtils";
import appToolInfoObj, { AppInfoType } from "../../../../../../../../lib/meta/tools/info";
import {getInitValueForRuntimeStatus} from './init.tsx'
import { ToolHandler as ToolHandler, ToolHandlerClass } from "../../../../../../../../lib/meta/tools/handler";

export type AppOptViewMode = "fixed" | "float"

export type TitleSubPair = {
  title: string
  subTitle: string
}

export default (props: CommonTransformerProps) => {
  let sessionId = props.sessionId;
  let bodyHeight = `calc(100% - ${controlBarHeight}px)`;
  let inputBigTextId = props.inputBigTextId;
  let outputBigTextId = props.outputBigTextId;
  let extId = props.extId
  let operaRef = useRef<ToolHandler | undefined>(undefined)
  let metaInfo = operaRef.current?.getMetaInfo()
  let operaList = operaRef.current?.getOperations()
  let crtRuntimeStatus = exportUtils.useSelector((x) => {
    let v = x.runtimeStatus.toolOutputStatusMap[sessionId];
    return {
      v
    }
  }).v;
  let crtDefaultOperaId = crtRuntimeStatus && crtRuntimeStatus.defaultOperationId || (operaList && operaList[0] && operaList[0].id)
  let crtDefaultOpera = _.find(operaList, x => x.id === crtDefaultOperaId)
  let commonPassProp: CommonTransformerPassProp = {
    ...props,
    toolHandler: operaRef.current,
    operaList,
    metaInfo,
    crtDefaultOperaId,
    crtDefaultOpera
  };
  let extVM = props.extVM
  let fn_format_description = (desc: string | undefined): string => {
    let arr: TitleSubPair[] = [
        {
            title: Dot("wcl1K", "Usage"),
            subTitle: Dot("rT4qnO", "Enter text for processing. The result will display in the output editor.")
        },
        {
            title: Dot("8L1Kk", "About"),
            subTitle: desc?.replace(/\\n/g, '\n') + ""
        },
        {
            title:Dot("SYSq1","Example"),
            subTitle: Dot("vh9j4","Input")+": "+(commonPassProp.crtDefaultOpera?.exampleInput)+"\n"+Dot("dGKMx","Output")+": "+commonPassProp.crtDefaultOpera?.exampleOutput+""
        }
    ]
    return arr.map(x => `[${x.title}]\n${x.subTitle}`).join("\n\n")
}
  let desc = fn_format_description(commonPassProp.toolHandler?.getMetaInfo().description)
  // process fn
  let fn_notifyTextChange = () => {
    if (extVM && extId && sessionId && outputBigTextId && operaRef.current) {
      FN_GetDispatch()(
        ACTION_Transformer_Process_Text({
          extVM,
          extId,
          sessionId,
          outputBigTextId,
          inputBigTextId,
          toolHandler: operaRef.current
        })
      )
    } else {
      console.error("fn_notifyTextChange failed")
    }
  }
  // let crtOptMode: TextOptMode = "fixed"
  let crtOptMode: AppOptViewMode = ((): AppOptViewMode => {
    return "float"
  })()
  let isFixedMode = crtOptMode === "fixed"
  let isFloatMode = !isFixedMode
  let [loadingStatic, setLoadingStatic] = useState(true)
  let [loadError, onLoadError] = useState<string | null>(null)
  let [loadingProgressRate, setLoadingProgressRate] = useState(0)
  useEffect(() => {
    let tmp_loadingProgressRate = 0
    let loopFn = () => {
      let maxVal = 98.16;
      if (tmp_loadingProgressRate >= maxVal) {
        clearInterval(timer)
        return
      }
      tmp_loadingProgressRate = Math.min(maxVal, tmp_loadingProgressRate + (Math.random() * 4))
      setLoadingProgressRate(tmp_loadingProgressRate)
    }
    let timer = setInterval(loopFn, 89);
    (async () => {
      try {
        onLoadError(null)
        setLoadingProgressRate(0)
        setLoadingStatic(true)
        // await gutils.sleep(30000)
        let obj: AppInfoType = appToolInfoObj[props.extId as any]
        if (!obj.Import) {
          // TODO: add alert warnings
          return;
        }
        let opera: any = await obj.Import()
        operaRef.current = new opera["default"]()
        window.clearInterval(timer)
        setLoadingStatic(false)
      } catch (e) {
        let anyError = gutils.getErrMsg(e)
        onLoadError(anyError)
        window.clearInterval(timer)
      } finally {
        setLoadingStatic(false)
      }
    })()
    return () => {
      window.clearInterval(timer)
    }
  }, [sessionId])

  useEffect(() => {
    FN_GetDispatch()(
      RuntimeStatusSlice.actions.initAtOnceBySessionIdAndValue({
        sessionId,
        value: getInitValueForRuntimeStatus(),
      }),
    )
  }, [sessionId])
  let isCollapsed_config = fn_coll_config(sessionId);
  if (!crtRuntimeStatus) {
    return <LoadingText></LoadingText>
  }
  if (loadingStatic) {
    // let progressedRect = '▬'
    // let progressedRectEmpty = '▭'
    // let showTextSize = 50
    // let progressedRectWidth = showTextSize
    // let progressedRectEmptyWidth = showTextSize
    // let progressedRectWidthRate = loadingProgressRate / 100 * progressedRectWidth
    // let progressedRectEmptyWidthRate = progressedRectWidth - progressedRectWidthRate
    // let progressedRectWithText = progressedRect.repeat(progressedRectWidthRate)
    // let progressedRectEmptyWithText = progressedRectEmpty.repeat(progressedRectEmptyWidthRate)
    // let loadingBarWithText = progressedRectWithText + progressedRectEmptyWithText
    // "Loading resources, please be patient..."
    // "Retrieving static resources, hold on..."
    // "Fetching resources, please wait..."
    // "Static resources are being loaded, please stand by..."
    // "We're getting the resources ready for you, hang tight..."
    // (loadingBarWithText) + '\n' +
    let pre = loadingProgressRate.toFixed(2)
    let b = pre.split('.')
    if (b.length == 1) {
      pre += '.00'
    }
    // if (b[0].length == 1) {
    //   pre = '0' + pre
    // }
    desc = Dot("OqqGx2qg", "Loading the static resources, please wait...") + "\n" + (
      Dot("AkXgF", "In Progress: {0}%", pre)
    ) + "\n" + (
        '')
  }
  if (loadError) {
    desc = `${Dot("RO4ZP", "An Error Occurred")}: \n${loadError}`
  }
  return (
    <div key={sessionId} className="w-full h-full relative">
      {/* onProcess={fn_notifyTextChange} */}
      <TextTransformerControl crtOptMode={crtOptMode} crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></TextTransformerControl>
      <div
        style={{
          height: bodyHeight,
        }}
        className="w-full overflow-auto "
      >
        <Allotment
          vertical
          className=""
        >
          <Allotment.Pane>
            <GenCodeMirror
              lineWrap
              placeholder={desc || Dot("xPHqP", "The description is not yet defined.")}
              language="javascript"
              key={inputBigTextId}
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
