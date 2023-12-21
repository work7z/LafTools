import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "ipv4_to_long.text",
      Tooltip: Dot("P56ipv4_to_longK", "Click to process your data"),
      Label: Dot("IPipv4_to_long", "Get ipv4_to_long"),
      CallFuncList: Dot("ipv4_to_long.ConvertText"),
    },
  ],
  Info: {
    Id: "ipv4_to_long",
    Label: Dot("41eipv4_to_long", "ipv4_to_long"),
    Description: Dot(
      "6wipv4_to_long",
      "TBC"
    ),
  },
};

export default v;
