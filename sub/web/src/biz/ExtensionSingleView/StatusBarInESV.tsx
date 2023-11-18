// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 15 Oct 2023
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
  ButtonProps,
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
import apiSlice, { ExtensionVM } from "../../slice/apiSlice";
import { URL_WORKBENCH_TOOLS } from "../../styles/path";
import { Link } from "react-router-dom";
import URLUtils from "../../utils/URLUtils";
import AuthHookUtils from "../../utils/AuthHookUtils";
import QueryUtils from "../../utils/QueryUtils";
import "./index.scss";
import forgeSlice from "../../slice/ForgeSlice";
import AlertUtils from "../../utils/AlertUtils";
import ToolSlice from "../../slice/toolSlice";

export type StatusBarInESVProp = {
  extId: string;
  extensionVM: ExtensionVM | undefined;
};

let StatusBarInESV = (props: StatusBarInESVProp) => {
  let { extensionVM, extId } = props;

  let { Tool_RemarkExtIds } = exportUtils.useSelector((v) => {
    return {
      Tool_RemarkExtIds: v.forge.Tool_RemarkExtIds,
    };
  });
  let dis = exportUtils.dispatch();

  // has favourite this
  let isFavourite = _.includes(Tool_RemarkExtIds, extId);

  let rightControls: {
    icon: string;
    tooltip: string;
    label: string;
    onClick: (e: any) => any;
  }[] = [
    {
      icon: isFavourite ? "star" : "star-empty",
      tooltip: Dot("Bd9h-", "Add it to my favourite collection"),
      label: Dot("Ugpng", "Favourite"),
      onClick: (e) => {
        if (isFavourite) {
          dis(
            forgeSlice.actions.removeExtensionIdFromTool_RemarkExtIds({
              extId: props.extId + "",
            })
          );
        } else {
          dis(
            forgeSlice.actions.addExtensionIdIntoTool_RemarkExtIds({
              extId: props.extId + "",
            })
          );
        }
      },
    },
    {
      icon: "comment",
      tooltip: Dot(
        "rpG0G",
        "We value your feedback and would love to hear your thoughts on how we can improve our product - please don't hesitate to share your feedback with us!"
      ),
      label: Dot("xlqtA", "Feedback"),
      onClick: () => {
        console.log("Feedback");
      },
    },
    {
      icon: "refresh",
      tooltip: Dot(
        "VgG5y",
        "Click here to refresh the status of your extension"
      ),
      label: Dot("zaSKh", "Refresh"),
      onClick: () => {
        dis(ToolSlice.actions.updateExtensionIdRefreshMap({ extId: extId }));
        AlertUtils.popMsg("success", {
          message: Dot("LAc1m", "Refreshed the app view."),
        });
      },
    },
  ];

  // iterate rightControls as a list of buttons, which contains Tooltip
  let rightControlsRender = _.map(rightControls, (x) => {
    return (
      <Tooltip
        key={x.label}
        content={x.tooltip}
        position={Position.BOTTOM_RIGHT}
      >
        <Button
          minimal={true}
          icon={x.icon as any}
          small={true}
          onClick={x.onClick}
          text={x.label}
        />
      </Tooltip>
    );
  });

  let { nodes, nodes_updateId } = exportUtils.useSelector((x) => {
    return {
      nodes: x.tool.subCategoryTreeInfo.nodes,
      nodes_updateId: x.tool.subCategoryTreeInfo.updateId,
    };
  });
  let appTitleLabel = useMemo(() => {
    let m: string | null = null;
    // iterate nodes and check their ChildrenAsInfo
    _.findLast(nodes, (x) => {
      // iterate ChildrenAsInfo and check their ExtensionId
      _.find(x.childNodes, (xx) => {
        if (xx.id == extId) {
          m = x.label as string;
        }
        return m != null;
      });
      return m != null;
    });
    return [m, extensionVM?.Info?.Label].join(" - ");
  }, [extensionVM?.Info?.Label, nodes_updateId]);

  if (_.isEmpty(extId)) {
    return (
      <NonIdealState
        icon="error"
        title={Dot("83dNp", "Unable to Load Extension ID. (REF: 1dl1f)")}
        description={Dot("qubSJ", "Extension VM is not ID. (REF: IQnMH).")}
      />
    );
  }

  if (_.isNil(extensionVM)) {
    return (
      <NonIdealState
        icon="error"
        title={Dot("Nq1IR", "Unable to Load Extension VM")}
        description={Dot("X4L_Z", "Extension VM is not provided.")}
      />
    );
  }

  return (
    <div className="esv-title-w">
      <div className="esv-title-s-l">
        <Button
          minimal={true}
          icon={"application"}
          small={true}
          onClick={() => {
            AlertUtils.popMsg("primary", {
              message: Dot(
                "iQL2c",
                `We're still exploring the full range of functions for this button - if you have any feedback or suggestions on how we can improve it, please let us know!`
              ),
            });
          }}
          text={appTitleLabel}
        />
      </div>
      <div className="esv-title-s-r">{rightControlsRender}</div>
    </div>
  );
};

export default StatusBarInESV;
export { StatusBarInESV };
