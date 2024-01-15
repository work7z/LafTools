import { ExtensionVM } from "../types/purejs-types-READ_ONLY.ts";
import gutils from "../utils/GlobalUtils.tsx";
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
      extVM: ExtensionVM | undefined;
      extId: string | undefined;
    },
  ): Promise<ProcessReturnType> => {
    try {
      // let inst = new ToBase64();
      // let ipt = Utils.strToArrayBuffer(originalValue);
      // let result = inst.run(ipt, []);
      return {
        result: "test",
      };
    } catch (e) {
      console.log("err", e);
      return {
        result: "",
        error: gutils.getErrMsg(e),
      };
    }
  },
};

export default LibIndex;
