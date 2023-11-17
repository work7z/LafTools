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
import { APPINFOJSON, delayFN } from "../../../nocycle";
import { SystemStatusBarItem } from "../../WorkBench/cpt/SystemStatusBar/index";

import React, { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import gutils from "../../../utils/GlobalUtils";
import { logutils } from "../../../utils/LogUtils";
import _ from "lodash";
import RouteMem from "../../../styles/routeMem";
import statusSlice from "../../../slice/StatusSlice";
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
import URLUtils from "../../../utils/URLUtils";
import TranslationUtils, { Dot } from "../../../utils/TranslationUtils";
import "allotment/dist/style.css";
import { Allotment } from "allotment";
import exportUtils from "../../../utils/ExportUtils";
import forgeSlice, {
  ACTION_UPDATE_LANG_AND_APPLY_CHANGE,
} from "../../../slice/ForgeSlice";
import { ACTION_callRefreshAll } from "../../../slice/SystemSlice";
import {
  ID_FILES,
  ID_HISTORY as ID_MANUAL,
  ID_NOTES,
  ID_TOOLS,
  SUB_URL_WORKBENCH_TOOLS_CATEGORY,
  URL_WORKBENCH_FILES,
  URL_WORKBENCH_MANUALS as URL_WORKBENCH_MANUAL,
  URL_WORKBENCH_NOTES,
  URL_WORKBENCH_TOOLS,
} from "../../../styles/path";
import FixedWorkBenchTool from "../../FixedWorkBenchTool";
import FixedWorkBenchFiles from "../../FixedWorkBenchFiles";
import WorkBenchNotes from "../../WorkBenchNotes";
import FixedWorkBenchHistory from "../../FixedWorkBenchHistory";
import FixedWorkBenchNotes from "../../FixedWorkBenchNotes";
import { type } from "jquery";
import apiSlice, {
  ExtensionInfo,
  ListExtForTheCategoryRes,
} from "../../../slice/apiSlice";
import { SysTabPane } from "../cpt/SysTabPane";
import QueryUtils, {
  getAjaxValueRes as getAjaxValueRes,
} from "../../../utils/QueryUtils";
import { useMergeParamWithWorkSpace, useSearchQuery } from "../common/WB_Func";
import RouteUtils from "../../../utils/RouteUtils";
import ToolSlice from "../../../slice/toolSlice";
import MottoLine from "../../../cpt/MottoLine";
import GenTree from "../../../cpt/GenTree";
import { FnPureToolDefinition } from "../../WorkBenchTool/tool_definitions";

export default (props: {
  activeOne: FnPureToolDefinition | undefined;
}): any => {
  let sq = useSearchQuery();
  const [updateMemStatus, onUpdateMemStatus] = useState(0);
  let fc = sq.fc || "all";
  let currentCategoryId = fc;
  let extsListQuery = apiSlice.useGetToolCategoryExtsListQuery(
    { categoryId: fc },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  //   let list_extsListQuery: ListExtForTheCategoryRes[] =
  //     extsListQuery.data?.payload?.list || [];
  let dis = exportUtils.dispatch();
  let toolParam = {
    category: fc,
    extId: "", // TODO: patch extId
  };

  let { Tool_RemarkExtIds } = exportUtils.useSelector((v) => {
    return {
      Tool_RemarkExtIds: v.forge.Tool_RemarkExtIds,
    };
  });
  let treeInfo = exportUtils.useSelector((x) => x.tool.subCategoryTreeInfo);
  let hist = RouteUtils.useHistory();
  let goWithChildId = (childId) => {
    // if (!_.isNil(childId)) {
    //   hist.push(`${URL_WORKBENCH_TOOLS}/${currentCategoryId}/${childId}`);
    //   dis(ToolSlice.actions.updateSubCategoryForSelected([childId]));
    // }
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
            // TODO: hover to show detail
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
  let activeOne = props.activeOne;

  // URLUtils.useUpdateTitle(
  //   [activeExt?.label as string, activeOne?.label]
  //     .filter((x) => !_.isNil(x))
  //     .join(" - "),
  //   [toolParam.category + "", toolParam.extId + ""]
  // );

  let r = QueryUtils.validateResult(extsListQuery, {
    label: Dot("CWohyd", "Exts List by selected CategoryID"),
    // onlyErr: true,
  });
  if (!_.isNil(r)) {
    return r;
  }

  if (_.isNil(activeOne)) {
    return (
      <NonIdealState
        className="whitespace-break-spaces"
        icon="array-string"
        title={Dot("cuRCqb", "Category not found.")}
      ></NonIdealState>
    );
  }
  return (
    <div className=" select-none w100 h100 flex-parent whitespace-break-spaces overflow-auto">
      <div className="flex-main-body">
        {_.isEmpty(extsListQuery.data?.payload?.list) ? (
          <NonIdealState
            icon="array"
            title={Dot(
              "qUabeqwR",
              "There's no available tools for this category."
            )}
          ></NonIdealState>
        ) : (
          <GenTree
            cacheId="toolet"
            onClick={(node) => {
              if (node?.hasCaret) return;
              let childId = node?.id;
              goWithChildId(childId);
            }}
            formatEachNode={(x) => {
              if (!x.hasCaret) {
                let hasRemarkThisOne =
                  _.find(favoritesList, (xx) => {
                    return _.toString(xx.Id + "") === x.id;
                  }) != null;
                return {
                  ...x,
                  // label: (
                  //   <Popover
                  //     interactionKind="hover"
                  //     placement="right"
                  //     content={<div>this is content</div>}
                  //   >
                  //     {x.label}
                  //   </Popover>
                  // ),
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
                                forgeSlice.actions.removeExtensionIdFromTool_RemarkExtIds(
                                  { extId: x.id + "" }
                                )
                              );
                            } else {
                              dis(
                                forgeSlice.actions.addExtensionIdIntoTool_RemarkExtIds(
                                  { extId: x.id + "" }
                                )
                              );
                            }
                            onUpdateMemStatus(updateMemStatus + 1);
                          }}
                        />
                      </Tooltip>

                      <Tooltip content={Dot("lipPs", "Open it in new tab")}>
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

                      {/* <Tooltip content={Dot("lipsdPs", "Extra Operations")}>
                        <Popover
                          interactionKind="click"
                          content={<div>this is extra menu</div>}
                        >
                          <Button
                            small
                            minimal
                            icon={"menu"}
                            intent="none"
                            onClick={(e) => {
                              //
                            }}
                          />
                        </Popover>
                      </Tooltip> */}

                      {/* <AnchorButton
                        href={RouteUtils.getCompleteURL(
                          `${URL_WORKBENCH_TOOLS}/${currentCategoryId}/${x.id}`
                        )}
                        target="_blank"
                        small
                        minimal
                        icon="share"
                      /> */}
                    </ButtonGroup>
                  ),
                };
              } else {
                return x;
              }
            }}
            needShowCountChildren={true}
            info={treeInfo}
            onChange={(new_nodes) => {
              dis(ToolSlice.actions.updateSubCategoryTreeInfo(new_nodes));
            }}
          />
        )}
      </div>
      <div className="btm-top">
        <MottoLine />
      </div>
    </div>
  );
};
