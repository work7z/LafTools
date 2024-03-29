// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { useMemo } from "react";
import _ from "lodash";
import TokenUtils from "./TokenUtils";
import TranslationUtils from "./cTranslationUtils";

const exportUtils = {
  useLoadDotCountCpt: () => {
    return exportUtils.useSelector(v => {
      return {
        a: v.system.LoadDotCount
      }
    })
  },
  refresh_lang: (): any[] => {
    return [TranslationUtils.CurrentLanguage]
  },
  refresh_v1: () => {
    return {
      v: exportUtils.useSelector((val) => val.system.RefreshID),
      _uid: TokenUtils.getLocalUserId(),
    };
  },
  refresh_v2: () => {
    return { refetchOnMountOrArgChange: true };
  },
  refresh_v2_only_for_user: () => {
    return { skip: _.trim(TokenUtils.getLocalUserId() || "") == '' };
  },
  resize_factors: (): number[] => {
    return exportUtils.useSelector((val) => {
      return [val.system.ClientWidth, val.system.ClientHeight];
    });
  },
  dispatch: useDispatch,
  useDispatch: useDispatch,
  useCachedSelector<T>(callBack: (val: RootState) => T, cachedArr: any[]): T {
    return exportUtils.useSelector(callBack);
    // return useMemo(() => {
    //   return exportUtils.useSelector(callBack);
    // }, [...cachedArr]);
  },
  useSelector<T>(callBack: (val: RootState) => T, n?: any): T {
    if (_.isNil(n)) {
      n = shallowEqual;
    }
    return useSelector((val2: RootState) => {
      return callBack(val2);
    }, n);
  },
};

export default exportUtils;
