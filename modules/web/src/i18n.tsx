// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 7 Jan 2024
// Author: Ryan Laf <get>
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

import appi18nJSON from '../../../resources/public/purejs/app-i18n.json'
import _ from 'lodash'


export let getFormattedLang = function (crtLang: string) {
  // let crtLang = TranslationUtils.CurrentLanguage
  if (crtLang == 'zh_CN') {
    return 'zh-hans'
  }
  if (crtLang == 'zh_HK') {
    return 'zh-hant'
  }
  if (crtLang == 'en_US') {
    return 'en'
  }
  return crtLang;
}

let prevLangValue: string | null = null

export let GetUserActualClientLang = function (): string {
  if (prevLangValue) return prevLangValue
  // if url is specified, then forcebly use this once
  let matchResult = location.href.match(/\/app\/([^\/]+)/)
  if (matchResult) {
    let prevValue = matchResult[1]
    if (prevValue == 'zh-hans') {
      prevValue = 'zh_CN'
    }
    if (prevValue == 'zh-hant') {
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
