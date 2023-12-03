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
