import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_base32.text",
      Tooltip: Dot("P56edc_base32K", "Click to process your data"),
      Label: Dot("IPedc_base32", "Get edc_base32"),
      CallFuncList: Dot("edc_base32.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_base32",
    Label: Dot("41eedc_base32", "edc_base32"),
    Description: Dot(
      "6wedc_base32",
      "TBC"
    ),
  },
};

export default v;
