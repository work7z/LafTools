import GenCodeMirror from "../../../../../components/GenCodeMirror"

type SrcTarget='source'|'target'

let EachTranslatorBlock = (props:{type:SrcTarget})=>{
  return (
    <div className="w-50p inline-block">
      <div>{props.type}</div>
      <GenCodeMirror lineWrap={true} bigTextId="ksdk1" key={''}></GenCodeMirror>
    </div>

  )
}

export default  () => {
  return <div className="flex flex-row h-full w-full p-4">
    <EachTranslatorBlock type='source'></EachTranslatorBlock>
    <EachTranslatorBlock type='target'></EachTranslatorBlock>
  </div>
}