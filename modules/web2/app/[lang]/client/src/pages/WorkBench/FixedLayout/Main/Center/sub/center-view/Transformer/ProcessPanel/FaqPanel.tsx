// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 21 Jan 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

import React, { useEffect, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CommonTransformerPassProp } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntime } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/cTranslationUtils'
import { usePromiseWait } from '../hooks'
import { FAQItem } from '../../../../../../../../../impl/tools/faq/types'
import _ from 'lodash'
import { AnchorButton, Button } from '@blueprintjs/core'
import { logutils } from '../../../../../../../../../utils/LogUtils'
import exportUtils from '../../../../../../../../../utils/ExportUtils'

export default (props: CommonTransformerPassProp & TransformerWithRuntime) => {
    let dotCount = exportUtils.useLoadDotCountCpt()
    logutils.debug("dotCount", dotCount)
    // props.toolHandler
    let [faqFn, onFaqFn] = useState<{
        fn: () => FAQItem[]
    }>({
        fn: () => []
    })
    let { loading, progressText } = usePromiseWait({
        text: Dot("jhDoE", "Retrieving FAQ Data"),
        whenToStart: !_.isNil(props.toolHandler),
        promise: async () => {
            onFaqFn({
                fn: () => []
            })
            if (!props.toolHandler) {
                return;
            }
            let crt_faq = await props.toolHandler.getFAQ()
            crt_faq()
            onFaqFn({
                fn: crt_faq
            })
        }
    }, [props.toolHandler, props.sessionId])
    logutils.debug("faq-log", props.sessionId, faqFn)
    if (loading) {
        return <div className="p-2">{progressText}</div>
    }
    let faqArr: FAQItem[] = faqFn.fn()
    if (!faqFn || faqArr.length == 0) {
        return <div className="p-2">{Dot("jgDoEq", "No FAQ Data")}</div>
    }
    let infoURL = props.toolHandler?.getMetaInfo().infoURL
    return <div className='p-2'>
        <div className="flex justify-between items-center mb-2 mt-0">
            <div>
                <b>
                    {Dot("xOJqG1", "Frequently Asked Questions", _.size(faqFn))}:
                </b>    </div>
            <div>
                <a href={infoURL} target='_blank'>
                    {
                        infoURL && infoURL.indexOf("wikipedia") > 0 ? Dot("U2ZNl", "Learn more on Wikipedia")
                            : Dot("dQwjNbi0y", "Learn more on Documentation")
                    }
                </a>
            </div>
        </div>
        {
            faqArr.map((x, i) => {
                return <div key={i} className="transform transition-all hover:border-lime-600  dark:hover:border-lime-600  dark:border-slate-600 border-slate-200 border-[1px] rounded overflow-hidden shadow-md mb-2 px-4 py-4">
                    <div className="px-0 pb-2 font-bold text-md ">({i + 1}) {x.question}</div>
                    <div className="px-0 py-0">{x.answer}</div>
                    {
                        x.links && x.links.length > 0 && <div className="px-0 py-0">
                            <ul className="text-sm">
                                {
                                    x.links.map((y, j) => {
                                        return <li key={j}>
                                            <a href={y.link} target='_blank'>[{j + 1}] {y.name}</a>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    }
                </div>
            })
        }
        <div className="text-center mb-2 mt-4">
            {/* modules\web2\app\[lang]\client\src\lib\tools\faq */}
            <AnchorButton target='_blank' minimal outlined href={`https://github.com/work7z/LafTools/blob/dev/modules/web2/app/[lang]/client/src/lib/tools/faq/${props.extId}.tsx`} intent="none" text={Dot("Ylq2X", "Error Correction")}></AnchorButton>
        </div>

    </div>
}