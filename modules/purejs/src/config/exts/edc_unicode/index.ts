import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_unicode.text",
      Tooltip: Dot("P56edc_unicodeK", "Click to process your data"),
      Label: Dot("IPedc_unicode", "Get edc_unicode"),
      CallFuncList: Dot("edc_unicode.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_unicode",
    Label: Dot("41eedc_unicode", "edc_unicode"),
    Description: [
      "6wedc_unicode",
      "TBC"
    ],
  },
};

export default v;
