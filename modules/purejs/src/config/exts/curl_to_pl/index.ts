import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "curl_to_pl.text",
      Tooltip: Dot("xP56curl_to_plK", "Click to process your data"),
      Label: Dot("xIPcurl_to_pl", "Get curl_to_pl"),
      CallFuncList: Dot("xcurl_to_pl.ConvertText"),
    },
  ],
  Info: {
    Id: "curl_to_pl",
    Label: Dot("x41ecurl_to_pl", "curl_to_pl"),
    Description: Dot("6wcurl_to_pl", "TBC"),
  },
};

export default v;
