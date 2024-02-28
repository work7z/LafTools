// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 8 Oct 2023
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
import UserSlice from "../reducers/userSlice";
import ALL_NOCYCLE from "../nocycle";
const SYSTEM_INIT_TOKEN_LOCAL_KEY = "LOCAL_KEY_SYSTEM_INIT";
const USER_TOKEN_LOCAL_KEY = "LOCAL_KEY_USER_TOKEN";
const USER_TOKEN_LOCAL_ID = "LOCAL_KEY_USER_ID";

const TokenUtils = {
  cleanAndSignOut() {
    localStorage.clear()
    location.reload() // TODO: other way is to use history.push('/login')
  },
  // system
  getSystemInitToken() {
    return localStorage.getItem(SYSTEM_INIT_TOKEN_LOCAL_KEY);
  },
  clearSystemToken() {
    localStorage.removeItem(SYSTEM_INIT_TOKEN_LOCAL_KEY);
  },
  setSystemInitToken(str: string) {
    localStorage.setItem(SYSTEM_INIT_TOKEN_LOCAL_KEY, str);
  },
  // local
  getLocalUserToken() {
    return localStorage.getItem(USER_TOKEN_LOCAL_KEY);
  },
  clearLocalUserToken() {
    localStorage.removeItem(USER_TOKEN_LOCAL_KEY);
  },
  setLocalUserToken(str: string) {
    localStorage.setItem(USER_TOKEN_LOCAL_KEY, str);
    setTimeout(() => {
      ALL_NOCYCLE.store?.dispatch(UserSlice.actions.updateTokenStatus());
    });
  },
  // write similar as above for local user id
  // write for USER_TOKEN_LOCAL_ID
  getLocalUserId() {
    return localStorage.getItem(USER_TOKEN_LOCAL_ID);
  },
  clearLocalUserId() {
    localStorage.removeItem(USER_TOKEN_LOCAL_ID);
  },
  setLocalUserId(str: string) {
    localStorage.setItem(USER_TOKEN_LOCAL_ID, str);
  },
  // getLocalUserId(): string | undefined {
  //   let st = ALL_NOCYCLE.store?.getState();
  //   return st?.user?.currentUser?.Id;
  // },
  // getLocalUserName(): string | undefined {
  //   let st = ALL_NOCYCLE.store?.getState();
  //   return st?.user?.currentUser?.Username;
  // },
};

// verify if its token mode
setTimeout(() => {
  let b = window.location.href.match(/t=([A-Za-z0-9]+)/);
  if (!_.isNil(b) && b[1]) {
    let systemToken = _.trim(b[1]);
    let hasEntry = window.location.href.indexOf("/app/entry") != -1;
    if (hasEntry && systemToken) {
      TokenUtils.setSystemInitToken(systemToken);
    }
  }
});
_.set(window, "TokenUtils", TokenUtils);
export default TokenUtils;
