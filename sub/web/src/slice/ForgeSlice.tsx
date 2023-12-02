// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 30 Sep 2023
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

import {
  createSlice,
  ListenerEffectAPI,
  PayloadAction,
} from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import localforage from "localforage";
import gutils from "../utils/GlobalUtils";
import _ from "lodash";
import { logutils } from "../utils/LogUtils";
import systemSlice, { ACTION_getLangData } from "./SystemSlice";
import testSlice from "./testSlice";
import { RootState } from "../store";
import INNER_CYCLE from "../innercycle";
import { LANG_EN_US, LANG_ZH_CN, LANG_ZH_HK } from "../styles/var";
import { debug } from "console";
import TranslationUtils, { Dot } from "../utils/TranslationUtils";
import { VER_FORGE_FORM } from "../styles/config";
import AjaxUtils from "../utils/AjaxUtils";
import exportUtils from "../utils/ExportUtils";
import ALL_NOCYCLE from "../nocycle";
import AlertUtils from "../utils/AlertUtils";
import { RemarkUtils } from "../utils/RemarkUtils";
import QueryUtils from "../utils/QueryUtils";

// never DO deep LEVEL here
interface ForgeState {
  UsingSmartEditor: boolean;
  UpdatePageId: string;
  DarkThemeMode: boolean;
  Language: string;
  HasUserSelectedOption: boolean;
  VerForgeForm: string;
  Tool_RemarkExtIds: string[];
}

const KEY_PERSIST_INTO_LOCAL = "KEY_PERSIST_INTO_LOCAL";
let newInitialState = (): ForgeState => {
  return {
    UsingSmartEditor: false,
    UpdatePageId: gutils.uuid(),
    DarkThemeMode: false,
    Language: gutils.IsDevMode ? "zh_CN" : gutils.GetUserActualClientLang(),
    HasUserSelectedOption: false,
    VerForgeForm: VER_FORGE_FORM,
    Tool_RemarkExtIds: [],
    // Ext_
  };
};
let initialState: ForgeState = newInitialState();

let preLocalStr = localStorage.getItem(KEY_PERSIST_INTO_LOCAL);
if (!_.isEmpty(preLocalStr)) {
  let p = gutils.safeparse(preLocalStr);
  if (!_.isEmpty(p)) {
    initialState = p as ForgeState;
  }
}
_.defaultsDeep(initialState, newInitialState());

if (
  initialState.Language != null &&
  [LANG_EN_US, LANG_ZH_CN, LANG_ZH_HK].indexOf(initialState.Language) === -1
) {
  logutils.warn("missed language: " + initialState.Language);
  initialState.Language = LANG_EN_US;
}

if (initialState.VerForgeForm != VER_FORGE_FORM) {
  initialState.HasUserSelectedOption = false;
  initialState.VerForgeForm = VER_FORGE_FORM;
}

let syncWithTransationUtils = (state: ForgeState) => {
  TranslationUtils.CurrentLanguage = state.Language;
};

let onlySaveIntoForgeWithoutSet = (state: ForgeState) => {
  syncWithTransationUtils(state);
  localStorage.setItem(KEY_PERSIST_INTO_LOCAL, JSON.stringify(state));
};

let saveIntoForge = (state: ForgeState) => {
  onlySaveIntoForgeWithoutSet(state);
  P_ACTION_saveForgeToServerViaAPI(state);
};

const wrap = <T extends Array<any>, U>(fn: (...args: T) => U) => {
  return (...args: T): U => fn(...args);
};

function wrapFunction<TArgs extends any[], TReturn>(
  targetFunction: (...parameters: TArgs) => TReturn
): (...parameters: TArgs) => TReturn {
  return (...parameters: TArgs) => {
    console.log(`Hello, what is your name?`);
    return targetFunction(...parameters);
  };
}

