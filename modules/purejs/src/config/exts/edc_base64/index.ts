import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_base64.text",
      Tooltip: Dot("P56edc_base64K", "Click to process your data"),
      Label: Dot("IPedc_base64", "Get edc_base64"),
      CallFuncList: Dot("edc_base64.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_base64",
    Label: Dot("41eedc_base64", "edc_base64"),
    Description: Dot(
      "6wedc_base64",
      "TBC"
    ),
  },
};

export default v;
