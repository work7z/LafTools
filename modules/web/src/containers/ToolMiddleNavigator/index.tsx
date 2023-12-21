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

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
  TreeNodeInfo,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import gutils from "../../utils/GlobalUtils";
import { ToolParamType } from "../../styles/var";
import { Dot } from "../../utils/TranslationUtils";

import AjaxUtils from "../../utils/AjaxUtils";
// import { ACTION_sendToolRequest } from "../../slice/toolSlice";
import exportUtils from "../../utils/ExportUtils";
import apiSlice, {
  ExtensionInfo,
  ListExtForTheCategoryRes,
} from "../../reducers/apiSlice";
import AuthHookUtils from "../../utils/AuthHookUtils";
import QueryUtils from "../../utils/QueryUtils";
import MottoLine from "../../components/MottoLine";
import { Tree } from "@blueprintjs/icons";
import GenTree from "../../components/GenTree";
import ToolSlice from "../../reducers/toolSlice";
import { logutils } from "../../utils/LogUtils";
import RouteUtils from "../../utils/RouteUtils";

import PageUtils from "../../utils/PageUtils";
import forgeSlice from "../../reducers/ForgeSlice";
import ExtHookUtils from "../../utils/ExtensionHookUtils";
import { PassToolViewerProp } from "../../types/WB_Types";

type PassProp = PassToolViewerProp;

