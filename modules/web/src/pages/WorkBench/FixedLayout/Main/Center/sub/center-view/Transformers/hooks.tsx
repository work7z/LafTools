// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
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

import { Alignment, Button, ButtonProps, Navbar, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../components/GenCodeMirror";
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
    FnPureToolDefinition,
} from "../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../types/workbench-types";
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
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";
import { fn_format_description } from "../../../../../../../../types/workbench-fn";
import { CommonTransformerProps } from "./types";
import { ExtensionAction, ExtensionInfo, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";
import AppCategory from "../../../../../../../../lib/meta/tools/category";
import { ListExtForTheCategoryRes } from "../../../../../../../../reducers/apiSlice";
import AppToolInfoObj from "../../../../../../../../lib/meta/tools/info";

export let controlBarHeight = VAL_CSS_CONTROL_PANEL;
export let controlClz = "space-x-1 flex  flex-coumn items-center justify-between";

export type TransofrmerWithRuntime = {
    crtRuntimeStatus: ToolDefaultOutputType;
}
export let fn_coll_output = (sessionId) => {
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

export let useExtsList = (fc: string): ListExtForTheCategoryRes[] => {
    let arr: ListExtForTheCategoryRes[] = []
    let isAll = fc == 'all';
    AppCategory.forEach(x => {
        if (isAll || x.Id == fc) {
            x.SubCategories.forEach(xx => {
                let obj = {
                    Id: xx.Id,
                    Label: xx.Label,
                    Icon: xx.Icon,
                    CategoryId: x.Id,
                    // ChildrenIdSet: xx.ChildrenIdSet,
                    ChildrenAsInfo: (xx.ChildrenIdSet || []).map(xxx => {
                        return {
                            Id: xxx,
                            Label: AppToolInfoObj[xxx]?.Label || xxx,
                            // Description: xxx.Description + ""
                        } as ExtensionInfo
                    })
                }
                if (!_.isEmpty(obj.ChildrenAsInfo)) {
                    arr.push(obj)
                }
            })
        }
    })
    return arr
}

export let useGetCategoryList = (): FnPureToolDefinition[] => {
    return AppCategory.map(x => {
        return {
            Id: x.Id,
            Label: x.Label,
            SubCategories: x.SubCategories,
            TotalCount: x.TotalCount
        }
    })
}

export let useHookWithSkippingFirst = (fn: () => void, deps: any[]) => {
    let [first, setFirst] = useState(true);
    useEffect(() => {
        if (first) {
            setFirst(false);
            return;
        }
        fn();
    }, deps);
}

export let useCurrentActiveStyle = (sessionId: string, panelId: string) => {
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

export let fn_coll_config = (sessionId) => {
    return exportUtils.useSelector((x) => {
        let v = x.runtimeStatus.toolOutputStatusMap[sessionId]?.collapseConfig;
        if (_.isNil(v)) {
            v = true;
        }
        return {
            v: v,
        };
    }).v;
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

export type TextTransformerProps = CommonTransformerProps;
