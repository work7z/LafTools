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

let { cloneDeep } = _;

type PassProp = {
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
    // recursively format tmp_nodes to nodes, so that we can use it in Tree, note that isExpanded is true when it's in info.expanded and isSeleced is true when it's in info.selected
    let formatEachNodeItem = (nodeList: TreeNodeInfo[]): TreeNodeInfo[] => {
      return _.map(nodeList, (x) => {
        let hasCaret = !_.isNil(x.hasCaret)
          ? x.hasCaret
          : !_.isEmpty(x.childNodes);
        let i = {
          icon: "application",
          ...x,
          label:
            props.needShowCountChildren && hasCaret
              ? x.label + `(${_.size(x.childNodes)})`
              : x.label,
          isExpanded: hasSearchText
            ? true
            : _.includes(info.expanded, x.id.toString()),
          isSelected: _.includes(info.selected, x.id.toString()),
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
  }, [info.nodes, info.updateId, searchText]);

  return (
    <div>
      <div className="pt-10">
        <InputGroup
          leftIcon="search"
          placeholder={Dot("5XnE1", "Search Extensions by Keyword")}
          type="search"
          small={true}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></InputGroup>
      </div>
      <Tree
        contents={nodes}
        onNodeDoubleClick={(node) => {
          let e = node;
          if (node.hasCaret) {
            // if e.hasCaret, then toggle if its value in info.expanded
            let new_info = { ...info };
            if (_.includes(info.expanded, node.id.toString())) {
              new_info = {
                ...info,
                expanded: _.filter(info.expanded, (x) => {
                  return x != node.id;
                }),
              };
            } else {
              new_info = {
                ...info,
                expanded: _.uniq([...(info.expanded || []), node.id]) as any,
              };
            }
            props.onChange(new_info);
            if (!_.isNil(e)) {
              props.onClick && props.onClick(e as TreeNodeInfo);
            }
          }
          if (!_.isNil(node)) {
            props.onDoubleClick && props.onDoubleClick(node as TreeNodeInfo);
          }
        }}
        onNodeClick={(e, e2, e3) => {
          // update info.selected according to e.isSelected
          let new_info = { ...info };
          let node = e;
          if (false && e.hasCaret) {
          } else {
            if (!e.isSelected) {
              new_info = {
                ...info,
                selected: [node.id.toString()],
              };
            }
          }
          props.onChange(new_info);
          if (!_.isNil(e)) {
            props.onClick && props.onClick(e as TreeNodeInfo);
          }
        }}
        onNodeCollapse={(obj) => {
          let new_info = {
            ...info,
            expanded: _.filter(info.expanded, (x) => {
              return x != obj.id;
            }),
          };
          props.onChange(new_info);
        }}
        onNodeExpand={(obj) => {
          let new_info = {
            ...info,
            expanded: _.uniq([...(info.expanded || []), obj.id]) as any,
          };
          props.onChange(new_info);
        }}
        className={Classes.ELEVATION_0}
      />
    </div>
  );
};

/**
[
    {
      id: 0,
      hasCaret: true,
      icon: "folder-close",
      label: (
        <ContextMenu {...contentSizing} content={<div>Hello there!</div>}>
          Folder 0
        </ContextMenu>
      ),
    },
    {
      id: 1,
      icon: "folder-close",
      isExpanded: true,
      label: (
        <ContextMenu {...contentSizing} content={<div>Hello there!</div>}>
          <Tooltip content="I'm a folder <3" placement="right">
            Folder 1
          </Tooltip>
        </ContextMenu>
      ),
      childNodes: [
        {
          id: 2,
          icon: "document",
          label: "Item 0",
          secondaryLabel: (
            <Tooltip content="An eye!">
              <Icon icon="eye-open" />
            </Tooltip>
          ),
        },
        {
          id: 3,
          icon: (
            <Icon
              icon="tag"
              intent={Intent.PRIMARY}
              className={Classes.TREE_NODE_ICON}
            />
          ),
          label:
            "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
        },
        {
          id: 4,
          hasCaret: true,
          icon: "folder-close",
          label: (
            <ContextMenu {...contentSizing} content={<div>Hello there!</div>}>
              <Tooltip content="foo" placement="right">
                Folder 2
              </Tooltip>
            </ContextMenu>
          ),
          childNodes: [
            { id: 5, label: "No-Icon Item" },
            { id: 6, icon: "tag", label: "Item 1" },
            {
              id: 7,
              hasCaret: true,
              icon: "folder-close",
              label: (
                <ContextMenu
                  {...contentSizing}
                  content={<div>Hello there!</div>}
                >
                  Folder 3
                </ContextMenu>
              ),
              childNodes: [
                { id: 8, icon: "document", label: "Item 0" },
                { id: 9, icon: "tag", label: "Item 1" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      hasCaret: true,
      icon: "folder-close",
      label: "Super secret files",
      disabled: true,
    },
  ];
 */