// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 3 Oct 2023
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
import { useHistory, useParams } from "react-router";
import URLUtils from "./URLUtils";

const RouteUtils = {
  getCompleteURL(str: string) {
    return URLUtils.GetRoutePath(str);
  },
  hist_ref: null,
  useHistory: useHistory,
  usePathVariablesList: () => {
    let hist = RouteUtils.useHistory();
    RouteUtils.hist_ref = hist as any;
    return hist.location;
  },
  getHistoryByHistRefDirect(): ReturnType<typeof useHistory> {
    return RouteUtils.hist_ref as unknown as ReturnType<typeof useHistory>;
  },
};

export default RouteUtils;
