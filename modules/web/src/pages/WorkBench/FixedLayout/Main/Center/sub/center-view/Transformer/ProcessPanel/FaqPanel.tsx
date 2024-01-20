import React, { useEffect, useState } from 'react'
import { CommonTransformerProps } from '../types'
import { CommonTransformerPassProp } from '../../../../../../../../../types/workbench-types'
import { TransformerWithRuntime as TransformerWithRuntime } from '../hooks'
import gutils from '../../../../../../../../../utils/GlobalUtils'
import { Dot } from '../../../../../../../../../utils/TranslationUtils'


let usePromiseWait = (obj: {
    text: string,
    promise: () => Promise<any>,
}): { loading: boolean, progressText: string } => {
    let [errorMsg, onErrorMsg] = useState<string | null>(null)
    let [loadingStatic, setLoadingStatic] = useState(true)

    let [loadError, onLoadError] = useState<string | null>(null)
    let [loadingProgressRate, setLoadingProgressRate] = useState(0)

    let progressText = loadingStatic ? `${obj.text} ${loadingProgressRate}%` : obj.text;
    // increment percentage randomly, and mark its loading  as false if success, or set errorMsg if having error 
    useEffect(() => {
        let tmp_loadingProgressRate = 0
        let loopFn = () => {
            let maxVal = 98.16;
            if (tmp_loadingProgressRate >= maxVal) {
                clearInterval(timer)
                return
            }
            tmp_loadingProgressRate = Math.min(maxVal, tmp_loadingProgressRate + (Math.random() * 4))
            setLoadingProgressRate(tmp_loadingProgressRate)
        }
        let timer = setInterval(loopFn, 89);
        (async () => {
            try {
                onLoadError(null)
                setLoadingProgressRate(0)
                setLoadingStatic(true)
                // await gutils.sleep(30000)
                await obj.promise()
                window.clearInterval(timer)
                setLoadingStatic(false)
            } catch (e) {
                let anyError = gutils.getErrMsg(e)
                onLoadError(anyError)
                window.clearInterval(timer)
            } finally {
                setLoadingStatic(false)
            }
        })()
        return () => {
            window.clearInterval(timer)
        }
    }, [])

    if (loadError) {
        loadingStatic = false
        progressText = Dot("07naT", "Error: {0}", loadError)
    }
    return {
        loading: loadingStatic,
        progressText
    }
}

export default (props: CommonTransformerPassProp & TransformerWithRuntime) => {
    // props.toolHandler
    let { loading, progressText } = usePromiseWait({
        text: Dot("jhDoE", "Retrieving FAQ Data"),
        promise: async () => {
            await gutils.sleep(3000)
        }
    })
    return <div>nihao</div>
}