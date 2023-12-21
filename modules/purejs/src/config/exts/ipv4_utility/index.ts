import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "ipv4_utility.text",
      Tooltip: Dot("P56ipv4_utilityK", "Click to process your data"),
      Label: Dot("IPipv4_utility", "Get ipv4_utility"),
      CallFuncList: Dot("ipv4_utility.ConvertText"),
    },
  ],
  Info: {
    Id: "ipv4_utility",
    Label: Dot("41eipv4_utility", "ipv4_utility"),
    Description: [
      "6wipv4_utility",
      "TBC"
    ],
  },
};

export default v;
