import { Button } from "@blueprintjs/core"
import GenCodeMirror from "../../../../../components/GenCodeMirror"
import { Dot } from "../../../../../utils/TranslationUtils"
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../definitions/WB_Types"

type SrcTarget = 'source' | 'target'

let EachTranslatorBlock = (props: { type: SrcTarget }) => {
  let isSource = props.type =='source'
  return (
    <div className="h-full w-50p inline-block ">
      <div style={{
        height: VAL_CSS_TAB_TITLE_PANEL
      }} className=" px-2 flex flex-row justify-between align-middle border-b-slate-200 border-2">
        <div>
          <Button small minimal  text={isSource ? Dot("jJuNz", "Source Language") : Dot("TwFcr", "Target Language")}></Button>
        </div>
        <div>{
          isSource ? <span>left</span>:<span>right</span>}</div>
      </div>
      <div className="w-full " style={{
          height: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
          maxHeight: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL}px)`,
          // overflow:'auto'
      }}>
      <GenCodeMirror lineWrap={true} bigTextId="ksdk1" key={''}></GenCodeMirror>

      </div>
    </div>

  )
}

export default () => {
  return <div className="flex flex-row h-full w-full p-4 overflow-auto">
    <EachTranslatorBlock type='source'></EachTranslatorBlock>
    <EachTranslatorBlock type='target'></EachTranslatorBlock>
  </div>
}