import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sm4.text",
      Tooltip: Dot("P56sm4K", "Click to process your data"),
      Label: Dot("IPsm4", "Get sm4"),
      CallFuncList: Dot("sm4.ConvertText"),
    },
  ],
  Info: {
    Id: "sm4",
    Label: Dot("41esm4", "sm4"),
    Description: [
      "6wsm4",
      "TBC"
    ],
  },
};

export default v;
