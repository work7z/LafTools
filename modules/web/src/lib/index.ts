import { ExtensionVM } from '../types/purejs-types-READ_ONLY'
import gutils from '../utils/GlobalUtils';
import Chef from './core/Chef.mjs'
import Utils from './core/Utils.mjs';
import DefaultMJS from './core/config/modules/Default.tsx'

export type ProcessReturnType = {
    result: string;
    error?: string
}

let chefInst = new Chef()
gutils.ExposureIt("chef1", chefInst)
gutils.ExposureIt("DefaultMJS", DefaultMJS)
let a = new DefaultMJS.ToBase64()
let ipt = Utils.strToArrayBuffer("ok12345")
let b = a.run(ipt, [])
gutils.ExposureIt("ProcessedValue", b)


let LibIndex = {
    chef: chefInst,
    process: async (originalValue: string, param: {
        extVM: ExtensionVM | undefined,
        extId: string | undefined
    }): Promise<ProcessReturnType> => {
        return {
            result: originalValue + "_test"
        }
    }
}

export default LibIndex