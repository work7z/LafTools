
import CardPanel from "../../components/CardPanel"
import { Dot } from "../../utils/TranslationUtils"
import MoonSunControl from "../UserPanel/MoonSunControl"
import React from 'react'

export let translationLangs:{
    "Label": string[],
    "LabelByLang": string,
    "Value": string,
    "Href": string,
    "LabelInEnglish": string
}[] = [
    {
        "Label": [
            "f7akol",
            "English"
        ],
        "LabelByLang": "English",
        "Value": "en_US",
        "Href":"en",
        "LabelInEnglish": "English"
    },
    {
        "Label": [
            "spdh98",
            "Simplified Chinese"
        ],
        "LabelByLang": "简体中文",
        "Value": "zh_CN",
        "Href":"zh-hans",
        "LabelInEnglish": "Simplified Chinese"
    },
    {
        "Label": [
            "7dm0d8",
            "Traditional Chinese"
        ],
        "LabelByLang": "繁體中文",
        "Href":"zh-hant",
        "Value": "zh_HK",
        "LabelInEnglish": "Traditional Chinese"
    }
]

export default ()=>{
    return (
        <CardPanel children={<div className='p-2 pl-4 text-xs'>

<div className="hs-accordion-group">
  <div className="hs-accordion " id="hs-basic-heading-one">
  <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400" aria-controls="hs-basic-with-arrow-collapse-two">
      <svg className="hs-accordion-active:hidden block w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      <svg className="hs-accordion-active:block hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      Choose Language
    </button>

    <div id="hs-basic-collapse-one" className="hidden hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-heading-one">
    {
          translationLangs.map(x => {
                return <div className='p-2 flex flex-row justify-between items-center hover:bg-slate-100 cursor-pointer transition-all'>
                    <a href={'/' + x.Value}>    <div>{x.LabelByLang}{x.Value == 'en_US' ? '':`(${x.LabelInEnglish})`}</div>
                    </a>
                </div>
            })
        }
    </div>
  </div>

</div>

       
    </div>}></CardPanel>
    )
}