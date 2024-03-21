'use server'

import appToolInfoObj, { AppInfoType } from "./d_meta"
import { ToolHandler, ToolHandlerClass } from "./r_handler"
export type OpDetail = {
    id: string,
    label: string,
}
export let getAllOperationDetails = async (): Promise<OpDetail[]> => {
    return []

    // try {
    //     let opDetails: OpDetail[] = []
    //     for (let k in appToolInfoObj) {
    //         let infoObj: AppInfoType = appToolInfoObj[k]
    //         if (!infoObj.ImportImpl) continue
    //         let R: any = (await infoObj.ImportImpl()).default
    //         let impl: ToolHandler = new R()
    //         let ops = impl.getOperations()
    //         for (let x of ops) {
    //             let optd = x.getOptDetail()
    //             opDetails.push({ id: k, label: optd.name, })
    //         }
    //     }
    //     return opDetails
    // } catch (e) {
    //     debugger;
    //     return []
    // }
}