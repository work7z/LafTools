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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import { URL_PREFIX_LOCAL } from "../styles/config";
import { PayloadListData, PayloadValueData } from "../styles/var";
import gutils from "../utils/GlobalUtils";
import { UserConfig } from "./userSlice";
import { url } from "inspector";
import { param } from "jquery";
import {
  EachWorkSpace,
  FnPureToolDefinition,
  WorkSpaceStruct,
} from "../types/WB_Types";
import { EachLang } from "../types/all-types";

let createNotProhibitedResources = (build, resName) => {
  return build.query({
    query: () => `/res/public/${resName}`,
  });
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: URL_PREFIX_LOCAL,
    prepareHeaders(headers, api) {
      let headers_New = AjaxUtils.getHeaders();
      _.forEach(headers_New, (x, d, n) => {
        if (!_.isNil(x)) {
          headers.set(d, x);
        }
      });
      return headers;
    },
    validateStatus: (response, result) => {
      gutils.ExposureIt("response_res", { response, result }, true);
      let errors = _.get(result, "errors");
      if (!_.isEmpty(errors)) {
        return false;
      }
      return response.status === 200 && !result.isError;
    },
  }),
  endpoints: (build) => ({
    // workspace
    getWorkspaceOneByIdAndUserId: build.query<
      PayloadValueData<EachWorkSpace>,
      { Id: string }
    >({
      query: (obj) => {
        return {
          url: "/workspace/users/one",
          params: obj,
        };
      },
    }),
    getWorkspaceListByUserId: build.query<
      PayloadValueData<WorkSpaceStruct>,
      any
    >({
      query: () => "/workspace/users/list",
    }),
    addWorkspaceForEachUser: build.mutation<
      PayloadValueData<any>,
      EachWorkSpace
    >({
      query: (arg) => {
        return {
          method: "POST",
          url: "/workspace/users/add",
          body: arg,
        };
      },
    }),
    deleteTheWorkspaceForEachUser: build.mutation<
      PayloadValueData<any>,
      EachWorkSpace
    >({
      query: (arg) => {
        return {
          method: "POST",
          url: "/workspace/users/delete",
          body: arg,
        };
      },
    }),
    // openDirOnLocal: build.mutation<PayloadValueData<any>, { dir: string }>({
    //   query: (arg) => {
    //     return {
    //       method: "POST",
    //       url: "/os/opendir",
    //       body: arg,
    //     };
    //   },
    // }),

    // static
    getToolCategory: build.query<PayloadListData<FnPureToolDefinition>, any>({
      query: () => "/tool/exts/listCategory",
    }),
    // apis
    getPing1: build.query({
      query: () => "/ping",
    }),
    getPing2: build.query({
      query: () => "/ping2",
    }),
    // visit
    getGuiSystemInfo: build.query<
      PayloadValueData<{
        UserConfigFile: string;
        UserConfigDir: string;
        UserPWDir: string;
      }>,
      any
    >({
      query: () => "/system/init/info",
    }),
    geti18nConfig: build.query<PayloadValueData<EachLang[]>, any>({
      query: () => "/i18n/get",
    }),
    // visit
    getVisitAdminInitInfo: build.query<
      PayloadValueData<{ HasAdminInit: boolean; LastUpdatedTime: string }>,
      any
    >({
      query: () => "/admin/init/info",
    }),
    postLocalPwCalc: build.mutation<
      PayloadValueData<{ CalcPW: string }>,
      { pw: string }
    >({
      query: (arg) => {
        gutils.ExposureIt("MFmSE", arg, true);
        let formData = arg;
        return {
          method: "POST",
          url: "/user/local/pw/calc",
          body: formData,
        };
      },
    }),
    // system
    systemStats: build.query({
      query: () => "/system/stats",
    }),
    getOneMotto: build.query<PayloadValueData<string>, any>({
      query: () => "/system/getOneMotto",
    }),
    getUserObjByToken: build.query<
      PayloadValueData<{ Found: boolean; Obj: UserConfig }>,
      { userToken: string; refreshTokenStatus: number }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/user/one/getByToken",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    listUserNames: build.query<PayloadValueData<{ Usernames: string[] }>, {}>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/user/all/getUserNameList",
          params: obj,
        };
      },
      extraOptions: {},
    }),

    // send GET request /tool/exts/getExtDetail with parameter extId, and get the extension detail, the response is ExtensionVM
    getToolExtDetail: build.query<
      PayloadValueData<ExtensionVM>,
      { extId: string; val_extensionIdRefreshMap_id: number }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/tool/exts/getExtDetail",
          params: obj,
        };
      },
    }),
    // send GET request /tool/category/exts/list with parameter categoryId
    getToolCategoryExtsList: build.query<
      PayloadListData<ListExtForTheCategoryRes>,
      { categoryId: string }
    >({
      query: (obj) => {
        return {
          method: "GET",
          url: "/tool/exts/listSubCategory",
          params: obj,
        };
      },
    }),
  }),
});

export interface ValueReq {
  InputText: string;
  InputFile: string;
  ExtraConfigMap?: Record<string, any>;
  ReturnAsFile?: boolean; // by default false
}

export interface ValueRes {
  Err?: Error;
  OutputText: string;
  OutputFile: string;
}

export interface ValueHandler {
  ConvertText: (req: ValueReq) => ValueRes;
  ConvertFile: (req: ValueReq) => ValueRes;
}

export type ExtensionFuncMap = Record<string, ValueHandler>;

type FormModel = Record<string, any>;

export interface ExtensionAction {
  Id: string;
  Label: string;
  CallFuncList: string[];
}

export interface ExtensionVM {
  Layout: string;
  InitialFormModel?: FormModel;
  Info?: ExtensionInfo;
  Actions?: ExtensionAction[];
  FuncMap?: ExtensionFuncMap;
}

export default apiSlice;
export type ExtensionInfo = {
  Id: string;
  Label: string;
  Description: string;
};
export type ListExtForTheCategoryRes = {
  CategoryId: string;
  Id: string;
  Label: string;
  Icon: string;
  ChildrenAsInfo: ExtensionInfo[];
};
