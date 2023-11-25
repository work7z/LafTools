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

import { useHistory, useLocation } from "react-router";
import PageUtils from "../../../utils/PageUtils";
import QueryUtils from "../../../utils/QueryUtils";
import qs from "querystring";
import _ from "lodash";
import { URL_WORKBENCH_WORKSPACE } from "../../../styles/path";

export let useSearchQuery = (): {
  fc: string;
  f?: string;
  e?: string;
  b?: string;
} => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let obj = {};
  query &&
    query.forEach((v, k) => {
      if (k && v) {
        obj[k] = v;
      }
    });
  return obj as any;
};

export let useMergeParameter = (): any => {
  let hist = useHistory();
  let searchQ = useSearchQuery();
  // convert searchQ to object
  // merge with obj
  return (obj) => {
    let mergeIt = _.merge(searchQ, obj);
    return qs.stringify(mergeIt);
  };
};

export let useMergeParamWithWorkSpace = (): any => {
  let mergeP = useMergeParameter();
  return (obj) => {
    return URL_WORKBENCH_WORKSPACE + "?" + mergeP(obj);
  };
};
