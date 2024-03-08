// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import _ from 'lodash'
import TranslationUtils from './utils/cTranslationUtils'
import i18nItems from '@/app/__CORE__/config/i18n'
let appi18nJSON = i18nItems

export let getFormattedLang = function (crtLang: string) {
  if (crtLang == 'zh_CN') {
    return 'cn'
  }
  if (crtLang == 'zh_HK') {
    // return 'zh-hant'
    return 'hk'
  }
  if (crtLang == 'en_US') {
    return 'en'
  }
  return crtLang;
}

let prevLangValue: string | null = null

export let GetUserActualClientLang = function (): string {
  if (TranslationUtils.ForcbilyLanguage) {
    return TranslationUtils.ForcbilyLanguage
  }
  if (prevLangValue) return prevLangValue
  // if url is specified, then forcebly use this once
  if ((typeof location === 'undefined')) {
    return TranslationUtils.getCurrentLang();
  }
  let matchResult = location.href.match(/\/app\/([^\/]+)/)
  if (matchResult) {
    let prevValue = matchResult[1]
    if (prevValue == 'zh-hans' || prevValue == 'zh-cn' || prevValue == 'zh') {
      prevValue = 'zh_CN'
    }
    if (prevValue == 'zh-hant' || prevValue == 'zh-tw' || prevValue == 'hk') {
      prevValue = 'zh_HK'
    }
    if (prevValue == 'en') {
      prevValue = 'en_US'
    }
    let findIdx = _.findIndex(appi18nJSON, x => x.Value == prevValue)
    if (findIdx != -1) {
      prevLangValue = prevValue
      return prevValue;
    }
  }



  let finalLang = "en_US";
  if (!navigator || !navigator.languages) {
    return finalLang
  }
  let found = false;
  navigator.languages.forEach(locale_str => {
    if (found) return;
    if (locale_str == "zh-CN") {
      found = true;
      finalLang = "zh_CN";
    } else if (locale_str == "zh-TW" || locale_str == "zh-HK") {
      found = true;
      finalLang = "zh_HK";
    }
  })
  return finalLang
}
