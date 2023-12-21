import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_base64-hex.text",
      Tooltip: Dot("P56edc_base64-hexK", "Click to process your data"),
      Label: Dot("IPedc_base64-hex", "Get edc_base64-hex"),
      CallFuncList: Dot("edc_base64-hex.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_base64-hex",
    Label: Dot("41eedc_base64-hex", "edc_base64-hex"),
    Description: Dot(
      "6wedc_base64-hex",
      "TBC"
    ),
  },
};

export default v;