export default (props: PassProp): any => {
  let dis = exportUtils.dispatch();
  let currentCategoryId = props?.findCurrentPureItem?.Id;
  const [updateMemStatus, onUpdateMemStatus] = useState(0);

  let extsListQuery = apiSlice.useGetToolCategoryExtsListQuery(
    { categoryId: currentCategoryId + "" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  let b = useParams();
  let toolParam = useParams() as ToolParamType;
  let { Tool_RemarkExtIds } = exportUtils.useSelector((v) => {
    return {
      Tool_RemarkExtIds: [], // v.forge.Tool_RemarkExtIds,
    };
  });
  let treeInfo = exportUtils.useSelector((x) => x.tool.subCategoryTreeInfo);

  let favoritesList: ExtensionInfo[] = useMemo(() => {
    let list = extsListQuery.data?.payload?.list;
    let existSet = new Set();
    // select items in each of list.ChildrenAsInfo by matching if their id is in Tool_RemarkExtIds
    let tmp: ExtensionInfo[] = [];
    if (!_.isNil(list)) {
      _.forEach(list, (x) => {
        return _.forEach(x.ChildrenAsInfo, (xx) => {
          let isThatFoundable = _.findIndex(Tool_RemarkExtIds, (xxx) => {
            return xxx === xx.Id;
          });
          if (isThatFoundable != -1) {
            if (existSet.has(xx.Id)) return;
            tmp.push(xx);
            existSet.add(xx.Id);
          }
        });
      });
    }
    return tmp;
  }, [
    updateMemStatus,
    extsListQuery.status,
    Tool_RemarkExtIds.join("-"),
    treeInfo.updateId,
    _.size(treeInfo.nodes),
  ]);

  gutils.ExposureIt("middle_toolParam", toolParam, true);
  gutils.ExposureIt("middle_toolParam_b", b, true);

  // check if toolParam.extId is empty, if yes, then jump to the link which is comprised of extsListQuery.data?.payload?.list if have
  let hist = RouteUtils.useHistory();
  let goWithChildId = (childId) => {
    if (!_.isNil(childId)) {
      hist.push(`${"nouse"}/${currentCategoryId}/${childId}`);
      dis(ToolSlice.actions.updateSubCategoryForSelected([childId]));
    }
  };
  useEffect(() => {
    if (gutils.empty(toolParam.extId)) {
      if (!_.isNil(extsListQuery.data?.payload?.list)) {
        let firstItem = _.first(extsListQuery.data?.payload?.list);
        // check if firstItem and its childrenAsInfo[0] exist, if yes, then read their Id
        if (!_.isNil(firstItem)) {
          let childId = _.first(firstItem.ChildrenAsInfo)?.Id;
          goWithChildId(childId);
        }
      }
    }
  }, [extsListQuery.status]);

  let fn_calculate_fav = (): TreeNodeInfo => {
    return {
      // add item for Remarks
      id: "Remarks",
      label: Dot("IfsGO", "Favourites"),
      icon: "star",
      hasCaret: true,
      childNodes: _.map(favoritesList, (x) => {
        return {
          id: x.Id,
          label: x.Label,
          icon: "application",
        } as TreeNodeInfo;
      }),
    };
  };

  useEffect(() => {
    dis(ToolSlice.actions.updateSubCategoryTreeRemarks(fn_calculate_fav()));
  }, [(favoritesList || []).join("-")]);

  useEffect(() => {
    dis(
      ToolSlice.actions.updateSubCategoryTreeInfo({
        updateId: new Date().getTime() + "",
        expanded: [
          _.first(
            _.map(
              _.filter(extsListQuery.data?.payload?.list, (x2) => {
                return (
                  _.findIndex(
                    x2.ChildrenAsInfo,
                    (ix2) => ix2.Id == toolParam.extId
                  ) != -1
                );
              }) || [],
              (x, d, n) => {
                return x.Id;
              }
            )
          ),
        ] as any,
        selected: !_.isNil(toolParam.extId)
          ? ([toolParam.extId] as string[])
          : [],
        nodes: [
          fn_calculate_fav(),
          ..._.map(extsListQuery.data?.payload?.list || [], (x, d, n) => {
            return {
              id: x.Id,
              hasCaret: true,
              icon: x.Icon || "application",
              label: x.Label,
              childNodes: _.map(x.ChildrenAsInfo, (child) => {
                return {
                  id: child.Id,
                  label: child.Label,
                  icon: "application",
                } as TreeNodeInfo;
              }),
            } as TreeNodeInfo;
          }),
        ],
      })
    );
  }, [extsListQuery.status]);

  let activeOne = props.findCurrentPureItem;

  let activeExt: TreeNodeInfo | null =
    useMemo<TreeNodeInfo | null>((): TreeNodeInfo | null => {
      let findObj: TreeNodeInfo | null = null;
      if (treeInfo == null) return null;
      if (treeInfo.nodes == null) return null;
      logutils.info(
        "check all nodes",
        treeInfo.nodes + ", findObj is",
        findObj
      );
      _.find(treeInfo.nodes, (x) => {
        logutils.info("check node", x);
        _.find(x.childNodes, (xx) => {
          if (xx.id == toolParam.extId) {
            findObj = xx;
          }
          return findObj != null;
        });
        return findObj != null;
      });
      return findObj;
    }, [
      treeInfo.updateId,
      toolParam.extId,
      toolParam.category,
      extsListQuery.status,
      _.size(treeInfo.nodes),
    ]);

  gutils.ExposureIt("activeExt", activeExt, true);

  PageUtils.useUpdateTitle(
    [activeExt?.label as string, activeOne?.LabelByInit]
      .filter((x) => !_.isNil(x))
      .join(" - "),
    [toolParam.category + "", toolParam.extId + ""]
  );

  let r = QueryUtils.validateResult(extsListQuery, {
    label: Dot("CWoqhy", "Exts List by selected CategoryID"),
  });
  if (!_.isNil(r)) {
    return r;
  }

  if (_.isNil(props.findCurrentPureItem)) {
    return (
      <NonIdealState
        icon="array-string"
        title={Dot("cuRCb", "Category not found.")}
      ></NonIdealState>
    );
  }
  return (
    <div className="w100 h100 flex-parent">
      <div className="flex-main-body">
        {_.isEmpty(extsListQuery.data?.payload?.list) ? (
          <NonIdealState
            icon="array"
            title={Dot(
              "qUabR",
              "There's no available tools for this category."
            )}
          ></NonIdealState>
        ) : (
          ""
        )}
      </div>
      <div className="btm-top">
        <MottoLine />
      </div>
    </div>
  );
};
