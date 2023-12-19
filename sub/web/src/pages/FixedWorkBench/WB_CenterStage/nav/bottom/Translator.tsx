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

import { Button } from "@blueprintjs/core"
import GenCodeMirror from "../../../../../components/GenCodeMirror"
import { Dot } from "../../../../../utils/TranslationUtils"
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../definitions/WB_Types"

type SrcTarget = 'source' | 'target'

let EachTranslatorBlock = (props: {inputId:string, type: SrcTarget }) => {
  let isSource = props.type == 'source'
  return (
    <div className="h-full w-50p inline-block ">
      <div style={{
        height: VAL_CSS_TAB_TITLE_PANEL,
        paddingLeft:0,
      }} className={" px-2 flex flex-row justify-between align-centter align-middle border-b-slate-200 border-b-2 items-center "+(
        !isSource ? '  ':''
      )} >
        <div>
          <Button  small minimal text={isSource ? Dot("jJuNz", "Source Language")+': Chinese' : Dot("TwFcr", "Target Language")+": English"}></Button>
        </div>
        <div className="">{
          isSource ? <span className='space-x-1'>
            <Button icon='search-text' small intent='primary' text={Dot("bjZyW", "Translate")}></Button>
            <Button small intent='none' icon='swap-horizontal'></Button>
          </span> :
            <span>
              <Button small icon='duplicate' intent='success' text={Dot("Fv-zz", "Copy Result")}></Button>
            </span>
        }</div>
      </div>
      <div className="w-full " style={{
        height: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
        maxHeight: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
        // overflow:'auto'
      }}>
        <GenCodeMirror lineWrap={true} bigTextId={props.inputId} key={''}></GenCodeMirror>
      </div>
    </div>

  )
}

export default () => {
  let sessionId='nav-translator'
  let textInputId=sessionId+'ipt';
  let textOutputId=sessionId+'opt'
  return <div className="flex flex-row h-full w-full  overflow-auto">
    <EachTranslatorBlock inputId={textInputId} type='source' ></EachTranslatorBlock>
    <EachTranslatorBlock inputId={textOutputId} type='target'></EachTranslatorBlock>
  </div>
}