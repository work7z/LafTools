// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 29 Sep 2023
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

// SKIP_DOT
import _ from "lodash";
import { LANG_EN_US, LangDefinition } from "../types/constants";
import { VER_FORGE_FORM } from "../types/constants";
import { safeparse } from "./g_ref";

export const KEY_LANG_PACK_ZH_CN = "KEY_LANG_PACK_ZH_CN" + VER_FORGE_FORM;
export const KEY_LANG_PACK_ZH_HK = "KEY_LANG_PACK_ZH_HK" + VER_FORGE_FORM;

interface LangMap {
  zh_CN: LangDefinition;
  zh_HK: LangDefinition;
}
let newLangMap2 = (): LangMap => {
  return {
    zh_CN: {},
    zh_HK: {},
  };
};
export const newLangMap = newLangMap2;
let crtNewLangMap = newLangMap();
// TODO: for multiple values, use ref id to reduce the transimit size

export const LANG_INIT_BEFORE_MAP: { [key: string]: boolean } = {};

try {
  let m1 = safeparse(localStorage.getItem(KEY_LANG_PACK_ZH_CN));
  if (!_.isNil(m1) && _.isObject(m1)) {
    crtNewLangMap.zh_CN = m1 as LangDefinition;
  }
  // do same for KEY_LANG_PACK_ZH_HK
  let m2 = safeparse(localStorage.getItem(KEY_LANG_PACK_ZH_HK));
  if (!_.isNil(m2) && _.isObject(m2)) {
    crtNewLangMap.zh_HK = m2 as LangDefinition;
  }
} catch (e) {
  // do nothing
}

function formatResultWithReplacer(val = "", ...args) {
  if (_.isNil(args)) {
    args = [];
  }
  for (let index in args) {
    let tval = args[index];
    while (true) {
      let p = "{" + index + "}";
      val = (val + "").replace(p, tval);
      if (val.indexOf(p) == -1) {
        break;
      }
    }
  }
  return val;
}

const TranslationUtils = {
  CurrentLanguage: LANG_EN_US,
  IsChinese() {
    return (
      TranslationUtils.CurrentLanguage == "zh_CN"
    );
  },
  LangMap: crtNewLangMap,
  RealtimeObj: {},
  Dot(id: string, enText: string, ...args: any[]): string {
    let language = TranslationUtils.CurrentLanguage;
    if (language == LANG_EN_US) {
      // do nothing
    } else {
      let langmap = TranslationUtils.LangMap;
      let o = langmap[language] as LangDefinition;
      if (_.isNil(o)) {
        return enText;
      }
      let preText = o[id];
      if (!_.isNil(preText)) {
        enText = preText;
      }
    }
    let finResult = formatResultWithReplacer(enText, ...args);
    return finResult;
  },
};

export default TranslationUtils;
export const Dot = TranslationUtils.Dot;
