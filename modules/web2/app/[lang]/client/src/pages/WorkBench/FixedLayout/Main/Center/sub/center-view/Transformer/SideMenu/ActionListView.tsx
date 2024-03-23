

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CSS_BG_COLOR_WHITE, CSS_TW_LAYOUT_BORDER_LIGHTER, CommonTransformerPassProp, LabelValuePair, VAL_CSS_TAB_TITLE_PANEL, light_border_clz_all, tw } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntimeProp } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/cTranslationUtils'
import { usePromiseWait } from '../hooks'
import _ from 'lodash'
import { AnchorButton, Button, Callout, InputGroup, Intent, SegmentedControl, Tabs, Tooltip } from '@blueprintjs/core'
import { CodeImplDetail, CodeImplMap, program_languages } from '@/app/[lang]/client/src/impl/tools/code/types'
import GenCodeMirror from '../../../../../../../../../components/GenCodeMirror'
import exportUtils from '../../../../../../../../../utils/ExportUtils'
import { SysTabPane } from '@/app/[lang]/client/src/components/SysTabPane'
import { FN_GetDispatch } from '@/app/[lang]/client/src/nocycle'
import { OpDetail, getAllOperationDetails } from '@/app/[lang]/client/src/impl/tools/s_tools'
import { useInitFunctionOnceOnly } from '@/app/__CORE__/hooks/cache'
import ParamStateSlice, { ToolSideMenuTabIdType } from '@/app/[lang]/client/src/reducers/state/paramStateSlice'
import { ICON_BTN_TRIGGER_FN, TOOLTIP_OPEN_DELAY_BTN } from '@/app/__CORE__/meta/constants'

export default (props: CommonTransformerPassProp & TransformerWithRuntimeProp & {
    opDetails: OpDetail[]
}) => {
    let filteredOpDetails = props.opDetails
    let { searchText } = exportUtils.useSelector(v => {
        return {
            searchText: v.paramState.tsdrsipt
        }
    })
    let setSearchText = useCallback(_.debounce((v: string) => {
        FN_GetDispatch()(ParamStateSlice.actions.updateOneOfParamState({
            tsdrsipt: v
        }))
    }, 200), [])
    return (
        <div>
            <div className='p-1 space-y-1 space-x-1'>
                <div className='w-full my-1'>
                    <InputGroup defaultValue={searchText} onChange={e => {
                        setSearchText(e.target.value)
                    }} leftIcon='search' round fill small placeholder={Dot("uCTxxZbSG", "Search Operations by Name")} />
                </div>
                {
                    filteredOpDetails && _.isEmpty(filteredOpDetails) && <div className='p-2'>
                        <Callout intent='warning' title={Dot('ShgVLLtWo', "No Operations Found")}></Callout></div>
                }
                {
                    _.map(filteredOpDetails, (x, d) => {
                        let isCurrent = x.id == props.crtSideMenuOperaId
                        let { twBgClz, twClz, intent } = x
                        let whatIntent = intent;
                        let isCurrentAndLoaded = isCurrent && !props.loadingExtraOpList
                        if (isCurrentAndLoaded) {
                            twClz = twBgClz
                            if (twBgClz != '') {
                                whatIntent = 'primary'
                            }
                            if (whatIntent == 'none') {
                                whatIntent = 'primary'
                            }
                        }
                        return <Tooltip placement='top' content={
                            <div style={{
                                maxWidth: '400px'
                            }} dangerouslySetInnerHTML={{ __html: x.description }}></div>
                        } hoverOpenDelay={TOOLTIP_OPEN_DELAY_BTN} >
                            <Button small loading={isCurrent && props.loadingExtraOpList} minimal={!isCurrent} className={twClz} style={{
                            }} outlined={!isCurrent} icon={
                                isCurrentAndLoaded ? ICON_BTN_TRIGGER_FN : undefined
                            } intent={whatIntent} key={d} onClick={async () => {
                                await props.fn_switchToSideMenuExtraOp(x.id)
                                await props.onProcess()
                            }}>{x.label}</Button>
                        </Tooltip>
                    })
                }
            </div>
        </div>
    )
}