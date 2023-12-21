import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "curl_to_pl.text",
      Tooltip: Dot("P56curl_to_plK", "Click to process your data"),
      Label: Dot("IPcurl_to_pl", "Get curl_to_pl"),
      CallFuncList: Dot("curl_to_pl.ConvertText"),
    },
  ],
  Info: {
    Id: "curl_to_pl",
    Label: Dot("41ecurl_to_pl", "curl_to_pl"),
    Description: [
      "6wcurl_to_pl",
      "TBC"
    ],
  },
};

export default v;
