import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startListening } from "../listenerMiddleware";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ExtHookUtils, { ExtQuickAllType } from "../utils/ExtensionHookUtils";
import {
  ExtVMContext,
  PropExtSessionContext,
} from "../business/ExtensionSingleView";
import CacheUtils from "../utils/CacheUtils";
import AjaxUtils from "../utils/AjaxUtils";
import _ from "lodash";
import { Dot } from "../utils/TranslationUtils";
import gutils from "../utils/GlobalUtils";
import { FN_GetState } from "../nocycle";
import { PayloadValueData } from "../styles/var";
import FileUtils from "../utils/FileUtils";
import AlertUtils from "../utils/AlertUtils";

export default {
  //
};
