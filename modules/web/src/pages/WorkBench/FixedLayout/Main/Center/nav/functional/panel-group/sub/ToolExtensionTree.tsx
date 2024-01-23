// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 16 Nov 2023
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
  Popover,
  Menu,
  MenuDivider,
  TreeNodeInfo,
} from "@blueprintjs/core";
import {
  ColumnHeaderCell,
  Cell,
  Column,
  Table,
  Regions,
} from "@blueprintjs/table";
import { APPINFOJSON, delayFN } from "../../../../../../../../../nocycle";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import { logutils } from "../../../../../../../../../utils/LogUtils";

import statusSlice from "../../../../../../../../../reducers/statusSlice";
import { useState, useContext, useCallback, useRef } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import PageUtils from "../../../../../../../../../utils/PageUtils";
import TranslationUtils, {
  Dot,
} from "../../../../../../../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import _ from "lodash";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../../../../../../../reducers/forgeSlice";
import { ACTION_callRefreshAll } from "../../../../../../../../../reducers/systemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
} from "../../../../../../../../../types/constants";
import { type } from "jquery";
import apiSlice from "../../../../../../../../../reducers/apiSlice";
import {
  ExtensionInfoFormatted as ExtensionInfo
} from "../../../../../../../../../types/purejs-types-READ_ONLY";
import QueryUtils, {
  getAjaxValueRes as getAjaxValueRes,
} from "../../../../../../../../../utils/QueryUtils";
import {
  useMergeParamWithWorkSpace,
  useSearchQuery,
} from "../../../../../../../../../types/workbench-hook";
import RouteUtils from "../../../../../../../../../utils/RouteUtils";
import ToolSlice from "../../../../../../../../../reducers/toolSlice";
import MottoLine from "../../../../../../../../../components/MottoLine";
import GenTree from "../../../../../../../../../components/GenTree";
import { FnPureToolDefinition } from "../../../../../../../../../types/workbench-types";
import WorkspaceSlice from "../../../../../../../../../reducers/workspaceSlice";
import { useExtsList } from "../../../../sub/center-view/Transformer/hooks";

