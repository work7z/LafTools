// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Mon, 22 Jan 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import _ from "lodash";
import { ExtensionVM } from "@/app/[lang]/client/src/types/purejs-types-READ_ONLY.ts";
import gutils from "@/app/[lang]/client/src/utils//GlobalUtils.tsx";
import Operation from "../core/Operation.tsx";
// import Chef from "./core/Chef.mjs";
import Utils from "../core/Utils.mjs";
import setupApp from "../setupApp.ts";
import { sleep } from "@/app/[lang]/client/src/utils//SyncUtils.tsx";
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
      let inst = param.operation;
      let input: any = originalValue;
      if (inst.inputType == "ArrayBuffer") {
        input = Utils.strToArrayBuffer(input);
      }
      // TODO: arg value should be coming from a model not form, it's just more convenient for now
      let argsValueArr = _.map(inst.args, (arg) => {
        let eachValue = _.get(arg, 'value')
        if (_.isString(eachValue)) {
          return eachValue
        }
        if (_.isArray(eachValue)) {
          let p = _.get(eachValue, [0])
          if (typeof p == 'string') {
            return p
          }
          return _.get(eachValue, [0, 'value'])
        }
        return eachValue;
      })
      if (_.isNil(argsValueArr)) {
        argsValueArr = []
      }
      let result = inst.run(input, argsValueArr);
      if (inst.outputType == "ArrayBuffer") {
        result = Utils.arrayBufferToStr(result);
      }
      if (inst.outputType == "string") {
        // do nothing
      }
      if (inst.outputType == "byteArray") {
        result = Utils.byteArrayToChars(result);
      }
      // consolidate the result
      result = Utils.parseEscapedChars(result)
      return {
        result,
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
