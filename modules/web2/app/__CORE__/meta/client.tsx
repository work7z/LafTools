import { fmtURL_Client } from "../utils/cRouteUtils"
import { URL_TOOL_CATEGORY } from "./url"


export let fmtURL_ToolSubPageClient = (x: string[]) => {
    return fmtURL_Client([URL_TOOL_CATEGORY, ...x])
}

