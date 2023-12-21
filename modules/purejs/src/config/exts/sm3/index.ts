import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sm3.text",
      Tooltip: Dot("P56sm3K", "Click to process your data"),
      Label: Dot("IPsm3", "Get sm3"),
      CallFuncList: Dot("sm3.ConvertText"),
    },
  ],
  Info: {
    Id: "sm3",
    Label: Dot("41esm3", "sm3"),
    Description: Dot(
      "6wsm3",
      "TBC"
    ),
  },
};

export default v;
