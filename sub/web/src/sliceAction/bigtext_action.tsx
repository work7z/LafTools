import { FN_GetState } from "../nocycle";
import _ from "lodash";
import bigtextSlice, { TextKVStatus } from "../slice/BigTextSlice";

/**
 * if there's an internal value in editor, then read it
 * otherwise read value instead of.
 *
 * @param bigTextId
 * @returns
 */
export let FN_GetActualTextValueByBigTextId = (
  bigTextId: string
): ((...args: any) => string) => {
  return (dis): string => {
    let stMap = FN_GetState().bigtext.textKVStatusMap[bigTextId];
    if (_.isNil(stMap)) {
      return "";
    }
    if (stMap.internalValue) {
      return stMap.internalValue;
    }
    return stMap.value;
  };
};

export let FN_SetTextValueFromInsideByBigTextId = (
  bigTextId: string,
  newValue: string
) => {
  return (dis) => {
    let stMap: TextKVStatus = FN_GetState().bigtext.textKVStatusMap[bigTextId];
    if (_.isNil(stMap)) {
      stMap = {
        outsideUpdateVer: 1,
        value: newValue,
        internalValue: null,
      };
    } else {
      // do not put outsideUpdateVer here
      stMap = {
        ...stMap,
        value: newValue,
      };
    }
    // update
    dis(
      bigtextSlice.actions.updateTextKVStatusMapById({
        key: bigTextId,
        value: stMap,
      })
    );
  };
};

export let FN_SetTextValueFromOutSideByBigTextId = (
  bigTextId: string,
  newValue: string
) => {
  return (dis) => {
    let stMap: TextKVStatus = FN_GetState().bigtext.textKVStatusMap[bigTextId];
    if (_.isNil(stMap)) {
      stMap = {
        outsideUpdateVer: 1,
        value: newValue,
        internalValue: null,
      };
    } else {
      stMap = {
        ...stMap,
        outsideUpdateVer: stMap.outsideUpdateVer + 1,
        internalValue: null,
        value: newValue,
      };
    }
    dis(
      bigtextSlice.actions.updateTextKVStatusMapById({
        key: bigTextId,
        value: stMap,
      })
    );
  };
};
