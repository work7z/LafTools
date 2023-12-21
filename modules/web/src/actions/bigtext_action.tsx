// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 10 Dec 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
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

import { FN_GetState } from "../nocycle";
import _ from "lodash";
import bigtextSlice, { TextKVStatus } from "../reducers/BigTextSlice";

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

export let FN_SetTextValueFromInsideByBigTextId___DONOTUSEIT__EXTERNALLY = (
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
        internalValue: newValue, // put value into internalValue
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
        outsideUpdateVer: 2,
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
