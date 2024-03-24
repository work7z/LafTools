
import { Alignment, Button, ButtonProps, Navbar, Popover, Tab, Tabs, Tooltip } from "@blueprintjs/core";
import GenCodeMirror from "../../../../../../../../../components/GenCodeMirror";
import {
    VAL_CSS_TAB_TITLE_PANEL,
    VAL_CSS_CONTROL_PANEL,
} from "../../../../../../../../../types/workbench-types";
import { CommonTransformerPassProp } from "../../../../../../../../../types/workbench-types";
import { Dot } from "../../../../../../../../../utils/cTranslationUtils";
import { FN_GetDispatch } from "../../../../../../../../../nocycle";
import BigTextSlice from "../../../../../../../../../reducers/bigTextSlice";
import _ from "lodash";
import { FN_GetActualTextValueByBigTextId, FN_SetTextValueFromOutSideByBigTextId } from "../../../../../../../../../actions/bigtext_action";
import { findLastIndex } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import AjaxUtils from "../../../../../../../../../utils/AjaxUtils";
import AlertUtils from "../../../../../../../../../utils/AlertUtils";
import { SysTabPane } from "../../../../../../../../../components/SysTabPane";
import { CSS_TRANSITION_WIDTH_HEIGHT_ONLY, CSS_TW_LAYOUT_BORDER } from "../../../../../../../../../types/constants";
import exportUtils from "../../../../../../../../../utils/ExportUtils";
import RuntimeStatusSlice from "../../../../../../../../../reducers/runtimeStatusSlice";

import { ClientPortalContext, CommonTransformerProps } from "../types";
import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../../types/purejs-types-READ_ONLY";
import { TextTransformerProps, TransformerWithRuntime, controlBarHeight, controlClz, fn_coll_output, fn_format_button } from "../hooks";
import gutils from "../../../../../../../../../utils/GlobalUtils";
import CopyButton from "../../../../../../../../../components/CopyButton";
import { ActionButtonProps } from "../../../../../../../../../components/ActionButton";
import ParamStateSlice, { TrueFalseType } from "@/app/[lang]/client/src/reducers/state/paramStateSlice";
import { useShouldVerticalModeOrNot } from "..";
import { js_export_trigger } from "@/app/[lang]/client/src/utils/FileExportUtils";
import { ICON_BTN_TRIGGER_FN } from "@/app/__CORE__/meta/constants";
import { InnerToolPanel } from "../../../../nav/functional/panel-group/panels/ToolPanel";
import { appTool2PageMap } from "@/app/[lang]/client/src/impl/tools/g_optlist";
import { fmtURL_ToolSubPageClient } from "@/app/__CORE__/meta/client";
import { URL_SUBCATEGORY_GO_PATH } from "@/app/__CORE__/meta/url";
import { useHideRelatedToolsbarAndRelatedSubControllbar } from "../SubControlBar";
export let useHideBottomAndSettingHook = () => {
    return exportUtils.useSelector((x) => {
        return {
            hideBottomPanel: x.paramState.hdbtpl == 't',
            hideSettingPanel: x.paramState.hdstpt == 't',
        };
    })

}

