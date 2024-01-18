import _ from "lodash";
import { ExtensionVM } from "../types/purejs-types-READ_ONLY.ts";
import gutils from "../utils/GlobalUtils.tsx";
import Operation from "./core/Operation.mjs";
// import Chef from "./core/Chef.mjs";
import Utils from "./core/Utils.mjs";
import setupApp from "./setupApp.ts";
// import ToBase64 from "./core/impl/ToBase64.js";
setupApp();

export type ProcessReturnType = {
  result: string;
  error?: string;
};

let LibIndex = {
  process: async (
    originalValue: string,
    param: {
      operation: Operation;
      extVM: ExtensionVM | undefined;
      extId: string | undefined;
    },
  ): Promise<ProcessReturnType> => {
    try {
      // debugger;
      let inst = param.operation;
      let ipt = originalValue;
      let result = inst.run(ipt, []);
      return {
        result: _.toString(result),
      };
    } catch (e) {
      console.log("err", e);
      return {
        result: "",
        error: _.toString(gutils.getErrMsg(e)),
      };
    }
  },
};
// let ipt = Utils.strToArrayBuffer(originalValue);

export default LibIndex;
