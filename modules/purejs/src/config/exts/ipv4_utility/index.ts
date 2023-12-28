import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "ipv4_utility.text",
      Tooltip: Dot("xP56ipv4_utilityK", "Click to process your data"),
      Label: Dot("xIPipv4_utility", "Get ipv4_utility"),
      CallFuncList: Dot("xipv4_utility.ConvertText"),
    },
  ],
  Info: {
    Id: "ipv4_utility",
    Label: Dot("x41eipv4_utility", "ipv4_utility"),
    Description: Dot("6wipv4_utility", "TBC"),
  },
};

export default v;
