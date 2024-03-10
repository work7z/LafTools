// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
// LafTools Team <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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

import exportUtils from "./utils/ExportUtils";
import _ from "lodash";

let InitRouteHistory = _.once((hist) => {
  _.set(window, "hist", hist);
  const dispatch = exportUtils.dispatch();
  hist.listen((val) => {
    // logutils.log("route changed", val);
    // let mapList: { pathname: string; id: string }[] = [
    //   {
    //     pathname: URL_WORKBENCH_TOOLS,
    //     id: ID_TOOLS,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_FILES,
    //     id: ID_FILES,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_MANUALS,
    //     id: ID_HISTORY,
    //   },
    //   {
    //     pathname: URL_WORKBENCH_NOTES,
    //     id: ID_NOTES,
    //   },
    // ];
    // _.forEach(mapList, (x) => {
    //   if (val.pathname.startsWith(x.pathname)) {
    //     RouteMem[x.id] = val.pathname;
    //   }
    // });
  });
});

export default InitRouteHistory;