const forgeSlice = createSlice({
  name: "forge",
  initialState,
  reducers: {
    updateStateComingFromServer(
      state,
      action: PayloadAction<{ serverForgeStr: string }>
    ) {
      try {
        let parse = JSON.parse(action.payload.serverForgeStr) as ForgeState;
        RemarkUtils.saveKeyInMem(RemarkUtils.KEY_MUTE_FORGE_SET_ONCE);
        // assign parse to each field of state if have
        _.forEach(parse, (x, d, n) => {
          if (!_.isNil(x)) {
            state[d] = x;
          }
        });
        onlySaveIntoForgeWithoutSet(state);
      } catch (e) {
        console.log(e);
        // do nothing for this
      }
    },
    updateHasUserSelectedOption: (
      state,
      action: PayloadAction<{ HasUserSelectedOption: boolean }>
    ) => {
      state.HasUserSelectedOption = action.payload.HasUserSelectedOption;
    },
    updateIfUsingSmartEditor(
      state,
      action: PayloadAction<{ isUsing: boolean }>
    ) {
      state.UsingSmartEditor = action.payload.isUsing;
    },
    updateDarkMode(state, action: PayloadAction<{ isDark: boolean }>) {
      state.DarkThemeMode = action.payload.isDark;
    },
    updateLanguage(state, action: PayloadAction<{ lang: string }>) {
      state.Language = action.payload.lang;
    },
    addExtensionIdIntoTool_RemarkExtIds(
      state,
      action: PayloadAction<{ extId: string }>
    ) {
      if (_.isNil(state.Tool_RemarkExtIds)) {
        state.Tool_RemarkExtIds = [];
      }
      // add extId in Tool_RemarkExtIds if not exist
      if (state.Tool_RemarkExtIds.indexOf(action.payload.extId) === -1) {
        state.Tool_RemarkExtIds = [
          ...state.Tool_RemarkExtIds,
          action.payload.extId,
        ];
      }
    },
    // remove extId in Tool_RemarkExtIds if exist
    removeExtensionIdFromTool_RemarkExtIds(
      state,
      action: PayloadAction<{ extId: string }>
    ) {
      if (_.isNil(state.Tool_RemarkExtIds)) {
        state.Tool_RemarkExtIds = [];
      }
      state.Tool_RemarkExtIds = [
        ..._.filter(state.Tool_RemarkExtIds, (v) => {
          return v !== action.payload.extId;
        }),
      ];
    },
  },
});

// save it
syncWithTransationUtils(initialState);

export const saveIntoForge2 = saveIntoForge;

INNER_CYCLE.CachedLanguage = initialState.Language;

export const ACTION_UPDATE_LANG_AND_APPLY_CHANGE = (language: string): any => {
  return async (dispatch) => {
    dispatch(forgeSlice.actions.updateLanguage({ lang: language }));
    await ACTION_getLangData()(dispatch);
  };
};

export const P_ACTION_readForgeFromServerViaAPI = async () => {
  // write code to read forgeState from API /user/local/forge/get
  // regardless of the forge is read or not
  let r = await AjaxUtils.DoLocalRequestWithNoThrow({
    url: "/user/local/key/get?key=forge",
    isPOST: false,
  });
  if (r.error) {
    logutils.error("reading forge from server failed", r.error);
    AlertUtils.addMsg({
      msgId: "nq06X",
      msgItem: {
        Intent: "warning",
        Title: Dot(
          "2RhAT",
          "It looks like forge retrieve process encounter some issue"
        ),
        Description: Dot(
          "J2xoL",
          "Please see the error: {0}",
          gutils.getErrMsg(r.error)
        ),
        HasReadThisMsg: false,
      },
    });
  } else {
    ALL_NOCYCLE.store?.dispatch(
      forgeSlice.actions.updateStateComingFromServer({
        serverForgeStr: QueryUtils.getDoAjaxValueRes(r)?.StateStr,
      })
    );
    RemarkUtils.saveKeyInLS(RemarkUtils.KEY_GET_FORGE_BEFORE);
  }
};

export const P_ACTION_saveForgeToServerViaAPI = async (forgeState) => {
  // write code to send forgeState to API /user/local/forge/set
  // regardless of the forge is saved or not
  if (!RemarkUtils.checkKeyExistsInLS(RemarkUtils.KEY_GET_FORGE_BEFORE)) {
    console.log("quit due to set LS");
    return;
  }
  // if (RemarkUtils.readAndDelInMem(RemarkUtils.KEY_MUTE_FORGE_SET_ONCE)) {
  //   console.log("quit due to set once");
  //   return;
  // }
  let r = await AjaxUtils.DoLocalRequestWithNoThrow({
    url: "/user/local/key/set?key=forge",
    isPOST: true,
    data: {
      StateStr: JSON.stringify(forgeState),
    },
  });
  if (r.error) {
    logutils.error("saving forge to server failed", r.error);
    AlertUtils.addMsg({
      msgId: "N1foK",
      msgItem: {
        Intent: "warning",
        Title: Dot(
          "2IF6A",
          "It looks like forge save storage encounter some issue"
        ),
        Description: Dot(
          "ZXRGC",
          "Please see the error: {0}",
          gutils.getErrMsg(r.error)
        ),
        HasReadThisMsg: false,
      },
    });
  }
};

export default forgeSlice;
