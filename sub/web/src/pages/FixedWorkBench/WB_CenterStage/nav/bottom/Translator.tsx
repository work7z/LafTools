import { Button } from "@blueprintjs/core"
import GenCodeMirror from "../../../../../components/GenCodeMirror"
import { Dot } from "../../../../../utils/TranslationUtils"
import { VAL_CSS_TAB_TITLE_PANEL } from "../../../definitions/WB_Types"

type SrcTarget = 'source' | 'target'

let EachTranslatorBlock = (props: { type: SrcTarget }) => {
  return (
    <div className="h-full w-50p inline-block ">
      <div style={{
        height: VAL_CSS_TAB_TITLE_PANEL
      }} className=" px-2 flex flex-col justify-between align-middle">
        <div>
          <Button small minimal  text={props.type == 'source' ? Dot("jJuNz", "Source Language") : Dot("TwFcr", "Target Language")}></Button>
        </div>
      </div>
      <div className="w-full" style={{
          height: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL})`,
          maxHeight: `calc(100% - ${VAL_CSS_TAB_TITLE_PANEL})`,
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