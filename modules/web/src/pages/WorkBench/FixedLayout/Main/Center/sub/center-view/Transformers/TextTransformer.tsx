// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 9 Dec 2023
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

import { Button, ButtonProps, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import {
  VAL_CSS_TAB_TITLE_PANEL,
  VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../types/WB_Types";
import { CommonPassProp } from "../transformer_types";
import { Dot } from "../../../../../../../../utils/TranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice";
import _ from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { CSS_TW_LAYOUT_BORDER } from "../../../../../../../../styles/tw";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";
import { CommonTransformerProps } from "./types";

let controlBarHeight = VAL_CSS_CONTROL_PANEL;
let controlClz = "space-x-1 flex  flex-coumn items-center justify-between";

type TextTransformerProps = CommonTransformerProps;
let TextTransformerControl = (props: TextTransformerProps) => {
  let { inputBigTextId } = props;
  let [loadExample, onLoadExample] = useState(false);
  let leftActions: ButtonProps[] = [
    {
      text: Dot("g4lqi", "Get MD2 Hash"),
      intent: "primary",
      title: Dot("Zpqqpf", "Encrypt the data with MD2"),
    },
    {
      text: Dot("2bqHk", "Load from File"),
      intent: "none",
      title: Dot("NNfJo", "Load Data from File"),
      onClick: () => {
        //
      },
    },
    {
      text: Dot("IWUH5", "Show Example"),
      intent: "none",
      className: "",
      title: Dot("NNd1o", "Use Example for Testing"),
      loading: loadExample,
      onClick: async () => {
        try {
          onLoadExample(true);
          let r = await AjaxUtils.DoStaticRequest({
            url: "/example/javascript-s.txt",
          });
          if (r.status != 200) {
            throw new Error(Dot("vU17B", "Unable to send the request"));
          }
          let val = r.data;
          FN_GetDispatch()(
            FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, val),
          );
          AlertUtils.popOK(Dot("gsHQM", "Loaded example data successfully"));
        } catch (e) {
          console.log(e);
          AlertUtils.popError(e as any);
        } finally {
          onLoadExample(false);
        }
      },
    },
  ];
  let sessionId = props.sessionId;
  let isCollapsed = fn_coll_config(sessionId);
  let isCollapsed_output = fn_coll_output(sessionId);

  let onColl = (v: boolean) => {
    FN_GetDispatch()(
      RuntimeStatusSlice.actions.setCollapseConfig({
        sessionId,
        collapseConfig: v,
      }),
    );
  };
  let onColl_output = (v: boolean) => {
    FN_GetDispatch()(
      RuntimeStatusSlice.actions.setCollapseOutput({
        sessionId,
        collapseOutput: v,
      }),
    );
  };
  let rightActions: ButtonProps[] = [
    {
      icon: "duplicate",
      intent: "success",
      text: Dot("Mg4ldi", "Copy"),
      title: Dot("2JyFN", "Copy Result to Clipboard"),
    },
    {
      // icon: "export",
      icon: "download",
      intent: "success" as any,
      className: "btn-purple",
      text: Dot("o52xW", "Export"),
      title: Dot("i88tb", "Export Result to File"),
    },
    {
      icon: "cog",
      intent: isCollapsed ? "none" : "success",
      // title: Dot("Fy217", "Configure Text Transformer"),
      title: Dot("Fy217", "Configure this Tool"),
      className: isCollapsed ? "" : "btn-lime",
      onClick: () => {
        onColl(!isCollapsed);
      },
    },
    {
      icon: "export",
      intent: isCollapsed_output ? "none" : "success",
      // title: Dot("Fy217", "Configure Text Transformer"),
      title: Dot("G3MJN", "Show Output Panel"),
      className: isCollapsed_output ? "" : "btn-lime",
      onClick: () => {
        onColl_output(!isCollapsed_output);
      },
    },
  ];
  return (
    <div
      className="w-full using-edge-ui-bg flex  border-b-[1px] dark:border-gray-600 px-1  flex-column items-center justify-between"
      style={{
        height: controlBarHeight,
      }}
    >
      <div className={controlClz}>
        {leftActions.map(fn_format_button("bottom-start"))}
      </div>
      <div className={controlClz}>
        {rightActions.map(fn_format_button("bottom-end"))}
      </div>
    </div>
  );
};

export let fn_format_button = (pmt: string) => {
  return (x: ButtonProps) => {
    return (
      <Tooltip placement={pmt as any} content={x.title}>
        <Button
          {...x}
          title={""}
          small
          intent={x.intent}
          text={x.text}
        ></Button>
      </Tooltip>
    );
  };
};
let fn_coll_output = (sessionId) => {
  return exportUtils.useSelector((x) => {
    let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.collapseOutput;
    if (_.isNil(v)) {
      v = true;
    }
    return {
      v: v,
    };
  }).v;
};

let useCurrentActiveStyle = (sessionId: string, panelId: string) => {
  let crt_panelId = exportUtils.useSelector((x) => {
    let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.latestViewPanelId;
    if (_.isNil(v)) {
      v = "N/A";
    }
    return {
      v: v,
    };
  }).v;
  return crt_panelId === panelId
    ? {
      zIndex: 20,
    }
    : {};
};

// TODO: provide additionl layout like half to half. ops, I got back-to-back meetings, let us go
let TextTransformerOutput = (props: CommonPassProp) => {
  let sessionId = props.sessionId;
  let isCollapsed = fn_coll_output(sessionId);
  let onColl = (v: boolean) => {
    FN_GetDispatch()(
      RuntimeStatusSlice.actions.setCollapseOutput({
        sessionId,
        collapseOutput: v,
      }),
    );
  };
  let currentStyleForActive = useCurrentActiveStyle(props.sessionId, "output");
  // let h =' w-[38.2%] h-[38.2%] '
  let h = " w-[44%] h-[42%] min-w-[450px] ";
  return (
    <div
      onClick={() => {
        FN_GetDispatch()(
          RuntimeStatusSlice.actions.selectLatestViewPanel({
            sessionId,
            panelId: "output",
          }),
        );
      }}
      className={
        "absolute bottom-0 right-0  " +
        h +
        CSS_TW_LAYOUT_BORDER +
        " border-r-0   " +
        ""
        // (isCollapsed ? " border-b-0 " : "")
      }
      style={{
        ...currentStyleForActive,
        // zIndex: 80,
        ...(isCollapsed
          ? {
            height: VAL_CSS_TAB_TITLE_PANEL,
          }
          : {}),
        transition: "all 0.3s",
      }}
    >
      <SysTabPane
        hasOpacityWhenUnfocus={true}
        crtLeftNavId={props.sessionId + "output"}
        leftNavList={[
          {
            icon: "export",
            label: Dot("Dj9qqwk", "Output"),
            value: "drawer",
          },
        ]}
        rightCtrls={
          <Button
            onClick={() => {
              onColl(!isCollapsed);
            }}
            small
            minimal
            rightIcon={!isCollapsed ? "chevron-up" : "chevron-down"}
          ></Button>
        }
        children={
          isCollapsed ? (
            <span></span>
          ) : (
            <div className="w-full h-full overflow-auto">
              <GenCodeMirror
                placeholder={Dot("y_9YM", "Output will be displayed here.")}
                bigTextId={props.outputBigTextId}
              ></GenCodeMirror>
            </div>
          )
        }
      ></SysTabPane>
    </div>
  );
};

let fn_coll_config = (sessionId) => {
  return exportUtils.useSelector((x) => {
    let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.collapseConfig;
    if (_.isNil(v)) {
      v = false;
    }
    return {
      v: v,
    };
  }).v;
};

let TextTransformerConfig = (props: CommonPassProp) => {
  let sessionId = props.sessionId;
  let isCollapsed = fn_coll_config(sessionId);
  let onColl = (v: boolean) => {
    FN_GetDispatch()(
      RuntimeStatusSlice.actions.setCollapseConfig({
        sessionId,
        collapseConfig: v,
      }),
    );
  };
  let currentStyleForActive = useCurrentActiveStyle(props.sessionId, "config");
  let w = "320px";
  return (
    <div
      onClick={() => {
        FN_GetDispatch()(
          RuntimeStatusSlice.actions.selectLatestViewPanel({
            sessionId,
            panelId: "config",
          }),
        );
      }}
      className={
        "absolute right-0   bg-white dark:bg-black   " +
        CSS_TW_LAYOUT_BORDER +
        " border-r-0   "
      }
      style={{
        ...currentStyleForActive,
        top: controlBarHeight * 3 + "px",
        // width: "26%",
        minWidth: w,
        // maxHeight: "70%",
        height: "70%",
        transition: "all 0.3s",
        transform: isCollapsed ? "translateX(" + w + ")" : "",
      }}
    >
      <div className="absolute left-0 top-0 ">
        {/* <Tooltip
          content={Dot("J5aL1", "Toggle the visibility of tool config panel")}
          style={{
            // transform: "rotate(-90deg) translateY(-54px) translateX(-22px)",
            transform: "translateX(-30px)",
          }}
          // placement="bottom-end"
        > */}
        <Button
          style={{
            // transform: "rotate(-90deg) translateY(-54px) translateX(-22px)",
            transform: "translateX(-30px)",
          }}
          title={Dot("J5aL1", "Toggle the visibility of tool config panel")}
          onClick={() => {
            onColl(!isCollapsed);
          }}
          // text={Dot("0ji-Z", "Collapse Config")}
          icon={isCollapsed ? "chevron-right" : "chevron-left"}
          intent="none"
        ></Button>
        {/* </Tooltip> */}
      </div>
      <SysTabPane
        hasOpacityWhenUnfocus={true}
        crtLeftNavId={props.sessionId + "config"}
        leftNavList={[
          {
            icon: "cog",
            label: Dot("I88nZ", "Tools Config"),
            value: "drawer",
          },
        ]}
        rightCtrls={
          <Button
            onClick={() => {
              // onColl(!isCollapsed);
            }}
            small
            minimal
          // rightIcon={!isCollapsed ? "chevron-up" : "chevron-down"}
          ></Button>
        }
        children={<div>this is bg</div>}
      ></SysTabPane>
    </div>
  );
};

export default (props: CommonTransformerProps) => {
  let sessionId = props.sessionId;
  let bodyHeight = `calc(100% - ${controlBarHeight}px)`;
  let inputBigTextId = props.inputBigTextId;
  let outputBigTextId = props.outputBigTextId;
  let extId = props.extId
  let commonPassProp: CommonPassProp = {
    ...props
  };

  return (
    <div key={sessionId} className="w-full h-full relative">
      <TextTransformerControl {...commonPassProp}></TextTransformerControl>
      <div
        style={{
          height: bodyHeight,
        }}
        className="w-full overflow-auto"
      >
        <GenCodeMirror
          lineWrap
          placeholder="Input your text here"
          language="javascript"
          bigTextId={inputBigTextId}
        ></GenCodeMirror>
      </div>
      <TextTransformerOutput {...commonPassProp}></TextTransformerOutput>
      <TextTransformerConfig {...commonPassProp}></TextTransformerConfig>
    </div>
  );
};
