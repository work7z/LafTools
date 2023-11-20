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

import _ from "lodash";
import { Dot } from "./TranslationUtils";

const STR_DEV_MODE = "DEV_MODE";

function uuid(str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
  return str
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .replace(/-/gi, "");
}

const gutils = {
  copy(ctn: string) {
    var obj = document.getElementById("uniqueiptele") as any;
    if (obj) {
      obj.value = ctn;
      obj.select();
      document.execCommand("Copy");
    }
  },
  ConvertStrToNumberOrZero(val: string | null): number {
    if (_.isNil(val)) {
      return 0;
    }
    let r = parseInt(val);
    if (_.isNaN(r)) {
      return 0;
    }
    return r;
  },
  shortUuid() {
    return uuid().substring(0, 8);
  },
  stopE(e: any) {
    if (_.isNil(e)) return;
    e.preventDefault();
    e.stopPropagation();
  },
  uuid,
  emptyArr(val) {
    return _.isEmpty(val);
  },
  empty(val: string | null, ...anyOtherValues: string[]): boolean {
    if (_.isNil(anyOtherValues)) {
      anyOtherValues = [];
    }
    for (let a of anyOtherValues) {
      if (a == val) {
        return true;
      }
    }
    if (_.isNil(val) || val == "") {
      return true;
    }
    return false;
  },
  getStaticPath(subPath: string): string {
    return `/static/${subPath}`;
  },
  ExposureIt(key: string, value: any, devVisibleOnly?: boolean) {
    if (devVisibleOnly === true && !gutils.IsDevMode) {
      return;
    }
    _.set(window, key, value);
  },
  GetUserActualClientLang(): string {
    let locale_str = navigator.language;
    let finalLang = "en_US";
    if (locale_str == "zh-CN") {
      finalLang = "zh_CN";
    } else if (locale_str == "zh-TW" || locale_str == "zh-HK") {
      finalLang = "zh_HK";
    }
    return finalLang;
  },
  safeparse(str: string | null) {
    if (_.isNil(str)) {
      return null;
    }
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  },
  sleep(val: number): Promise<any> {
    return new Promise((e: any) => {
      setTimeout(() => {
        e();
      }, val);
    });
  },
  getWebErrMsg(e: any): string {
    if (e && e.data && e.data.errors) {
      return _.join(e.data.errors, ",");
    }
    if (_.isString(e)) {
      return e;
    }
    let st = _.get(e, "originalStatus");
    let data = _.get(e, "data");
    return `${st} -> ${data}`;
  },
  getErrAxiosMsg(e: any): string {
    if (_.isArray(e)) {
      return _.join(e, ",");
    }
    let errors = _.get(e.response?.data, "errors");
    let finMsg = !_.isNil(errors)
      ? _.join(errors, ",")
      : gutils.getErrMsg(e as Error);
    let r = `[${e.response?.status}] ${finMsg}`;
    return r;
  },
  getErrMsg(_e): string {
    let e = _e as Error;
    if (_.isNil(e)) {
      return Dot("YpsgR", "Unknown Error");
    }
    return e.message;
  },
  IsPortalMode(): boolean {
    return false;
  },
  SetDevMode: (val: boolean = true) =>
    localStorage.setItem(STR_DEV_MODE, val + ""),
  IsDevMode: (): boolean => localStorage.getItem(STR_DEV_MODE) == "true",
};

export default gutils;
