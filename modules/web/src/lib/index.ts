import { ExtensionVM } from '../types/purejs-types-READ_ONLY'
import gutils from '../utils/GlobalUtils';
import Chef from './core/Chef.mjs'
import Utils from './core/Utils.mjs';
import setupApp from './setupApp.ts'
import DefaultMJS from './core/config/modules/Default.tsx'

setupApp()

export type ProcessReturnType = {
    result: string;
    error?: string
}

let chefInst = new Chef()
gutils.ExposureIt("chef1", chefInst)
gutils.ExposureIt("DefaultMJS", DefaultMJS)


let LibIndex = {
    chef: chefInst,
    process: async (originalValue: string, param: {
        extVM: ExtensionVM | undefined,
        extId: string | undefined
    }): Promise<ProcessReturnType> => {
        let inst = new DefaultMJS.ToBase64()
        let ipt = Utils.strToArrayBuffer(originalValue)
        let result = inst.run(ipt, [])
        return {
            result: result
        }
    }
}

export default LibIndex