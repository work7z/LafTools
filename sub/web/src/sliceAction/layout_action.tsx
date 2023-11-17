// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 15 Nov 2023
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
import ExtHookUtils, { ExtQuickAllType } from "../utils/ExtensionHookUtils";
import {
  ExtVMContext,
  PropExtSessionContext,
} from "../biz/ExtensionSingleView";
import CacheUtils from "../utils/CacheUtils";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import { Dot } from "../utils/TranslationUtils";
import gutils from "../utils/GlobalUtils";
import { FN_GetState } from "../nocycle";
import { PayloadValueData } from "../styles/var";
import FileUtils from "../utils/FileUtils";
import AlertUtils from "../utils/AlertUtils";
import layoutSlice from "../slice/LayoutSlice";
import { REF_mainstage } from "../pages/FixedWorkBench/layout_ltr/MainStageCenter";

type MenuOpenCloseOper = {
  menuRecordKey: string;
  menuKey: string;
};

export function FN_ACTION_OpenMenu_ttm(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage = REF_mainstage.inst_ttm;
    let prevSize = FN_GetState().layout.menuRecord[arg.menuRecordKey + "_old"];
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: false,
      })
    );
    if (prevSize) {
      setTimeout(() => {
        mainStage?.resize(prevSize as any);
      }, 0);
    }
  };
}

export function FN_ACTION_OpenMenu_ltr(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage_ltr = REF_mainstage.inst_ltr;
    let prevSize = FN_GetState().layout.menuRecord[arg.menuRecordKey + "_old"];
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: false,
      })
    );
    if (prevSize) {
      setTimeout(() => {
        mainStage_ltr?.resize(prevSize as any);
      }, 0);
    }
  };
}

export function FN_ACTION_CloseMenu_ttm(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage_ltr = REF_mainstage.inst_ttm;
    let crtSize = FN_GetState().layout.menuRecord[arg.menuRecordKey];
    let newSize: number[] | null = null;
    if (!_.isEmpty(crtSize)) {
      if (arg.menuKey == "bottom") {
        newSize = [crtSize[0] + crtSize[1], 0];
      }
    }
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: true,
      })
    );
    if (newSize != null) {
      setTimeout(() => {
        newSize && mainStage_ltr?.resize(newSize as any);
      }, 0);
    }
    dis(
      layoutSlice.actions.updateMenuRecord({
        menu: arg.menuRecordKey + "_old",
        record: crtSize,
      })
    );
  };
}

export function FN_ACTION_CloseMenu_ltr(arg: MenuOpenCloseOper): any {
  return async (dis) => {
    let mainStage_ltr = REF_mainstage.inst_ltr;
    let crtSize = FN_GetState().layout.menuRecord[arg.menuRecordKey];
    let newSize: number[] | null = null;
    if (!_.isEmpty(crtSize)) {
      if (arg.menuKey == "left") {
        newSize = [0, crtSize[0] + crtSize[1], crtSize[2]];
      } else if (arg.menuKey == "right") {
        newSize = [crtSize[0], crtSize[1] + crtSize[2], 0];
      }
    }
    dis(
      layoutSlice.actions.updateMenuHide({
        menu: arg.menuKey,
        hide: true,
      })
    );
    if (newSize != null) {
      setTimeout(() => {
        newSize && mainStage_ltr?.resize(newSize as any);
      }, 0);
    }
    dis(
      layoutSlice.actions.updateMenuRecord({
        menu: arg.menuRecordKey + "_old",
        record: crtSize,
      })
    );
  };
}
