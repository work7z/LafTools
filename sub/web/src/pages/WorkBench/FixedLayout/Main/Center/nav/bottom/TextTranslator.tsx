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

import { Button } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../components/GenCodeMirror";
import { Dot } from "../../../../../../../utils/TranslationUtils";
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../definitions/WB_Types";
import { Allotment, AllotmentHandle } from "allotment";

type SrcTarget = "source" | "target";

let EachTranslatorBlock = (props: { inputId: string; type: SrcTarget }) => {
  let placeholder =
    props.type == "source"
      ? Dot("L4Lm1", "Please input your source text in this editor.")
      : Dot("HEAhr", "After translating, the result will appear here.");
  return (
    <div className="h-full w-full inline-block ">
      <GenCodeMirror
        placeholder={placeholder}
        lineWrap={true}
        bigTextId={props.inputId}
        key={""}
      ></GenCodeMirror>
    </div>
  );
};

let LanguageChooser = (props: { label: string }) => {
  return <Button small minimal text={props.label + ": English"}></Button>;
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

export default () => {
  let sessionId = "nav-translator";
  let textInputId = sessionId + "ipt";
  let textOutputId = sessionId + "opt";
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
            label={Dot("jJuNz", "Source Language")}
          ></LanguageChooser>
          <Button minimal small intent="none" icon="swap-horizontal"></Button>
          <LanguageChooser
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
              inputId={textInputId}
              type="source"
            ></EachTranslatorBlock>
          </Allotment.Pane>
          <Allotment.Pane>
            <EachTranslatorBlock
              inputId={textOutputId}
              type="target"
            ></EachTranslatorBlock>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
};
