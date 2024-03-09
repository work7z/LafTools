// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 28 Sep 2023
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
import gutils from "./GlobalUtils";
import staticDevJson from "../static/dev.json";
import PageUtils from "./PageUtils";
import { P_ACTION_readForgeFromServerViaAPI } from "../reducers/forgeSlice";
import { P_ACTION_createSystemWS } from "../reducers/websocketSlice";

// binding updates from all pages
// defien a struct for required slice parts, read function, write function, onNewDataComing
// export type SyncWithRequiredPart = {
//   sliceName: string;
//   ignoreActions: string[];
//   onNewDataComing: (value: string) => void;
//   onChangeNeedToBeUpdated: () => void;
// };
// let allSyncParts: SyncWithRequiredPart[] = [
//   {
//     sliceName: "ext",
//     ignoreActions: ["updateExtStatusMapBySessionIdAndSyncId"],
//     onNewDataComing: (value: string) => {
//       // do nothing
//     },
//     onChangeNeedToBeUpdated: () => {
//       // do nothing
//     },
//   },
// ];

const InitUtils = {
  InitAllWithDOMAfterLoginIn: async (dispatch) => {
    P_ACTION_readForgeFromServerViaAPI();
    // P_ACTION_createSystemWS();
  },
};
export default InitUtils;
