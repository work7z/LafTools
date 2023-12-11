// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 13 Oct 2023
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
  TreeNode,
} from "@blueprintjs/core";
import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/TranslationUtils";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";
import {
  MutationState,
  MutationSubState,
  QuerySubState,
} from "@reduxjs/toolkit/dist/query/core/apiState";
import gutils from "../../utils/GlobalUtils";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ContextMenu, Tree, TreeNodeInfo } from "@blueprintjs/core";
import { Example, ExampleProps } from "@blueprintjs/docs-theme";
import { TreeWrapInfo } from "../../styles/var";
import MottoLine from "../MottoLine";

let { cloneDeep } = _;

type PassProp = {
  expanded: string[];
  selected: string[];
  onExpandedChange: (newVal: string[]) => any;
  onSelectedChange: (newVal: string[]) => any;
  cacheId: string;
  needShowCountChildren?: boolean;
  formatEachNode?: (node: TreeNodeInfo) => TreeNodeInfo;
  info: TreeWrapInfo;
  onChange: (new_info: TreeWrapInfo) => any;
  onDoubleClick?: (node: TreeNodeInfo | undefined) => any;
  onClick?: (node: TreeNodeInfo | undefined) => any;
};

export default (props: PassProp) => {
  let { cacheId } = props;
  const contentSizing = {
    popoverProps: { popoverClassName: Classes.POPOVER_CONTENT_SIZING },
  };
  let info = props.info;
  if (_.isEmpty(info)) {
    return <div>{Dot("yznU9", "Empty Tree Data")}</div>;
  }
  // define a state for search text
  const [searchText, setSearchText] = useState("");

  let hasSearchText = !gutils.empty(searchText);

  let nodes: TreeNodeInfo[] = useMemo(() => {
    // recursively format tmp_nodes to nodes, so that we can use it in Tree, note that isExpanded is true when it's in props.expanded and isSeleced is true when it's in props.selected
    let formatEachNodeItem = (nodeList: TreeNodeInfo[]): TreeNodeInfo[] => {
      return _.map(nodeList, (x) => {
        let hasCaret = !_.isNil(x.hasCaret)
          ? x.hasCaret
          : !_.isEmpty(x.childNodes);
        let isExpanded = hasSearchText
          ? true
          : _.includes(props.expanded, x.id.toString());
        let i = {
          icon: "application",
          ...x,
          // icon: (hasCaret
          //   ? !isExpanded
          //     ? "folder-close"
          //     : "folder-open"
          //   : "application") as any,
          label:
            props.needShowCountChildren && hasCaret
              ? x.label + `(${_.size(x.childNodes)})`
              : x.label,
          isExpanded: isExpanded,
          isSelected: _.includes(props.selected, x.id.toString()),
          childNodes: formatEachNodeItem(x.childNodes || []),
          // secondaryLabel: <Button minimal={true} icon="star-empty" />,
          hasCaret,
        } as TreeNodeInfo;
        if (props.formatEachNode) {
          i = props.formatEachNode(i);
        }
        return i;
      });
    };

    let tmp_nodes = hasSearchText
      ? _.map(info.nodes, (x) => {
          return {
            ...x,
            childNodes: _.filter(x.childNodes, (xx) => {
              return _.includes(
                (xx.label + "").toLowerCase(),
                searchText.toLowerCase()
              );
            }),
          };
        })
      : info.nodes;

    let fin: TreeNodeInfo[] = formatEachNodeItem(tmp_nodes);
    if (hasSearchText) {
      return fin.filter((x) => !_.isEmpty(x.childNodes));
    }
    return fin;
  }, [info.nodes, props.expanded, props.selected, info.updateId, searchText]);

  return (
    <div className="h-full ">
      <div className="pt-10">
        <InputGroup
          leftIcon="search"
          placeholder={Dot("5XdnE1", "Search Tools by Keyword")}
          type="search"
          small={true}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></InputGroup>
      </div>
      <div
        style={{
          height: `calc(100% - 46px)`,
          marginTop: "1px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
        className="relative btm-top"
      >
        <div
          style={{
            flexGrow: 1,
          }}
        >
          <Tree
            contents={nodes}
            onNodeDoubleClick={(node) => {
              let e = node;
              if (false && node.hasCaret) {
              }
              if (!_.isNil(node)) {
                props.onDoubleClick &&
                  props.onDoubleClick(node as TreeNodeInfo);
              }
            }}
            onNodeClick={(e, e2, e3) => {
              // update props.selected according to e.isSelected
              let new_info = { ...info };
              let node = e;
              if (e.hasCaret) {
                // if e.hasCaret, then toggle if its value in props.expanded
                if (_.includes(props.expanded, node.id.toString())) {
                  props.onExpandedChange(
                    _.filter(props.expanded, (x) => {
                      return x != node.id;
                    })
                  );
                } else {
                  props.onExpandedChange(
                    _.uniq([...(props.expanded || []), node.id]) as any
                  );
                }
                if (!_.isNil(e)) {
                  props.onClick && props.onClick(e as TreeNodeInfo);
                }
              } else {
                if (!e.isSelected) {
                  props.onSelectedChange([node.id.toString()]);
                }
              }
              props.onChange(new_info);
              if (!_.isNil(e)) {
                props.onClick && props.onClick(e as TreeNodeInfo);
              }
            }}
            onNodeCollapse={(obj) => {
              // props.onChange(new_info);
              props.onExpandedChange(
                _.filter(props.expanded, (x) => {
                  return x != obj.id;
                })
              );
            }}
            onNodeExpand={(obj) => {
              let fin = _.uniq([...(props.expanded || []), obj.id]) as string[];
              props.onExpandedChange(fin);
            }}
            className={Classes.ELEVATION_0}
          />
        </div>
        <div className="btm-top">
          <MottoLine />
        </div>
      </div>
    </div>
  );
};
