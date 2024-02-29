// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 11 Oct 2023
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

import { logutils } from "./LogUtils";
import _ from "lodash";
import TranslationUtils, { Dot } from "./cTranslationUtils";
import QS from "querystring";
import axios, { AxiosError, AxiosResponse } from "axios";
import gutils from "./GlobalUtils";
import { URL_PREFIX_LOCAL, URL_PREFIX_STATIC, URL_WORKBENCH } from "../types/constants";
import devJson from "../static/dev.json";
import { AnyMapType } from "../types/constants";
import TokenUtils from "./TokenUtils";
import exportUtils from "./ExportUtils";
import UserSlice, { UserConfig } from "../reducers/userSlice";
import apiSlice from "../reducers/apiSlice";
import * as vars from "../types/constants";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export type AuthStatus = {
  isFetching: boolean;
  HasLogin: boolean;
  currentUser: UserConfig | undefined;
};

const AuthHookUtils = {
  vars,
  useQueryAuthStatus(): AuthStatus {
    let currentUserObj = exportUtils.useSelector((val) => {
      return {
        userConfig: val.user.currentUser,
        refreshTokenStatus: val.user.refreshTokenStatus,
      };
    });
    let userToken = TokenUtils.getLocalUserToken();
    const userObj = apiSlice.useGetUserObjByTokenQuery(
      {
        userToken: userToken || "",
        refreshTokenStatus: currentUserObj.refreshTokenStatus,
        ...exportUtils.refresh_v1()
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
    const dis = exportUtils.dispatch();
    // let hist = useHistory()
    // useEffect(() => {
    // }, [userObj]);

    if (gutils.empty(userToken)) {
      return {
        isFetching: false,
        HasLogin: false,
        currentUser: undefined,
      };
    }
    if (_.isNil(currentUserObj)) {
      return {
        isFetching: true,
        HasLogin: false,
        currentUser: undefined,
      };
    }
    return {
      isFetching: userObj.isFetching,
      HasLogin: userObj.isSuccess ? userObj.data.payload.value.Found : false,
      currentUser: userObj?.data?.payload.value.Obj,
    };
  },
};

export default AuthHookUtils;
