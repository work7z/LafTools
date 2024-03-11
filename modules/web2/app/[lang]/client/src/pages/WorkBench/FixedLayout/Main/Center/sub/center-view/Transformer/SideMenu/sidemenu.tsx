

import React, { useEffect, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CSS_TW_LAYOUT_BORDER_LIGHTER, CommonTransformerPassProp, LabelValuePair } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntimeProp } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/cTranslationUtils'
import { usePromiseWait } from '../hooks'
import _ from 'lodash'
import { AnchorButton, Button, Callout, SegmentedControl, Tabs } from '@blueprintjs/core'
import { CodeImplDetail, CodeImplMap, program_languages } from '@/app/[lang]/client/src/impl/tools/code/types'
import GenCodeMirror from '../../../../../../../../../components/GenCodeMirror'
import exportUtils from '../../../../../../../../../utils/ExportUtils'

export default (props: CommonTransformerPassProp & TransformerWithRuntimeProp) => {
    exportUtils.useLoadDotCountCpt()
    let [defaultTab, setDefaultTab] = useState<"workflow" | "actions">("workflow")
    return <div>
        <SegmentedControl
            options={[
                {
                    label: Dot("workflow.label", "Workflow"),
                    value: "workflow",
                },
                {
                    label: Dot("actions.list", "Actions"),
                    value: "actions",
                },
            ]}
            onValueChange={(value) => {
                setDefaultTab(value as any)
            }}
            defaultValue={defaultTab}
        />
        {
            defaultTab === "workflow" && <div>
                <div className='p-2'>
                    {Dot("IZ8H4v6fF", "This tab is under construction. In short, it can provide a chain of operations to be performed on the input data. For example, you can compress the JSON, escape the JSON, convert the JSON to a model, convert the CSV to a model, and so on.")}
                </div>
            </div>
        }
        {
            defaultTab === "actions" && <div>
                <div className='p-2 space-y-2 space-x-2'>
                    {
                        [
                            Dot("_Gy58tXpA", "Compress JSON"),
                            Dot("EvZEuiDq3", "Escape JSON"),
                            Dot("gMLVY-C4m", "JSON to Model"),
                            Dot("fZsxfYv1v", "CSV to Model"),
                            Dot("-LAmf2wHX", "Convert to CSV"),
                            Dot("d2i7Y9m7b", "Convert to JSON"),
                            Dot("3EWVUaSJ7", "To Base64"),
                            Dot("3EWVUaSJ7", "From Base64"),
                            Dot("tINhjycwO", "Duplicate Value"),
                        ].map(x => {
                            return <Button intent="primary" small outlined onClick={() => {
                                alert(Dot("goIm36_Ns", "Sorry, not implemented yet"))
                            }}>{x}</Button>
                        })
                    }
                </div>
            </div>
        }
    </div>
}