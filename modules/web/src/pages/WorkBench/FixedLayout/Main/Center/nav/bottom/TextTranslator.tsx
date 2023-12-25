// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 19 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
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

import { Button, Card, Popover } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../components/GenCodeMirror";
import { Dot } from "../../../../../../../utils/TranslationUtils";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../../../../../types/workbench-types";
import { Allotment, AllotmentHandle } from "allotment";
import { FN_GetDispatch, getAjaxResPayloadValue, getAjaxResPayloadValueAsString } from "../../../../../../../nocycle";
import { FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../actions/bigtext_action";
import AjaxUtils from "../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../utils/AlertUtils";
import { useCallback } from "react";
import _ from 'lodash'
import { useGetI18nLangList } from "../../../../../../../containers/UserAskMultipleDialogs";
import { SessionViewProp } from "../../../../../../../containers/MultipleSessionLeftView";
import { NoAvailableDataPanel, NoAvailablePanel } from "../../../../../../../types/workbench-hook";
import exportUtils from "../../../../../../../utils/ExportUtils";

type SrcTarget = "source" | "target";

let EachTranslatorBlock = (props: { onTextChange?: (val: string) => any, bigTextId: string; type: SrcTarget }) => {
  let isSrc = props.type == "source"
  let placeholder =
    isSrc
      ? Dot("L42mxa", "Please input your source text in this field.")
      : Dot("HEAhr", "After translating, the result will appear here.");
  return (
    <div className="h-full w-full inline-block ">
      <GenCodeMirror
        language="text"
        onTextChange={(val: string) => {
          props.onTextChange && props.onTextChange(val)
        }}
        placeholder={placeholder}
        lineWrap={true}
        bigTextId={props.bigTextId}
        key={""}
      ></GenCodeMirror>
    </div>
  );
};

let LanguageChooser = (props: { isSource: boolean; label: string }) => {
  let { isSource } = props;
  let langList = useGetI18nLangList()
  return <Popover placement="bottom" minimal content={<Card className="w-[300px]" style={{
    padding: '15px'
  }} >
    <h2 style={{ margin: 0, fontWeight: 'bold', marginBottom: '7px' }}>{!isSource ? Dot("hJUMN", "Target Language") : Dot("SQAw7", "Source Language")}</h2>
    {
      _.map(langList, x => {
        return <Button small minimal text={x.Label} key={x.Value}></Button>
      })
    }
  </Card>}>
    <Button small minimal text={props.label + ": English"}></Button>
  </Popover>;
};

let ExportButtonByInputId = () => {
  return (
    <Button
      small
      icon="duplicate"
      intent="success"
      text={Dot("Fv-zz", "Copy Result")}
    ></Button>
  );
};

export default (props: SessionViewProp) => {
  let sessionType = props.sessionType
  let sessionId = props.sessionId;
  let textInputId = sessionId + "ipt";
  let textOutputId = sessionId + "opt";
  let fn_textChg = useCallback(_.throttle(async (val) => {
    //               SourceLang string
    // TargetLang string
    // Type       string
    // Text       string
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: "/translation/text/translate",
      isPOST: true,
      data: {
        SourceLang: 'zh',
        TargetLang: 'en',
        Type: 'text',
        Text: val,
      },
    })
    if (r.error) {
      AlertUtils.popError(r.error)
      return
    }
    let ajaxResValue = getAjaxResPayloadValueAsString(r)
    FN_GetDispatch()(
      FN_SetTextValueFromOutSideByBigTextId(textOutputId, ajaxResValue as string)
    )
  }, 200), [textInputId])
  let sessionMapAtr = exportUtils.useSelector(v => {
    if (!sessionId) { return null }
    // TODO: fix this part
    // return v.session.sessionTypeKVMap[sessionType]?.sessionMap[sessionId] || null
    return null;
  })
  if (!sessionId) {
    return <NoAvailableDataPanel></NoAvailableDataPanel>
  }
  return (
    <div className="h-full w-full">
      <div
        className=" relative flex flex-row justify-between items-center  px-2"
        style={{
          height: VAL_CSS_TAB_TITLE_PANEL,
        }}
      >
        <div>
          <Button
            icon="search-text"
            small
            intent="primary"
            text={Dot("bjZyW", "Translate")}
          ></Button>
        </div>
        <div
          className="absolute left-[50%] "
          style={{
            transform: "translateX(-50%)",
          }}
        >
          <LanguageChooser
            isSource={true}
            label={Dot("jJuNz", "Source Language")}
          ></LanguageChooser>
          <Button minimal small intent="none" icon="swap-horizontal"></Button>
          <LanguageChooser
            isSource={false}
            label={Dot("TwFcr", "Target Language")}
          ></LanguageChooser>
        </div>
        <div>
          <ExportButtonByInputId />
        </div>
      </div>
      {/* editor */}
      <div
        style={{
          height: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
          maxHeight: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
        }}
        className="w-full"
      >
        <Allotment className="flex flex-row">
          <Allotment.Pane>
            <EachTranslatorBlock
              bigTextId={textInputId}
              type="source"
              onTextChange={fn_textChg}
            ></EachTranslatorBlock>
          </Allotment.Pane>
          <Allotment.Pane>
            <EachTranslatorBlock
              bigTextId={textOutputId}
              type="target"
            ></EachTranslatorBlock>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div >
  );
};
