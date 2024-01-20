import React, { useEffect, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CommonTransformerPassProp } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntime } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/TranslationUtils'
import { usePromiseWait } from '../hooks'
import { FAQItem } from '../../../../../../../../../lib/tools/faq/types'
import _ from 'lodash'
import { AnchorButton, Button } from '@blueprintjs/core'

export default (props: CommonTransformerPassProp & TransformerWithRuntime) => {
    // props.toolHandler
    let [faq, onFaq] = useState<FAQItem[]>([])
    let { loading, progressText } = usePromiseWait({
        text: Dot("jhDoE", "Retrieving FAQ Data"),
        whenToStart: !_.isNil(props.toolHandler),
        promise: async () => {
            if (!props.toolHandler) {
                return;
            }
            let crt_faq = await props.toolHandler.getFAQ()
            debugger;
            onFaq(crt_faq)
        }
    }, [props.toolHandler])
    if (loading) {
        return <div className="p-2">{progressText}</div>
    }
    if (!faq || faq.length == 0) {
        return <div className="p-2">{Dot("jgDoEq", "No FAQ Data")}</div>
    }
    return <div className='p-2'>
        <div className="flex justify-between items-center mb-2 mt-0">
            <div>
                <b>
                    {Dot("xOJqG1", "Frequently Asked Questions", _.size(faq))}:
                </b>    </div>
            <div>
                <a href={props.toolHandler?.getMetaInfo().infoURL} target='_blank'>
                    {Dot("U2ZNl", "Learn more on wikipedia")}
                </a>
            </div>
        </div>
        {
            faq.map((x, i) => {
                return <div key={i} className="transform transition-all border-slate-200 border-[1px] hover:border-lime-600 rounded overflow-hidden shadow-md mb-2 px-4 py-4">
                    <div className="px-0 pb-2 font-bold text-md ">({i + 1}) {x.question}</div>
                    <div className="px-0 py-0">{x.answer}</div>
                </div>
            })
        }
        <div className="text-center mb-2 mt-4">
            <AnchorButton target='_blank' minimal outlined href={'https://github.com/work7z/LafTools/issues'} intent="none" text={Dot("Ylq2X", "Error Correction")}></AnchorButton>
        </div>

    </div>
}