// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 30 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
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

import { FN_GetDispatch } from "../nocycle";
import apiSlice from "../slice/apiSlice";
import AjaxUtils from "./AjaxUtils";
import AlertUtils from "./AlertUtils";
import { Dot } from "./TranslationUtils";

export default {
  openDir: async function (dir: string) {
    AlertUtils.popMsg("success", {
      message: Dot(
        "dkarh",
        "Okie, toolbox opened the directory. If there's no window pop up, please check if your platform support this function, or the directory is in the server."
      ),
    });
    let r = await AjaxUtils.DoLocalRequestWithNoThrow({
      isPOST: true,
      url: "/os/openDir",
      data: {
        Dir: dir,
      },
    });
    if (r.error) {
      AlertUtils.popError(r.error);
    }
  },
};
