import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "ipv4_network_calculater.text",
      Tooltip: Dot("P56ipv4_network_calculaterK", "Click to process your data"),
      Label: Dot("IPipv4_network_calculater", "Get ipv4_network_calculater"),
      CallFuncList: Dot("ipv4_network_calculater.ConvertText"),
    },
  ],
  Info: {
    Id: "ipv4_network_calculater",
    Label: Dot("41eipv4_network_calculater", "ipv4_network_calculater"),
    Description: Dot(
      "6wipv4_network_calculater",
      "TBC"
    ),
  },
};

export default v;
