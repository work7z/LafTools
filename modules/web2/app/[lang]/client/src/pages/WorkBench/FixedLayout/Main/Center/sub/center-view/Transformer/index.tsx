// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 9 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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

import { Alignment, Button, ButtonProps, Navbar, OL, PortalContext, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import {
  VAL_CSS_TAB_TITLE_PANEL,
  VAL_CSS_CONTROL_PANEL,
  VAL_MENU_LEFT_PANEL_WIDTH,
} from "../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../utils/cTranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice";
import _, { defer } from "lodash";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";

import { ClientPortalContext, CommonTransformerProps } from "./types";
import { ExtensionAction, ToolDefaultOutputType as ToolCurrentRuntimeStatus, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";
import { TransformerWithRuntime, controlBarHeight, fn_coll_config, fn_coll_output, useCurrentActiveStyle } from "./hooks";
import ControlBar, { useHideBottomAndSettingHook } from "./ControlBar/index.tsx";
import LoadingText from "../../../../../../../../components/LoadingText";
import { Allotment, AllotmentHandle } from "allotment";
import ProcessPanel from "./ProcessPanel/index.tsx";
import { ACTION_Transformer_Process_Text, ACTION_Transformer_Process_Text_Delay } from "../../../../../../../../actions/transformer_action";
import Operation from "../../../../../../../../impl/core/Operation.tsx";
import gutils from "../../../../../../../../utils/GlobalUtils";
import appToolInfoObj, { AppInfoType, loadConversionTSXById } from "../../../../../../../../impl/tools/d_meta.tsx";
import { getInitValueForRuntimeStatus } from './init.tsx'
import { ToolHandler as ToolHandler, ToolHandlerClass } from "../../../../../../../../impl/tools/r_handler.tsx";
import { logutils } from "../../../../../../../../utils/LogUtils.tsx";
import ShowErrorPanel from "../../../../../../../../containers/ShowErrorPanel/index.tsx";
import { useDispatch } from "react-redux";
import Sidemenu from "./SideMenu/sidemenu.tsx";
import { CSS_BG_COLOR_WHITE, VAL_CSS_MENU_TITLE_PANEL, border_clz, border_clz_common, light_border_clz_all } from "@/app/__CORE__/meta/styles.tsx";
import COMMON_FN_REF from "@/app/[lang]/client/src/impl/tools/common_ref.tsx";
import { OpDetail, getAllOperationDetails } from "@/app/[lang]/client/src/impl/tools/s_tools.tsx";
import ParamStateSlice, { ToolConfigMap, ToolConfigMapVal } from "@/app/[lang]/client/src/reducers/state/paramStateSlice.tsx";
import { sleep } from "@/app/[lang]/client/src/utils/SyncUtils.tsx";

COMMON_FN_REF.Dot = Dot

export type AppOptViewMode = "fixed" | "float"

export type TitleSubPair = {
  title: string
  subTitle: string
}

export let useShouldVerticalModeOrNot = () => {
  let v = exportUtils.useSelector((v) => {
    return {
      bottom_hide: v.layout.menuHide.bottom,
      ltr: v.paramState.ltr == 'true',
    };
  });
  if (v.ltr) {
    return false;
  }
  return v.bottom_hide;
}
let ToolTitlebar = (props: { title: string }) => {
  let { fullScreen, hideSideBar } = exportUtils.useSelector(v => {
    return {
      // fullScreen: v.paramState.fs
      hideSideBar: v.paramState.hsr,
      fullScreen: false // v.paramState.fs 
      // not yet implemented fullScreen 
    }
  })
  let mainTitle = <div className={CSS_BG_COLOR_WHITE + ' relative w-full flex flex-row justify-between px-[2px] items-center text-sm ' + light_border_clz_all + " "} style={{
    borderTop: 'none',
    borderRight: 'none',
    height: VAL_CSS_MENU_TITLE_PANEL
  }}>
    <div>
      <a href="#">
        {/* {Dot("crZZ_WXlw", "View Relevant")} */}
      </a>
    </div>
    <div id="tool-current-title" className={`font-semibold top-[50%] translate-y-[-50%] absolute left-[50%] translate-x-[-50%]`}>
      {props.title}
    </div>
    <div>
      <a href="#">
        {/* {Dot("438yFc2HZ", "Float this Tool")} */}
      </a>
    </div>
  </div>
  return <div className={' w-full flex flex-row'} style={{
    borderBottom: 'none',
    height: VAL_CSS_MENU_TITLE_PANEL
  }}>
    {mainTitle}

  </div>
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
  let { crtRuntimeStatus, crtToolCfg } = exportUtils.useSelector((x) => {
    let v: ToolDefaultOutputType | null = x.runtimeStatus.toolOutputStatusMap[sessionId];
    return {
      crtRuntimeStatus: v,
      crtToolCfg: x.paramState.tlcfg[sessionId]
    }
  });
  let opDetails = useMemo(() => {
    return getAllOperationDetails()
  }, [])
  let [extraOpList, onExtraOpList] = useState<Operation[]>([])
  let [loadingExtraOpList, onLoadingExtraOpList] = useState(false)
  let crtDefaultOperaId = crtToolCfg && crtToolCfg.dftOpId || (operaList && operaList[0] && operaList[0].getOptDetail()?.id)
  let crtSideMenuOperaId = crtToolCfg && crtToolCfg.sideOpId
  let crtSideMenuOpera = useMemo(() => {
    return _.find((extraOpList || []), (x: Operation) =>
      x.constructor.name == crtSideMenuOperaId ||
      x.getOptDetail()?.id == crtSideMenuOperaId)
  }, [crtSideMenuOperaId, extraOpList])

  // DEFAULT OPERA BEGIN
  let crtDefaultOpera = useMemo(() => {
    return _.find((operaList || []), x => x.getOptDetail()?.id === crtDefaultOperaId) || (
      _.first(operaList)
    )
  }, [crtDefaultOperaId, operaList])
  crtDefaultOpera = crtSideMenuOperaId && crtSideMenuOpera && !loadingExtraOpList ? crtSideMenuOpera : crtDefaultOpera
  // DEFAULT OPERA END

  let onProcess = () => {
    fn_notifyTextChange(false)
  }


  let fn_updateToolConfig = (arg: Partial<ToolConfigMapVal>) => {
    FN_GetDispatch()(
      ParamStateSlice.actions.updateOneOfParamState({
        tlcfg: {
          [sessionId]: {
            ...(crtToolCfg || {}),
            ...arg
          }
        }
      })
    )
  }
  let fn_switchToSideMenuExtraOp = async function (id) {
    try {
      fn_updateToolConfig({
        sideOpId: id
      })
      onLoadingExtraOpList(true)
      let conver = await loadConversionTSXById(id)
      if (conver && conver.getOptDetail && conver.getOptDetail()) {
        onExtraOpList([conver])
        onLoadingExtraOpList(false)
      } else {
        AlertUtils.popMsg("warning", {
          message: Dot("Kw7oVB8kp", "Unable to load this operation")
        })
      }
    } catch (e: any) {
      AlertUtils.popMsg("danger", {
        message: Dot("gLs6rHJKT", "Failed to process due to an error: {0}", gutils.getErrMsg(e))
      })
    }
  }
  useEffect(() => {
    if (crtSideMenuOperaId) {
      defer(() => {
        fn_switchToSideMenuExtraOp(crtSideMenuOperaId)
      })
    }
  }, [crtSideMenuOperaId,])
  let commonPassProp: CommonTransformerPassProp = {
    ...props,
    opDetails,
    toolHandler: operaRef.current,
    onProcess,
    operaList,
    metaInfo,
    crtDefaultOperaId,
    crtDefaultOpera,
    loadingExtraOpList,
    crtSideMenuOperaId,
    crtSideMenuOpera,
    fn_updateToolConfig,
    fn_switchToSideMenuExtraOp
  }
  let extVM = props.extVM
  let fn_format_description = (desc: string | undefined): string => {
    let optDetail = commonPassProp.crtDefaultOpera?.getOptDetail()

    let arr: TitleSubPair[] = [
      {
        title: Dot("wcl1K", "Usage"),
        subTitle: Dot("rT34qnO", "Enter text for processing. The result will display in the output editor.")
      },
      {
        title: Dot("8eeL1Kk", "About", optDetail?.optName),
        subTitle: desc?.replace(/\\n/g, '\n') + ""
      },
      {
        title: Dot("SYSq1", "Example"),
        subTitle: Dot("GR7jK", "Type") + ": " + optDetail?.optName + "\n" + Dot("vh9j4", "Input") + ": " + (optDetail?.exampleInput) + "\n" + Dot("dGKMx", "Output") + ": " + optDetail?.exampleOutput + ""
      }
    ]
    return arr.map(x => `[${x.title}]\n${x.subTitle}`).join("\n\n")
  }
  let desc = fn_format_description(commonPassProp.toolHandler?.getMetaInfo().description)
  logutils.debug("commonPassProp", commonPassProp, extraOpList)
  let fn_notifyTextChange = (fromTextInputEvent: boolean) => {
    if (fromTextInputEvent && crtRuntimeStatus?.autoRun != 'true') {
      return;
    }
    if (extVM && extId && sessionId && outputBigTextId && operaRef.current) {
      let originalValue = FN_GetActualTextValueByBigTextId(inputBigTextId)
      if (originalValue == '' && crtRuntimeStatus.ignoreEmptyStr == 'true') {
        FN_GetDispatch()(
          RuntimeStatusSlice.actions.moveTabToToolsPart({
            sessionId,
          })
        )
      } else {

        if (!fromTextInputEvent) {
          FN_GetDispatch()(
            ACTION_Transformer_Process_Text({
              originalValue,
              extVM,
              extId,
              sessionId,
              outputBigTextId,
              inputBigTextId,
              toolHandler: operaRef.current,
              fromChangeEvent: fromTextInputEvent,
              commonPassProp: commonPassProp
            })
          )
        } else {
          ACTION_Transformer_Process_Text_Delay({
            dispatch: FN_GetDispatch(),
            originalValue,
            extVM,
            extId,
            sessionId,
            outputBigTextId,
            inputBigTextId,
            toolHandler: operaRef.current,
            fromChangeEvent: fromTextInputEvent,
            commonPassProp: commonPassProp
          })
        }
      }
    } else {
      console.error("fn_notifyTextChange failed")
    }
  }
  let crtOptMode: AppOptViewMode = ((): AppOptViewMode => {
    return "float"
  })()
  let [loadingStatic, setLoadingStatic] = useState(true)
  let [loadError, onLoadError] = useState<string | null>(null)
  let [loadingProgressRate, setLoadingProgressRate] = useState(0)
  useEffect(() => {
    let tmp_loadingProgressRate = 0
    let loopFn = () => {
      let maxVal = 98.161709;
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
        // for CyberChef LEGACY CODE BEGIN
        window["_hash"] = null;
        // for CyberChef LEGACY CODE END
        onLoadError(null)
        setLoadingProgressRate(0)
        setLoadingStatic(true)
        let obj: AppInfoType = appToolInfoObj[props.extId as any]
        if (!obj.ImportImpl) {
          logutils.warn("no import impl")
          return;
        }
        let opera: any = await obj.ImportImpl()
        operaRef.current = new opera["default"]()
        if (operaRef.current) {
          operaRef.current.id = props.extId + ""
        }
        window.clearInterval(timer)
        setLoadingStatic(false)
      } catch (e) {
        logutils.debug('loading-Transformer', e)
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

  let shouldVerticalMode = useShouldVerticalModeOrNot()

  let { fullScreen, hideSideBar } = exportUtils.useSelector(v => {
    return {
      hideSideBar: v.paramState.hsr,
      fullScreen: false
    }
  })

  let dis = useDispatch()
  useEffect(() => {
    let b = RuntimeStatusSlice.actions.initAtOnceBySessionIdAndValue({
      sessionId,
      value: getInitValueForRuntimeStatus(),
    })
    dis(
      b
    )
  }, [sessionId])
  let { hideBottomPanel: hideBottomPanel, hideSettingPanel } = useHideBottomAndSettingHook()

  if (!crtRuntimeStatus) {
    return <div className="w-full h-full">
      <LoadingText></LoadingText>
    </div>
  }

  if (loadingStatic) {
    let pre = loadingProgressRate.toFixed(2)
    let b = pre.split('.')
    if (b.length == 1) {
      pre += '.00'
    }
    desc = Dot("OqqGx2qg", "Loading the static resources, please wait...") + "\n" + (
      Dot("AkXgF", "In Progress: {0}%", pre)
    ) + "\n" + (
        '')
  }
  if (loadError) {
    desc = `${Dot("RO4ZP", "An Error Occurred")}: \n${loadError}`
  }
  let codeMirrorItem = <GenCodeMirror
    lineWrap
    placeholder={desc || Dot("xPHqP", "The description is not yet defined.")}
    language="javascript"
    key={inputBigTextId}
    bigTextId={inputBigTextId}
    onTextChange={(val) => {
      fn_notifyTextChange(true)
    }}
  ></GenCodeMirror>

  let processPanelItem = hideBottomPanel ? '' :
    <Allotment.Pane>
      <ProcessPanel hideSettingPanel={hideSettingPanel} disableSeparateOutputMode={false} crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></ProcessPanel>
    </Allotment.Pane>
  if (loadError) {
    return <ShowErrorPanel loadError={loadError}></ShowErrorPanel>
  }

  let clientPortalContext = useContext(ClientPortalContext) // TODO: in future, we will enable it

  let app_right_t_jsx = codeMirrorItem
  let app_right_b_jsx = processPanelItem


  if (props.needFullPageSupport) {
    app_right_t_jsx = <div className={
      shouldVerticalMode ? 'h-[350px]' : ' h-[700px] ' + ' align-top w-1/2 inline-block ' + border_clz_common + ' border-r-[1px] '
    }>{app_right_t_jsx}</div>
    app_right_b_jsx = <div className={
      shouldVerticalMode ? 'min-h-[350px]' : ' min-h-[700px] ' + ' align-top w-1/2 inline-block '
    }>{app_right_b_jsx}</div>
  }


  let app_right_jsx = <>
    <ControlBar
      loadingStatic={loadingStatic}
      crtOptMode={crtOptMode} crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}></ControlBar>
    <div
      style={{
        height: bodyHeight,
      }}
      className="w-full overflow-auto "
    >
      {
        props.needFullPageSupport ? (
          <div className="w-full">
            {app_right_t_jsx}
            {app_right_b_jsx}
          </div>
        ) : (
          <Allotment
            vertical={shouldVerticalMode}
            key={shouldVerticalMode + ""}
          >
            <Allotment.Pane>
              {app_right_t_jsx}
            </Allotment.Pane>
            {app_right_b_jsx}
          </Allotment>
        )
      }
    </div>
  </>
  let app_left_jsx = <Sidemenu
    crtRuntimeStatus={crtRuntimeStatus} {...commonPassProp}
  />
  let transformerFullScreenClzIfNeeded = " w-full h-full relative "
  if (fullScreen) {
    transformerFullScreenClzIfNeeded = " w-screen h-screen fixed left-0 top-0 z-[9999] " + CSS_BG_COLOR_WHITE
  }
  if (props.needFullPageSupport) {
    transformerFullScreenClzIfNeeded = 'w-full h-auto '
  }

  let defaultLeftWidth = VAL_MENU_LEFT_PANEL_WIDTH

  let infoObj: AppInfoType = appToolInfoObj[props.extId || '']

  let body = <div key={sessionId} className={
    " " + transformerFullScreenClzIfNeeded
  } style={{
  }}>
    {
      props.needFullPageSupport ? <div className='w-full flex flex-row'>
        <div className={border_clz_common + ' border-r-[1px] '} style={{
          width: defaultLeftWidth + 'px'
        }}>{app_left_jsx}</div>
        <div style={{
          width: `calc(100% - ${defaultLeftWidth}px)`
        }}>
          {app_right_jsx}
        </div>
      </div> :
        <Allotment vertical={false} style={{
        }}>

          {
            hideSideBar == 'true' ? '' : <Allotment.Pane preferredSize={280} >
              {app_left_jsx}
            </Allotment.Pane>
          }
          <Allotment.Pane>
            <div className="w-full h-full flex flex-col">
              <ToolTitlebar title={infoObj.LabelFn(Dot) || 'N/A'} />
              <div style={{
                flex: '1',
              }}>
                {app_right_jsx}
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
    }
  </div>
  let needFullPageSupport = props.needFullPageSupport
  let constructedKey = 'xmGBxtFdi'
  return (
    <div className="w-full h-full">
      {/* <ToolTitlebar title={extVM?.Info?.Label || 'N/A'} /> */}
      <div
        style={{
          height: '100% '
          // height: needFullPageSupport ? 'auto' : clientPortalContext.portalMode ? '100%' : `calc(100% - ${VAL_CSS_MENU_TITLE_PANEL}px)`
        }
        }
        className={' w-full   rounded-sm shadow-sm' + light_border_clz_all + ' ' + CSS_BG_COLOR_WHITE}
        key={constructedKey}
      >
        {body}
      </div>
    </div>
  )
};
