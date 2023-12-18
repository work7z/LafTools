// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 25 Sep 2023
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

import localforage from "localforage";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import TranslationUtils, {
  Dot,
  KEY_LANG_PACK_ZH_CN,
  KEY_LANG_PACK_ZH_HK,
  LANG_INIT_BEFORE_MAP,
  newLangMap,
} from "../utils/TranslationUtils";
import {
  IsLoadingType,
  IsOKType,
  LANG_EN_US,
  LANG_ZH_CN,
  LANG_ZH_HK,
  LangDefinition,
  PromiseAction,
  SendErrorAction,
  TextValueAction,
} from "../styles/var";
import gutils from "../utils/GlobalUtils";
import AjaxUtils from "../utils/AjaxUtils";
// import { store } from "../store";
import forgeSlice from "./ForgeSlice";
import AlertUtils from "../utils/AlertUtils";
import { logutils } from "../utils/LogUtils";
import ALL_NOCYCLE, { IsDevMode } from "../nocycle";
import _ from "lodash";
import ConcurrencyUtils from "../utils/ConcurrencyUtils";
import { KEY_CONCURRENCY_SYSTEM_INIT } from "../styles/concurrency";
import { Intent } from "@blueprintjs/core";
import SyncStateUtils from "../utils/SyncStateUtils";

export type MessagePackItem = {
  Title: string;
  Description: string;
  CreateTime?: number;
  Id?: string;
  HasReadThisMsg?: boolean;
  Intent?: Intent;
};

interface InitStatus {
  HasError?: boolean;
  ProgressText: string;
  ProgressError?: string;
  IsLangPacksOK?: boolean;
  IsSystemPrefOK?: boolean;
  IsSystemUpdatesOK?: boolean;
}

export type PageDataInitedMap = {
  [key: string]: () => Promise<any>;
};

interface SystemState {
  LoadingForPageData?: boolean;
  PageDataInitedMap: PageDataInitedMap;
  HasInitSystemEnv: boolean;
  RefreshID: number;
  SysInitStatus: InitStatus;
  LangIncrement: string;
  MessageObjectKVMap: {};
  ClientWidth: number;
  ClientHeight: number;
  IsWorkBenchPageAvailable: boolean;
}

let newSysInitStatus = (): InitStatus => {
  return {
    ProgressText: Dot("Ewvgo", "Not yet started."),
  };
};

let LangRefreshCount = 0;

const initialState: SystemState = {
  RefreshID: 0,
  PageDataInitedMap: {},
  LoadingForPageData: false,
  HasInitSystemEnv: false,
  SysInitStatus: newSysInitStatus(),
  LangIncrement: "d",
  MessageObjectKVMap: {},
  ClientWidth: window["innerWidth"],
  ClientHeight: window["innerHeight"],
  IsWorkBenchPageAvailable: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    // update IsWorkBenchPageAvailable
    updateIsWorkBenchPageAvailable: (state, action: PayloadAction<boolean>) => {
      state.IsWorkBenchPageAvailable = action.payload;
    },
    updateClientWidthHeight: (
      state,
      action: PayloadAction<{
        ClientWidth?: number;
        ClientHeight?: number;
      }>
    ) => {
      if (!_.isNil(action.payload.ClientWidth)) {
        state.ClientWidth = action.payload.ClientWidth;
      }
      if (!_.isNil(action.payload.ClientHeight)) {
        state.ClientHeight = action.payload.ClientHeight;
      }
    },
    addNewMessageItem: (
      state,
      action: PayloadAction<{ msgId: string; msgItem: MessagePackItem }>
    ) => {
      action.payload.msgItem.Id = action.payload.msgId;
      action.payload.msgItem.CreateTime = new Date().getTime();
      state.MessageObjectKVMap[action.payload.msgId] = action.payload.msgItem;
    },
    updateRefreshID: (state, action) => {
      state.RefreshID++;
    },
    putRefreshDataInitFn: (state, action: PromiseAction) => {
      state.PageDataInitedMap[action.payload.id] = action.payload.fn;
    },
    resetToInitStatus: (state, action: PayloadAction) => {
      state.SysInitStatus = newSysInitStatus();
    },
    markAllAsCompleted: (state, action) => {
      state.HasInitSystemEnv = true;
    },
    markIfRefreshing: (state, action: IsLoadingType) => {
      state.LoadingForPageData = action.payload.isLoading;
    },
    markLangStatus: (state, action: IsOKType) => {
      state.SysInitStatus.IsLangPacksOK = action.payload.isOK;
    },
    markSystemPrefStatus: (state, action: IsOKType) => {
      state.SysInitStatus.IsSystemPrefOK = action.payload.isOK;
    },
    markSystemUpdateStatus: (state, action: IsOKType) => {
      state.SysInitStatus.IsSystemUpdatesOK = action.payload.isOK;
    },
    UpdateError: (state, action: SendErrorAction) => {
      state.SysInitStatus.HasError = true;
      state.SysInitStatus.ProgressError = gutils.getErrMsg(action.payload.e);
    },
    UpdateProcessText: (state, action: TextValueAction) => {
      state.SysInitStatus.ProgressText = action.payload.value;
    },
    updateLanguageValue: (
      state,
      action: PayloadAction<{ lang: string; value: LangDefinition }>
    ) => {
      let b = newLangMap();
      let nextValue = action.payload.value;
      let prevValue = b[action.payload.lang];
      b[action.payload.lang] = nextValue;
      TranslationUtils.LangMap = b;
      if (IsDevMode() && !_.isEqual(prevValue, nextValue)) {
        // LangRefreshCount++;
      }
      state.LangIncrement = `${action.payload.lang}${_.size(
        _.keys(nextValue)
      )}${LangRefreshCount}`;
      if (action.payload.lang == "zh_CN") {
        localStorage.setItem(KEY_LANG_PACK_ZH_CN, JSON.stringify(nextValue));
      } else if (action.payload.lang == "zh_HK") {
        localStorage.setItem(KEY_LANG_PACK_ZH_HK, JSON.stringify(nextValue));
      }
      LANG_INIT_BEFORE_MAP[action.payload.lang] = true;
    },
  },
});
export const ACTION_callRefreshAll = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(systemSlice.actions.markIfRefreshing({ isLoading: true }));
    try {
      dispatch(systemSlice.actions.updateRefreshID({}));
      for (let each of _.values(
        ALL_NOCYCLE.store?.getState().system.PageDataInitedMap
      )) {
        await each();
      }
      AlertUtils.popMsg("success", {
        message: Dot("gnKMZ", "Refreshed."),
      });
    } catch (e) {
      AlertUtils.popError(e as Error, Dot("cj1pd", "Refresh Operation"));
    } finally {
      dispatch(systemSlice.actions.markIfRefreshing({ isLoading: false }));
    }
  };
};