export default (props: {
  activeOne: FnPureToolDefinition | undefined;
}): any => {
  let sq = useSearchQuery();
  const [updateMemStatus, onUpdateMemStatus] = useState(0);
  let fc = sq.fc || "all";
  // let extsListQuery = apiSlice.useGetToolCategoryExtsListQuery(
  //   { categoryId: fc },
  //   {
  //     refetchOnMountOrArgChange: false,
  //   }
  // );
  let dis = exportUtils.dispatch();
  let toolParam = {
    category: fc,
    extId: "", // TODO: patch extId
  };
  let treeInfo = exportUtils.useSelector((x) => x.tool.subCategoryTreeInfo);
  let hist = RouteUtils.useHistory();
  let extsList = useExtsList(fc)
  let goWithChildId = (childId) => {
    // if (!_.isNil(childId)) {
    //   hist.push(`${URL_WORKBENCH_TOOLS}/${currentCategoryId}/${childId}`);
    //   dis(ToolSlice.actions.updateSubCategoryForSelected([childId]));
    // }
  };
  useEffect(() => {
    // if (gutils.empty(toolParam.extId)) {
    //   if (!_.isEmpty(extsList)) {
    //     let firstItem = _.first(extsList);
    //     // check if firstItem and its childrenAsInfo[0] exist, if yes, then read their Id
    //     if (!_.isNil(firstItem)) {
    //       let childId = _.first(firstItem.ChildrenAsInfo)?.Id;
    //       goWithChildId(childId);
    //     }
    //   }
    // }
  }, [fc]);

  let workspaceDataForTree = exportUtils.useSelector((v) => {
    return {
      expanded: v.workspace.tools.expanded,
      selected: v.workspace.tools.selected,
      favourites: v.workspace.tools.favourites,
    };
  });
  let list = extsList;

  let favoritesList: ExtensionInfo[] = useMemo(() => {
    let existSet = new Set();
    // select items in each of list.ChildrenAsInfo by matching if their id is in Tool_RemarkExtIds
    let tmp: ExtensionInfo[] = [];
    if (!_.isNil(list)) {
      _.forEach(list, (x) => {
        _.forEach(x.ChildrenAsInfo, (xx) => {
          let isThatFoundable = _.findIndex(
            workspaceDataForTree.favourites,
            (xxx) => {
              return xxx === xx.Id;
            }
          );
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
    // extsListQuery.status,
    fc,
    workspaceDataForTree.favourites,
    treeInfo.updateId,
    _.size(treeInfo.nodes),
    ...exportUtils.refresh_lang()
  ]);

  let m_ws = useMergeParamWithWorkSpace();

  let fn_calculate_fav = (): TreeNodeInfo => {
    return {
      // add item for Remarks
      id: "Remarks",
      label: Dot("IfsdGO", "Favourites"),
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
  }, [(favoritesList || []).join("-"), ...exportUtils.refresh_lang()]);

  useEffect(() => {
    dis(
      ToolSlice.actions.updateSubCategoryTreeInfo({
        updateId: new Date().getTime() + "",
        expanded: [
          _.first(
            _.map(
              _.filter(extsList, (x2) => {
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
          ..._.map(extsList || [], (x, d, n) => {
            // TODO: hover to show detail
            return {
              id: x.Id,
              hasCaret: true,
              icon: x.Icon || "application",
              label: x.Label,
              childNodes: _.map(x.ChildrenAsInfo, (child) => {
                return {
                  id: child.Id,
                  label: _.toString(child.Label),
                  icon: "application",
                } as TreeNodeInfo;
              }),
            } as TreeNodeInfo;
          }),
        ],
      })
    );
  }, [fc, ...exportUtils.refresh_lang()]);

  let activeExt: TreeNodeInfo | null =
    useMemo<TreeNodeInfo | null>((): TreeNodeInfo | null => {
      let findObj: TreeNodeInfo | null = null;
      if (treeInfo == null) return null;
      if (treeInfo.nodes == null) return null;
      // logutils.info(
      //   "check all nodes",
      //   treeInfo.nodes + ", findObj is",
      //   findObj
      // );
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
      fc,
      _.size(treeInfo.nodes),
    ]);

  gutils.ExposureIt("activeExt", activeExt, true);
  let activeOne = props.activeOne;

  // let r = QueryUtils.validateResult(extsListQuery, {
  //   label: Dot("CWohyqde", "Tools"),
  // });
  // if (!_.isNil(r)) {
  //   return r;
  // }

  if (_.isNil(activeOne)) {
    return (
      <NonIdealState
        className="whitespace-break-spaces"
        icon="array-string"
        title={Dot("cuRCqb", "Category doesn't exist")}
      ></NonIdealState>
    );
  }
  return (
    <div className=" select-none w100 h100 flex-parent whitespace-break-spaces overflow-auto">
      <div className="flex-main-body h-full">
        {_.isEmpty(extsList) ? (
          <NonIdealState
            icon="array"
            title={Dot("q12beqwR", "No Available Tools")}
          ></NonIdealState>
        ) : (
          <GenTree
            cacheId="toolet"
            onClick={(node) => {
              if (node?.hasCaret) return;
              let childId = node?.id;
              // goWithChildId(childId);
              let parentIcon: string | null = null;
              let parentLabel: string | null = null;
              _.every(treeInfo.nodes, (x: TreeNodeInfo) => {
                if (!x.childNodes || x.icon == "star") {
                  return true;
                }
                for (let item of x.childNodes) {
                  if (item.id == childId) {
                    parentIcon = x.icon + "";
                    parentLabel = x.label + "";
                    return false;
                  }
                }
                return true;
              });
              dis(
                WorkspaceSlice.actions.addTab({
                  keyName: "tools",
                  newTab: {
                    id: _.toString(childId) || "Unknown Id",
                    label:
                      parentLabel + " - " + _.toString(node?.label) ||
                      "Unknown Label",
                    pageTitle: `${_.toString(node?.label)}`,
                    icon: (parentIcon || "application") as any,
                    // pathname: m_ws({
                    //   fc: fc,
                    //   extId: childId,
                    // }),
                  },
                })
              );
            }}
            formatEachNode={(x) => {
              if (!x.hasCaret) {
                let hasRemarkThisOne =
                  _.find(favoritesList, (xx) => {
                    return _.toString(xx.Id + "") === x.id;
                  }) != null;
                return {
                  ...x,
                  secondaryLabel: (
                    <ButtonGroup>
                      <Tooltip
                        content={
                          !hasRemarkThisOne
                            ? Dot("lp0qmd0", "Mark it as favourite")
                            : Dot("_5OqeG", "Unmark it")
                        }
                      >
                        <Button
                          small
                          minimal
                          className="icon-remark"
                          icon={
                            hasRemarkThisOne ? (
                              <Icon icon="star" className=" "></Icon>
                            ) : (
                              "star-empty"
                            )
                          }
                          intent={hasRemarkThisOne ? "primary" : "none"}
                          onClick={(e) => {
                            gutils.stopE(e);
                            if (hasRemarkThisOne) {
                              dis(
                                WorkspaceSlice.actions.mergeTabPart({
                                  name: 'tools',
                                  value: {
                                    favourites: _.filter(
                                      workspaceDataForTree.favourites,
                                      (xx) => {
                                        return xx != x.id;
                                      }
                                    ),
                                  }
                                })
                              );
                            } else {
                              dis(
                                WorkspaceSlice.actions.mergeTabPart({
                                  name: 'tools',
                                  value: {
                                    favourites: (_.uniq([
                                      ...(workspaceDataForTree.favourites || []),
                                      x.id,
                                    ]) || []) as any,
                                  }
                                })
                              );
                            }
                            onUpdateMemStatus(updateMemStatus + 1);
                          }}
                        />
                      </Tooltip>

                      <Tooltip content={Dot("E6F9B", "Add it into workflow")}>
                        <Button
                          small
                          minimal
                          // className="icon-remark"
                          icon={"add"}
                          intent="none"
                          // intent={hasRemarkThisOne ? "primary" : "none"}
                          onClick={(e) => {
                            //
                          }}
                        />
                      </Tooltip>
                    </ButtonGroup>
                  ),
                };
              } else {
                return x;
              }
            }}
            needShowCountChildren={true}
            info={treeInfo || []}
            onChange={(new_nodes) => {
              dis(ToolSlice.actions.updateSubCategoryTreeInfo(new_nodes));
            }}
            expanded={workspaceDataForTree.expanded || []}
            selected={workspaceDataForTree.selected || []}
            onExpandedChange={(value) => {
              dis(
                WorkspaceSlice.actions.mergeTabPart({
                  name: 'tools',
                  value: {
                    expanded: value,
                  }
                })
              );
            }}
            onSelectedChange={(value) => {
              dis(
                WorkspaceSlice.actions.mergeTabPart({
                  name: "tools",
                  value: {
                    selected: value,
                  }
                })
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