let TextTransformerControl = (props: CommonTransformerPassProp & { loadingStatic: boolean } & TextTransformerProps & TransformerWithRuntime & {
    onProcess: () => any;
}) => {
    let { inputBigTextId } = props;
    let { fullScreen, hideSideBar, } = exportUtils.useSelector(v => {
        return {
            fullScreen: v.paramState.fs,
            hideSideBar: v.paramState.hsr,
        }
    })
    let hideRelatedToolsBar = props.hideRelatedToolsBar
    let shouldVerticalMode = useShouldVerticalModeOrNot()
    let [loadExample, onLoadExample] = useState(false);
    let toolHandler = props.toolHandler
    let crtRuntimeStatus = props.crtRuntimeStatus
    let parentTriggered = crtRuntimeStatus.processOK || crtRuntimeStatus.processing;
    let operaList = toolHandler?.getOperations() || []
    let crtDefaultOperaId = props.crtDefaultOperaId
    let leftActions: ActionButtonProps[] = [
        {
            icon: hideSideBar == 'f' ? 'menu-closed' : 'menu-open',
            className: '',
            intent: "none",
            minimal: true,
            title: hideSideBar == 'f' ?
                Dot("5_EPRncIx", "Hide Left Navigator") : Dot("qm6Fy9AB2", "Show Left Navigator"),
            onClick: () => {
                let newVal: TrueFalseType = hideSideBar == "t" ? "f" : "t";
                FN_GetDispatch()(
                    ParamStateSlice.actions.updateOneOfParamState({
                        hsr: newVal
                    })
                );
            }
        },
        ...(
            operaList
        ).map(x => {
            let optDetail = x.getOptDetail()
            let crtId = optDetail?.id;
            let crtDesc = optDetail?.optDescription
            let crtName = optDetail?.optName || x.name
            let isHighlightOne = crtId == crtDefaultOperaId && !(
                props.crtSideMenuOpera && props.crtSideMenuOperaId
            ) && !props.loadingExtraOpList;
            return {
                text: crtName,
                icon: ICON_BTN_TRIGGER_FN,
                intent: "primary",
                title: crtDesc,
                afterTitle: crtDesc,
                enableActionMode: true,
                afterText: crtName,
                lastingTime: 800,
                doNotBeMinimalWhenTrigger: true,
                parentTriggered: parentTriggered,
                highlightOne: isHighlightOne,
                outlined: !isHighlightOne,
                minimal: !isHighlightOne,
                onClick: () => {
                    props.fn_updateToolConfig({
                        sideOpId: '',
                        dftOpId: crtId
                    })
                    setTimeout(() => {
                        props.onProcess()
                    }, 0)
                },
            } satisfies ActionButtonProps
        }) satisfies ActionButtonProps[],
        {
            icon: shouldVerticalMode ? 'swap-vertical' : 'swap-horizontal',
            text: Dot("PkIRx3hFD", "Swap"),
            intent: 'none',
            enableActionMode: true,
            afterText: Dot("eg18QOMrM", "Swapped"),
            afterIntent: 'success',
            // outlined: true,
            title: Dot("4M4U_9uBm", "Swap Input and Output"),
            afterTitle: Dot("XuAHhgkpA", "Okay, the input and output are swapped."),
            onClick: async () => {
                let inputValue = FN_GetActualTextValueByBigTextId(inputBigTextId);
                let outputValue = FN_GetActualTextValueByBigTextId(props.outputBigTextId);
                FN_GetDispatch()(
                    FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, outputValue),
                );
                FN_GetDispatch()(
                    FN_SetTextValueFromOutSideByBigTextId(props.outputBigTextId, inputValue),
                )
            }
        },
        {
            icon: 'document-open',
            // outlined: true,
            text: Dot("2bdqHk", "File"),
            intent: "none",
            title: Dot("NNfdo", "Load Data from File as input"),
            onClick: () => {
                AlertUtils.popNotSupport()
            }
        },
        {
            icon: 'color-fill',
            text: Dot("IdfUH5", "Example"),
            intent: "none",
            className: "",
            enableActionMode: true,
            afterText: Dot("OO0qPN", "Example Loaded"),
            afterIntent: "none",
            title: Dot("5lW8qp", "Show an example for this tool"),
            // outlined: true,
            afterTitle: Dot("OeO0PeN", "Okay, the example is displayed in the input editor."),
            loading: loadExample,
            onClick: async () => {
                try {
                    onLoadExample(true);
                    let val: string = props.crtDefaultOpera?.getOptDetail()?.exampleInput || ''
                    if (_.isEmpty(val)) {
                        let r = await AjaxUtils.DoStaticRequest({
                            url: "/example/" + toolHandler?.getMetaInfo()?.exampleType + ".txt",
                        });
                        if (r.status != 200) {
                            throw new Error(Dot("vU17B", "Unable to send the request"));
                        }
                        val = r.data;
                    }
                    FN_GetDispatch()(
                        FN_SetTextValueFromOutSideByBigTextId(inputBigTextId, val),
                    );
                } catch (e) {
                    console.log(e);
                    AlertUtils.popError(e as any);
                } finally {
                    onLoadExample(false);
                }
            },
        },
        ...(hideRelatedToolsBar == 't' ? [
            {
                icon: 'folder-close',
                intent: "none",
                minimal: true,
                title: Dot("hZo9cqwX", "Show Relevant Tools Bar"),
                onClick: () => {
                    let newVal: TrueFalseType = hideRelatedToolsBar == "t" ? "f" : "t";
                    FN_GetDispatch()(
                        ParamStateSlice.actions.updateOneOfParamState({
                            hrts: newVal
                        })
                    );
                }
            }
        ] : []) satisfies ActionButtonProps[]
    ];
    if (props.loadingStatic) {
        leftActions.forEach(x => {
            x.loading = true;
        })
    }
    let sessionId = props.sessionId;
    let [openSearchPanel, setOpenSearchPanel] = useState(false);
    let { hideBottomPanel: hideBottomPanel, hideSettingPanel } = useHideBottomAndSettingHook()
    let triggerBottomPanel = (v: boolean) => {
        FN_GetDispatch()(
            ParamStateSlice.actions.updateOneOfParamState({
                hdbtpl: v ? "t" : "f",
            })
        );
    };
    let triggerSettingPanel = (v: boolean) => {
        FN_GetDispatch()(
            ParamStateSlice.actions.updateOneOfParamState({
                hdstpt: v ? "t" : "f",
            })
        );
    }
    let clientPortalContext = useContext(ClientPortalContext)
    let rightActions: ActionButtonProps[] = [
        {
            // icon: "export",
            icon: "download",
            intent: "success" as any,
            className: "btn-purple",
            text: Dot("o52xW", "Export"),
            title: Dot("i88tb", "Export Result to File"),
            onClick: () => {
                let outputValue = FN_GetActualTextValueByBigTextId(props.outputBigTextId)
                if (outputValue == '') {
                    AlertUtils.popMsg('warning', {
                        message: Dot("1h6jH", "Warning, the output is an empty value whose length is zero!")
                    })
                }
                js_export_trigger({
                    saveValue: outputValue,
                    filename: `result-${Date.now()}.txt`
                })
            }
        },

        {
            icon: "series-configuration",
            intent: hideSettingPanel ? "none" : "success",
            className: hideSettingPanel ? "" : "btn-lime",
            title: hideSettingPanel ? Dot("CEB76UtFY", "Hide Settings") : Dot("vYU1HVe-C", "Show Settings"),
            onClick() {
                triggerSettingPanel(!hideSettingPanel);
            }
        },
        {
            icon: "console",
            intent: hideBottomPanel ? "none" : "success",
            className: hideBottomPanel ? "" : "btn-lime",
            title: hideBottomPanel ? Dot("1IrWC1qw", "Hide Bottom Panel") : Dot("pENGfAKuz", "Show Bottom Panel"),
            onClick() {
                triggerBottomPanel(!hideBottomPanel);
            }
        },


        {
            icon: "rect-width",
            intent: shouldVerticalMode ? "none" : "success",
            className: shouldVerticalMode ? "" : "btn-lime",
            title: shouldVerticalMode ? Dot("y7LSbS5l4", "Switch to Vertical Mode") : Dot("7zlGdIUGvj", "Switch to Horizontal Mode"),
            onClick() {
                FN_GetDispatch()(
                    ParamStateSlice.actions.updateOneOfParamState({
                        ltr: shouldVerticalMode ? 't' : 'f',
                    })
                );
            }
        },
        // {
        //     icon: 'eraser',
        //     intent: 'none',
        //     title: Dot("IJjSINgO0", "Reset the tool to default state"),
        //     onClick: () => {
        //         if (!confirm(Dot("OjdV1-pMy", "Are you sure to reset the tool to default state?"))) {
        //             return;
        //         }
        //     },
        // },
        {
            icon: 'search',
            intent: 'none',
            title: Dot("6SypzjeRz", "Quickly search tools that you need"),
            popoverItem: (props) => {
                return (
                    <div style={{ width: '300px', height: '580px', overflow: 'auto' }}>
                        <InnerToolPanel onPopClose={props.onPopClose} onPopRedirectPage={(x, newTab) => {
                            if (true) {
                                let toolId = x.id
                                let possibleRouteArr = appTool2PageMap[toolId]
                                if (!possibleRouteArr) {
                                    AlertUtils.popMsg('warning', {
                                        message: Dot("srynotavai", "Sorry, the tool is not available now.")
                                    })
                                    return
                                } else {
                                    let pagePathArr = possibleRouteArr[0].pagePath
                                    // TODO: we've reset sidebar op id curerntly, but wonder whether we should keep it and reset it by url parameter or not
                                    // pagePathArr[pagePathArr.length - 1] = pagePathArr[pagePathArr.length - 1] + "?nqop=true"
                                    let goLink = fmtURL_ToolSubPageClient([
                                        URL_SUBCATEGORY_GO_PATH,
                                        ...pagePathArr,
                                    ])
                                    if (newTab) {
                                        window.open(
                                            goLink
                                        )

                                    } else {
                                        location.href = goLink
                                    }
                                }
                            }
                        }} />
                    </div>
                )
            },
        }
    ];
    return (
        <div
            className={
                " w-full using-edge-ui-bg flex border-b-[1px] dark:border-gray-600 px-1  flex-column items-center justify-between "
                +
                (
                    ''
                )
            }
            style={{
                height: controlBarHeight,
            }}
        >
            <div className={controlClz}>
                {leftActions.map(fn_format_button("bottom-start"))}
            </div>
            <div className={controlClz}>
                <CopyButton
                    placement="bottom-end"
                    extraButtonProps={{
                        small: true,
                    }}
                    enableTextMode
                    onCopy={() => {
                        let outputValue = FN_GetActualTextValueByBigTextId(props.outputBigTextId)
                        if (outputValue == '') {
                            AlertUtils.popMsg('warning', {
                                message: Dot("1h6jH", "Warning, the output is an empty value whose length is zero!")
                            })
                        }
                        gutils.copy(outputValue)
                    }}></CopyButton>
                {rightActions.map(fn_format_button("bottom-end"))}
            </div>
        </div>
    );
};

export default TextTransformerControl