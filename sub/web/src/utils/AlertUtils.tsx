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

import { logutils } from "./LogUtils";

import _ from "lodash";
import { Dot } from "./TranslationUtils";
import { Position, Toaster, ToastProps, Intent } from "@blueprintjs/core";
import gutils from "./GlobalUtils";
import ALL_NOCYCLE, { FN_GetDispatch } from "../nocycle";
import systemSlice, { MessagePackItem } from "../slice/SystemSlice";
import statusSlice, {
  AlertType,
  ConfirmType,
  PrompType,
} from "../slice/StatusSlice";

let rootInst = Toaster.create({
  className: " m_all_recipe",
  position: Position.TOP,
});
const AlertUtils = {
  // copyWithAlertCopied
  copyWithAlertCopied(ctn: string) {
    gutils.copy(ctn);
    AlertUtils.popMsg(Intent.SUCCESS, {
      icon: "endorsed",
      message: Dot("1Tuab", "Copied"),
    });
  },
  // for addMsg, provide other functions with different default Intent value
  // and success, use the following functions
  addMsgSuccess(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.SUCCESS;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgDanger(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.DANGER;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgWarning(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.WARNING;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgPrimary(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.PRIMARY;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsgNone(obj: { msgId: string; msgItem: MessagePackItem }) {
    obj.msgItem.Intent = Intent.NONE;
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  addMsg(obj: { msgId: string; msgItem: MessagePackItem }) {
    ALL_NOCYCLE.store?.dispatch(systemSlice.actions.addNewMessageItem(obj));
  },
  popError(e: Error, additionalMsgLabel?: string) {
    let msg = _.isArray(e) ? _.join(e, "\n") : gutils.getErrMsg(e);
    AlertUtils.popMsg("danger", {
      message: additionalMsgLabel ? `[${additionalMsgLabel}]` : "" + msg,
    });
  },
  popCopyOK() {
    AlertUtils.popMsg("success", {
      icon: "duplicate",
      message: Dot("ip2g1", "Copied"),
    });
  },
  popRefresh() {
    AlertUtils.popMsg("success", {
      icon: "refresh",
      message: Dot("WXo6D", "Refreshed"),
    });
  },
  popCreated() {
    AlertUtils.popMsg("success", {
      icon: "add" as any,
      message: Dot("24vLI", "Created"),
    });
  },
  popMsg(intent: Intent, config: ToastProps) {
    config.intent = intent;
    rootInst.show(config);
  },
  win_alert(o: AlertType) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.updateAlertList(o));
  },
  win_prompt(o: PrompType) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.updatePromptList(o));
  },
  win_confirm(o: ConfirmType) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.updateConfirmList(o));
  },
  // add deleteById for separately alert, prompt, confirm
  // delete alertList
  deleteAlertList(id: string) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.deleteAlertList(id));
  },
  // delete promptList
  deletePromptList(id: string) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.deletePromptList(id));
  },
  // delete confirmList
  deleteConfirmList(id: string) {
    let dis = FN_GetDispatch();
    dis(statusSlice.actions.deleteConfirmList(id));
  },
};
_.set(window, "AlertUtils", AlertUtils);
export default AlertUtils;
