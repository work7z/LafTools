// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 3 Dec 2023
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

import { useParams } from "react-router-dom";
import _ from "lodash";
import { EachWorkSpace } from "../pages/FixedWorkBench/definitions/WB_Types";
import apiSlice from "../slice/apiSlice";
import QueryUtils from "../utils/QueryUtils";
import { Dot } from "../utils/TranslationUtils";

export let useReadCurrentWorkspaceId = (): string => {
  const { workspaceId = "default" } = useParams() as any;
  return workspaceId;
};

export let useReadCurrentWorkspaceItem = (): EachWorkSpace | undefined => {
  let allWS = useWorkSpaceListGet();
  let id = useReadCurrentWorkspaceId();
  return _.find(allWS, (v) => v.Id == id);
};

export let useWorkSpaceListGet = (): EachWorkSpace[] => {
  let workspaceListRes = apiSlice.useGetWorkspaceListByUserIdQuery({});
  let r = QueryUtils.validateResult(workspaceListRes, {
    label: Dot("RjCO3", "Workspace List"),
  });
  let allWorkspaces: EachWorkSpace[] =
    workspaceListRes.data?.payload?.value?.WorkSpaces || [];
  return allWorkspaces;
};