export const ACTION_getExample = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    //
  };
};
let __load_language_map: { [key: string]: boolean } = {};
export const ACTION_getLangData = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    let currentLanguage = ALL_NOCYCLE.store?.getState().forge.Language;
    // TODO: more languages support
    if (
      false
      // currentLanguage != LANG_ZH_CN &&
      // currentLanguage != LANG_ZH_HK &&
      // currentLanguage != LANG_EN_US
    ) {
      AlertUtils.popMsg("danger", {
        message: Dot(
          "YNwKz",
          "Unsupported language: {0}, will use English by default.",
          currentLanguage
        ),
      });
      currentLanguage = LANG_EN_US;
      dispatch(forgeSlice.actions.updateLanguage({ lang: currentLanguage }));
    }
    if (currentLanguage != LANG_EN_US) {
      if (!_.isEmpty(LANG_INIT_BEFORE_MAP[currentLanguage]) && !IsDevMode()) {
        // do nothing
      } else {
        let e = await AjaxUtils.DoStaticRequest({
          // url: "/lang/" + currentLanguage + ".json?t=" + Date.now(),
          url: "/lang/" + currentLanguage + ".json?t=" + Date.now(),
        });
        logutils.debug("e.data", e.data);
        dispatch(
          systemSlice.actions.updateLanguageValue({
            lang: currentLanguage,
            value: e.data,
          })
        );
      }
    }
    dispatch(systemSlice.actions.markLangStatus({ isOK: true }));
    __load_language_map[currentLanguage] = true;
  };
};
export const ACTION_getSystemPreferences = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(systemSlice.actions.markSystemPrefStatus({ isOK: true }));
  };
};
export const ACTION_getLatestSystemResources = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(systemSlice.actions.markSystemUpdateStatus({ isOK: true }));
  };
};
export const ACTION_callInitAllDataAtOnceFromInitSystemEnv = (): any => {
  return ACTION_initAllDataAtOnce();
};
export const ACTION_initAllDataAtOnce = (): any => {
  return async (dispatch: Dispatch<AnyAction>) => {
    if (ALL_NOCYCLE.store?.getState().system.HasInitSystemEnv) {
      logutils.debug("HasInitSystemEnv already there");
      return;
    }

    try {
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("DTTPW", "Reset status"),
        })
      );
      dispatch(systemSlice.actions.resetToInitStatus());
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("PUxuU", "Retrieving data for language packs..."),
        })
      );
      await ACTION_getLangData()(dispatch);
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("4cGA_", "Retrieving data for system preferences..."),
        })
      );
      await ACTION_getSystemPreferences()(dispatch);
      await SyncStateUtils.retrieveAllIDsFromServer((item) => {
        return item.RunOnInit === true;
      });
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("_trqL", "Retrieving data for system resources..."),
        })
      );
      await ACTION_getLatestSystemResources()(dispatch);
      dispatch(
        systemSlice.actions.UpdateProcessText({
          value: Dot("HIc3c", "Completed"),
        })
      );
      dispatch(systemSlice.actions.markAllAsCompleted({}));
    } catch (e: any) {
      ConcurrencyUtils.removeInitStatus(KEY_CONCURRENCY_SYSTEM_INIT);
      logutils.debug("err", e);
      dispatch(systemSlice.actions.UpdateError({ e: e }));
    }
  };
};

export default systemSlice;
