import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sm2.text",
      Tooltip: Dot("P56sm2K", "Click to process your data"),
      Label: Dot("IPsm2", "Get sm2"),
      CallFuncList: Dot("sm2.ConvertText"),
    },
  ],
  Info: {
    Id: "sm2",
    Label: Dot("41esm2", "sm2"),
    Description: [
      "6wsm2",
      "TBC"
    ],
  },
};

export default v;
