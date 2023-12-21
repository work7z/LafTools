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

import testSlice from "./testSlice";
import apiSlice from "./apiSlice";
import systemSlice from "./SystemSlice";
import forgeSlice from "./ForgeSlice";
import routeSlice from "./RouteSlice";
import statusSlice from "./StatusSlice";
import ToolSlice from "./toolSlice";
import UserSlice from "./userSlice";
import DialogSlice from "./DialogSlice";
import ExtSlice from "./ExtSlice";
import wsSlice from "./wsSlice";
import BigTextSlice from "./BigTextSlice";
import layoutSlice from "./LayoutSlice";
import WorkspaceSlice from "./workspaceSlice";
import PreWorkSpaceSlice from "./preWorkSpace";
import onlineAPISlice from "./onlineAPISlice";
import RuntimeStatusSlice from "./RuntimeStatusSlice";
import SessionSlice from "./sessionSlice";

export default {
  session: SessionSlice,
  online: onlineAPISlice,
  preWorkspace: PreWorkSpaceSlice,
  workspace: WorkspaceSlice,
  layout: layoutSlice,
  bigtext: BigTextSlice,
  ws: wsSlice,
  ext: ExtSlice,
  user: UserSlice,
  status: statusSlice,
  runtimeStatus: RuntimeStatusSlice,
  api: apiSlice,
  system: systemSlice,
  test: testSlice,
  forge: forgeSlice,
  route: routeSlice,
  // main parts
  tool: ToolSlice,
  dialog: DialogSlice,
};
