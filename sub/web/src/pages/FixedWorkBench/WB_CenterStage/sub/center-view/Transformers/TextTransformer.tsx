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

import { Button, ButtonProps, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../components/GenCodeMirror";
import {
  VAL_CSS_TAB_TITLE_PANEL,
  VAL_CSS_CONTROL_PANEL,
} from "../../../../definitions/WB_Types";
import { CommonPassProp } from "../transformer_types";
import { Dot } from "../../../../../../utils/TranslationUtils";
import { FN_GetDispatch } from "../../../../../../nocycle";
import BigTextSlice from "../../../../../../slice/BigTextSlice";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../sliceAction/bigtext_action";

let controlBarHeight = VAL_CSS_CONTROL_PANEL;
let controlClz = "space-x-1 flex  flex-coumn items-center justify-between";

type PassProps = CommonPassProp & {};

let TextTransformerControl = (props: CommonPassProp) => {
  let { inputBigTextId } = props;
  let leftActions: ButtonProps[] = [
    {
      text: Dot("g4lqi", "Get MD2 Hash"),
      intent: "primary",
      title: Dot("Zpqqpf", "Encrypt the data with MD2"),
    },
    {
      text: Dot("2bqHk", "Load from File"),
      intent: "none",
      title: Dot("NNfJo", "Load Data from File"),
    },
    {
      text: Dot("IWUH5", "Show Example"),
      intent: "none",
      className: "",
      title: Dot("NNd1o", "Use Example for Testing"),
      onClick: () => {
        let val = "hello, world";
        FN_GetDispatch()(
          FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, val)
        );
      },
    },
  ];
  let rightActions: ButtonProps[] = [
    {
      icon: "duplicate",
      intent: "success",
      text: Dot("Mg4ldi", "Copy"),
      title: Dot("2JyFN", "Copy Result to Clipboard"),
    },
    {
      // icon: "export",
      icon: "download",
      intent: "success" as any,
      className: "btn-purple",
      text: Dot("o52xW", "Export"),
      title: Dot("i88tb", "Export Result to File"),
    },
    {
      icon: "cog",
      title: Dot("Fy217", "Configure Text Transformer"),
    },
  ];
  return (
    <div
      className="w-full using-edge-ui-bg flex  border-b-[1px] dark:border-gray-600 px-1  flex-column items-center justify-between"
      style={{
        height: controlBarHeight,
      }}
    >
      <div className={controlClz}>
        {leftActions.map(fn_format_button("bottom-start"))}
      </div>
      <div className={controlClz}>
        {rightActions.map(fn_format_button("bottom-end"))}
      </div>
    </div>
  );
};

export let fn_format_button = (pmt: string) => {
  return (x: ButtonProps) => {
    return (
      <Tooltip placement={pmt as any} content={x.title}>
        <Button
          {...x}
          title={""}
          small
          intent={x.intent}
          text={x.text}
        ></Button>
      </Tooltip>
    );
  };
};
export default (props: PassProps) => {
  let sessionId = props.sessionId;
  let bodyHeight = `calc(100% - ${controlBarHeight}px)`;
  let inputBigTextId = props.inputBigTextId;
  let outputBigTextId = props.outputBigTextId;

  let commonPassProp: CommonPassProp = {
    sessionId,
    inputBigTextId,
    outputBigTextId,
  };
  return (
    <div className="w-full h-full relative">
      <TextTransformerControl {...commonPassProp}></TextTransformerControl>
      <div
        style={{
          height: bodyHeight,
        }}
        className="w-full overflow-auto"
      >
        <GenCodeMirror
          bigTextId={inputBigTextId}
          // value={"this is test data for " + sessionId}
        ></GenCodeMirror>
      </div>
      <div className="absolute bottom-0 right-0">
        <div>this is card options</div>
      </div>
    </div>
  );
};
