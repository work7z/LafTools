import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_hex.text",
      Tooltip: Dot("P56edc_hexK", "Click to process your data"),
      Label: Dot("IPedc_hex", "Get edc_hex"),
      CallFuncList: Dot("edc_hex.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_hex",
    Label: Dot("41eedc_hex", "edc_hex"),
    Description: [
      "6wedc_hex",
      "TBC"
    ],
  },
};

export default v;
