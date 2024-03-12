// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 28 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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
import TranslationUtils, { Dot } from "../../../../../../../../utils/cTranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../reducers/bigTextSlice";
import _ from "lodash";
import { FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useEffect, useMemo, useState } from "react";
import AjaxUtils from "../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../components/SysTabPane";
import { CLZ_BTN_TRANSITION_STYLE, CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../reducers/runtimeStatusSlice";

import { CommonTransformerProps } from "./types";
import { ExtensionAction, ExtensionInfo, ToolCategory, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";
import fn_AppCategory from "@/app/[lang]/client/src/impl/tools/d_category";
import { ListExtForTheCategoryRes } from "../../../../../../../../reducers/apiSlice";
import appToolInfoObj from "@/app/[lang]/client/src/impl/tools/d_meta";
import ActionButton from "../../../../../../../../components/ActionButton";
import gutils from "../../../../../../../../utils/GlobalUtils";

export let controlBarHeight = VAL_CSS_CONTROL_PANEL;
export let controlClz = "space-x-1 flex  flex-coumn items-center justify-between";

export type TransformerWithRuntime = {
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


export let usePromiseWait = (obj: {
    text: string,
    whenToStart: boolean,
    promise: () => Promise<any>,
}, deps: any[]): { loading: boolean, progressText: string } => {
    let [errorMsg, onErrorMsg] = useState<string | null>(null)
    let [loadingStatic, setLoadingStatic] = useState(true)

    let [loadError, onLoadError] = useState<string | null>(null)
    let [loadingProgressRate, setLoadingProgressRate] = useState(0)

    let progressText = loadingStatic ? `${obj.text} ${loadingProgressRate.toFixed(2)}%...` : obj.text;
    // increment percentage randomly, and mark its loading  as false if success, or set errorMsg if having error 
    useEffect(() => {
        if (!obj.whenToStart) {
            return;
        }
        let tmp_loadingProgressRate = 0
        let loopFn = () => {
            let maxVal = 98.161709;
            if (tmp_loadingProgressRate >= maxVal) {
                clearInterval(timer)
                return
            }
            tmp_loadingProgressRate = Math.min(maxVal, tmp_loadingProgressRate + (Math.random() * 4))
            setLoadingProgressRate(tmp_loadingProgressRate)
        }
        let timer = setInterval(loopFn, 89);
        (async () => {
            try {
                onLoadError(null)
                setLoadingProgressRate(0)
                setLoadingStatic(true)
                await obj.promise()
                window.clearInterval(timer)
                setLoadingStatic(false)
            } catch (e) {
                let anyError = gutils.getErrMsg(e)
                onLoadError(anyError)
                window.clearInterval(timer)
            } finally {
                setLoadingStatic(false)
            }
        })()
        return () => {
            window.clearInterval(timer)
        }
    }, [...deps, obj.whenToStart])

    if (loadError) {
        loadingStatic = false
        progressText = Dot("07naT", "Error: {0}", loadError)
    }
    return {
        loading: loadingStatic,
        progressText
    }
}

export let useGetAppCategory = (): ToolCategory[] => {
    return useMemo(() => {
        return fn_AppCategory()
    }, [...exportUtils.refresh_lang()]);
}

export let useExtsList = (fc: string): ListExtForTheCategoryRes[] => {
    let arr: ListExtForTheCategoryRes[] = []
    let isAll = fc == 'all';
    let appCategory = useGetAppCategory()
    appCategory.forEach(x => {
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
                            Label: appToolInfoObj[xxx]?.LabelFn(),
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
    let appCategory = useGetAppCategory()
    return useMemo(() => {
        return appCategory.map(x => {
            return {
                Id: x.Id,
                Label: x.Label,
                SubCategories: x.SubCategories,
                TotalCount: x.TotalCount
            }
        }).filter(x => x.TotalCount != 0)
    }, [appCategory])
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
            <ActionButton
                {...x}
                title={x.title}
                placement={pmt as any}
                small
                intent={x.intent}
                text={x.text}
                className={CLZ_BTN_TRANSITION_STYLE + " transition-colors" + " " + x.className}
            ></ActionButton>
        );
    };
};

export type TextTransformerProps = CommonTransformerProps;
