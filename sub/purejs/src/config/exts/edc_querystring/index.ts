import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_querystring.text",
      Tooltip: Dot("P56edc_querystringK", "Click to process your data"),
      Label: Dot("IPedc_querystring", "Get edc_querystring"),
      CallFuncList: Dot("edc_querystring.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_querystring",
    Label: Dot("41eedc_querystring", "edc_querystring"),
    Description: [
      "6wedc_querystring",
      "TBC"
    ],
  },
};

export default v;
