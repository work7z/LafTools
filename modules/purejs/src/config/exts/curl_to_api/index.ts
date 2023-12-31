import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "curl_to_api.text",
      Tooltip: Dot("xP56curl_to_apiK", "Click to process your data"),
      Label: Dot("xIPcurl_to_api", "Get curl_to_api"),
      CallFuncList: Dot("xcurl_to_api.ConvertText"),
    },
  ],
  Info: {
    Id: "curl_to_api",
    Label: Dot("x41ecurl_to_api", "curl_to_api"),
    Description: Dot("6wcurl_to_api", "TBC"),
  },
};

export default v;
