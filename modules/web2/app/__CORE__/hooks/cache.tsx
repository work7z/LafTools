import { useEffect } from "react";
import _ from 'lodash'

let cacheIdObj: { [key: string]: boolean } = {}

export let useInitFunctionOnceOnly = (fn: () => void, keyarr: string[]) => {
    let key = keyarr.join('-')
    let callInitOnce = _.once(fn);
    useEffect(() => {
        if (cacheIdObj[key]) {
            return
        }
        cacheIdObj[key] = true
        callInitOnce()
    }, [1]);
}