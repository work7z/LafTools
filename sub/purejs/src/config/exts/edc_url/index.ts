import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_url.text",
      Tooltip: Dot("P56edc_urlK", "Click to process your data"),
      Label: Dot("IPedc_url", "Get edc_url"),
      CallFuncList: Dot("edc_url.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_url",
    Label: Dot("41eedc_url", "edc_url"),
    Description: [
      "6wedc_url",
      "TBC"
    ],
  },
};

export default v;
