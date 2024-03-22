

import React, { useEffect, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CSS_BG_COLOR_WHITE, CSS_TW_LAYOUT_BORDER_LIGHTER, CommonTransformerPassProp, LabelValuePair, VAL_CSS_TAB_TITLE_PANEL, light_border_clz_all } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntimeProp } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/cTranslationUtils'
import { usePromiseWait } from '../hooks'
import _ from 'lodash'
import { AnchorButton, Button, Callout, SegmentedControl, Tabs } from '@blueprintjs/core'
import { CodeImplDetail, CodeImplMap, program_languages } from '@/app/[lang]/client/src/impl/tools/code/types'
import GenCodeMirror from '../../../../../../../../../components/GenCodeMirror'
import exportUtils from '../../../../../../../../../utils/ExportUtils'
import { SysTabPane } from '@/app/[lang]/client/src/components/SysTabPane'
import { FN_GetDispatch } from '@/app/[lang]/client/src/nocycle'
import { OpDetail, getAllOperationDetails } from '@/app/[lang]/client/src/impl/tools/s_tools'
import { useInitFunctionOnceOnly } from '@/app/__CORE__/hooks/cache'

export default (props: CommonTransformerPassProp & TransformerWithRuntimeProp) => {
    exportUtils.useLoadDotCountCpt()
    let [defaultTab, setDefaultTab] = useState<"workflow" | "actions">("workflow")
    let [opDetails, setOpDetails] = useState<OpDetail[]>([])
    useEffect(() => {
        setTimeout(async () => {
            let opds = await getAllOperationDetails()
            setOpDetails(opds)
            console.log('opds', opds)
        }, 0)
    }, ['5AcBr-NNh'])
    let innerContent = (
        <div>
            <SegmentedControl
                // fill
                options={[
                    {
                        label: Dot("workflow.label", "Action Flow"),
                        value: "workflow",
                    },
                    // {
                    //     label: Dot("actions.list", "Actions"),
                    //     value: "actions",
                    // },
                    // list all workflow that your user has created 
                    {
                        label: Dot("actions.favourites", "Favourites"),
                        value: "favourites",
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
        </div>)
    return <div className='w-full h-full'>
        <div className={CSS_BG_COLOR_WHITE + ` w-full italic text-xs justify-center flex flex-row items-center ` + light_border_clz_all}
            style={{ borderRight: 'none', borderTop: 'none', borderLeft: 'none', height: VAL_CSS_TAB_TITLE_PANEL }}>
            <span>
                {Dot("ULpCU0JWm", "Manage My Tools")}
            </span>
        </div>
        <div className='flex-1'>
            {innerContent}
        </div>
    </div>
    // return (
    //     <SysTabPane
    //         crtLeftNavId="sidebar"
    //         leftNavList={[
    //             {
    //                 label: Dot("oAjB8KhwV", "Side Toolbar"),
    //                 value: "sidebar",
    //             },
    //             {
    //                 label: Dot("history", "My History"),
    //                 value: "history",
    //             },
    //         ]}
    //         rightCtrls={fn_rightCtrl_common}
    //         children={<div className='w-full h-full overflow-auto'>
    //             {innerContent}
    //         </div>}
    //     ></SysTabPane>
    // )
}