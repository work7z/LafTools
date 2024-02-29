'use client'
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
import { headers } from 'next/headers';
import _ from "lodash";
import { LANG_EN_US, LangDefinition } from "../types/constants";
import { usePathname } from 'next/navigation'
import { all_locales, zhCNLocale } from '@/middleware';
import { fmtURL_Client } from './cRouteUtils';

let VER_FORGE_FORM = '0.0.1'
export const KEY_LANG_PACK_ZH_CN = "KEY_LANG_PACK_ZH_CN" + VER_FORGE_FORM;
export const KEY_LANG_PACK_ZH_HK = "KEY_LANG_PACK_ZH_HK" + VER_FORGE_FORM;


let document = null;
export let sysLocale = zhCNLocale
if (typeof window !== "undefined") {
  let sysLang = window['document'].body.parentElement?.getAttribute("lang")
  sysLocale = all_locales.find(x => x.langInHttp == sysLang) || sysLocale
}


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

export const LANG_INIT_BEFORE_MAP: { [key: string]: boolean } = {};

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

export let getCurrentLang = () => {
  return sysLocale.langIni18n
}


if (window['__LANG2CLIENT__']) {
  let preLangMap = JSON.parse(window['__LANG2CLIENT__'])
  crtNewLangMap[getCurrentLang()] = preLangMap
}

const TranslationUtils = {
  ForcbilyLanguage: "",
  CurrentLanguage: sysLocale.langIni18n,
  IsChinese() {
    return (
      TranslationUtils.CurrentLanguage == "zh_CN"
    );
  },
  LangMap: crtNewLangMap,
  RealtimeObj: {},
  Dot(id: string, enText: string, ...args: any[]): string {
    let language = '';
    language = getCurrentLang()

    if (!TranslationUtils.LangMap[language]) {
      TranslationUtils.LangMap[language] = {}
    }
    // if (language != 'en_US') {
    //   let pmap = {} // require("../../../public/static/lang/" + language + ".json")
    //   TranslationUtils.LangMap[language] = pmap
    // }
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
