// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AjaxUtils from "../utils/AjaxUtils";
import {
  AdminUserPassProp as LocalAdminUserPassProp,
  UserPassProp as LocalUserPassProp,
  UserPassCreateProp,
} from "../containers/UserAskMultipleDialogs";
import gutils from "../utils/GlobalUtils";
import { PayloadValueData } from "../styles/var";
import { Dot } from "../utils/TranslationUtils";
import TokenUtils from "../utils/TokenUtils";

export interface UserConfig {
  Id: string;
  Username: string;
  Password: string;
  Token: string;
  CreateTime: number;
  IsAdmin: boolean;
  NewUserToken: string;
}

interface UserState {
  currentUser: UserConfig | null;
  refreshTokenStatus: number;
}

const initialState: UserState = {
  currentUser: null,
  refreshTokenStatus: 0,
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateTokenStatus(state, action: PayloadAction) {
      state.refreshTokenStatus++;
    },
    updateUserObject(state, action: PayloadAction<{ userConfig: UserConfig }>) {
      state.currentUser = action.payload.userConfig;
      TokenUtils.setLocalUserId(state.currentUser.Id);
    },
  },
});

export const ACTION_signInLocalAccount = ({
  localAccountObject,
}: {
  localAccountObject: LocalUserPassProp;
}) => {
  return async (dispatch) => {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: "/user/local/verify",
      isPOST: true,
      data: localAccountObject,
    });
    if (r.error) {
      throw new Error(gutils.getErrAxiosMsg(r.error));
    } else {
      let data = r.response?.data as PayloadValueData<{ token: string }>;
      let token = data?.payload?.value?.token;
      if (gutils.empty(token)) {
        throw new Error(Dot("3umnB", "Unknown token"));
      } else {
        TokenUtils.setLocalUserToken(token);
      }
    }
  };
};

export const ACTION_createAdminAccount = ({
  localAccountObject,
}: {
  localAccountObject: LocalAdminUserPassProp;
}) => {
  return async (dispatch) => {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: "/admin/init/create",
      isPOST: true,
      data: localAccountObject,
    });
    if (r.error) {
      throw new Error(gutils.getErrAxiosMsg(r.error));
    } else {
      // r.response;
    }
  };
};

export const ACTION_createLocalAccount = ({
  localAccountObject,
}: {
  localAccountObject: UserPassCreateProp;
}) => {
  return async (dispatch) => {
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      url: "/user/local/new",
      isPOST: true,
      data: localAccountObject,
    });
    if (r.error) {
      throw new Error(gutils.getErrAxiosMsg(r.error));
    } else {
      // r.response;
    }
  };
};

export default UserSlice;
