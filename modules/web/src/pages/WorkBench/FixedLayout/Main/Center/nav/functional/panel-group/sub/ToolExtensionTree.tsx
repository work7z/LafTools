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
import { APPINFOJSON, FN_GetDispatch, delayFN } from "../../../../../../../../../nocycle";

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
import GenTree, { TREE_ROOT_ID_PREFIX } from "../../../../../../../../../components/SystemNavTree";
import { FnPureToolDefinition } from "../../../../../../../../../types/workbench-types";
import WorkspaceSlice from "../../../../../../../../../reducers/workspaceSlice";
import { useExtsList, useGetAppCategory, useGetCategoryList } from "../../../../sub/center-view/Transformer/hooks";

export default (props: {
  activeOne: FnPureToolDefinition | undefined;
}): any => {
  let category = useGetAppCategory()
  let sq = useSearchQuery();
  const [updateMemStatus, onUpdateMemStatus] = useState(0);
  let fc = sq.fc || "all";

  let dis = exportUtils.dispatch();

  let treeNodeData = exportUtils.useSelector((x) => x.tool.subCategoryTreeInfo);
  let hist = RouteUtils.useHistory();
  let extsList = useExtsList(fc)

  let selectExpandFavouriteObj = exportUtils.useSelector((v) => {
    return {
      initialized: v.workspace.tools.initialized,
      expanded: v.workspace.tools.expanded,
      selected: v.workspace.tools.selected,
      favourites: v.workspace.tools.favourites,
    };
  });
  let extsList2 = extsList;

  let favoritesList: ExtensionInfo[] = useMemo(() => {
    let existSet = new Set();
    // select items in each of list.ChildrenAsInfo by matching if their id is in Tool_RemarkExtIds
    let tmp: ExtensionInfo[] = [];
    if (!_.isNil(extsList2)) {
      _.forEach(extsList2, (x) => {
        _.forEach(x.ChildrenAsInfo, (xx) => {
          let isThatFoundable = _.findIndex(
            selectExpandFavouriteObj.favourites,
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
    fc,
    selectExpandFavouriteObj.favourites,
    treeNodeData.updateId,
    _.size(treeNodeData.nodes),
    ...exportUtils.refresh_lang()
  ]);

  let fn_calculate_fav = (): TreeNodeInfo => {
    return {
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

  // update tree main data
  useEffect(() => {
    dis(
      ToolSlice.actions.updateSubCategoryTreeInfo({
        nodes: [
          fn_calculate_fav(),
          ..._.map(extsList || [], (x, d, n) => {
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
                  // TODO: hover to show detail
                } as TreeNodeInfo;
              }),
            } as TreeNodeInfo;
          }),
        ],
      })
    );
  }, [fc, ...exportUtils.refresh_lang()]);

  // update default data for tree select, expanded
  let categoryList = useGetCategoryList()
  useEffect(() => {
    if (_.isEmpty(extsList)) {
      return;
    }
    if (!treeNodeData || !treeNodeData.nodes || treeNodeData.nodes.length == 0) {
      return;
    }
    if (selectExpandFavouriteObj.initialized) {
      return;
    }
    if (_.isEmpty(categoryList)) {
      return;
    }
    let defaultExpanded: string[] = []
    // _.forEach(treeNodeData.nodes, (x, d, n) => {
    // defaultExpanded.push(x.id + "")
    // _.forEach(x.childNodes, (xx, dd, nn) => {
    //   defaultExpanded.push(xx.id + "")
    // })
    // })
    // let firstMenuId = treeNodeData.nodes[0].id
    // if (firstMenuId) {
    //   defaultExpanded.push(firstMenuId + "")
    // }
    // defaultExpanded.push(treeNodeData.nodes[1].id + "")

    _.forEach(categoryList, x => {
      defaultExpanded.push(TREE_ROOT_ID_PREFIX + x.Id)
    })

    dis(
      WorkspaceSlice.actions.mergeTabPart({
        name: "tools",
        value: {
          expanded: defaultExpanded,
        }
      })
    );
    // FN_GetDispatch()(
    //   WorkspaceSlice.actions.markInitialized("tools")
    // )
  }, [treeNodeData.nodes, selectExpandFavouriteObj.initialized, ...exportUtils.refresh_lang()]);

  let activeOne = props.activeOne;


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
              _.every(treeNodeData.nodes, (x: TreeNodeInfo) => {
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
                                      selectExpandFavouriteObj.favourites,
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
                                      ...(selectExpandFavouriteObj.favourites || []),
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
            info={treeNodeData || []}
            onChange={(new_nodes) => {
              dis(ToolSlice.actions.updateSubCategoryTreeInfo(new_nodes));
            }}
            expanded={selectExpandFavouriteObj.expanded || []}
            selected={selectExpandFavouriteObj.selected || []}
            onExpandedChange={(value) => {
              logutils.log("expanded log", value)
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
