import { ExtensionAction, ToolDefaultOutputType } from "../../../../../../../../types/purejs-types-READ_ONLY";

export let getInitValueForRuntimeStatus = ():ToolDefaultOutputType=>{
    return {
        latestViewPanelId: "tools",
        toolTabIndex: "tools",
        collapseConfig: false,
        collapseOutput: false,
        autoRun: "true"
      }
}