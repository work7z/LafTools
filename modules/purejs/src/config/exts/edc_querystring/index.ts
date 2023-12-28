import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_querystring.text",
      Tooltip: Dot("xP56edc_querystringK", "Click to process your data"),
      Label: Dot("xIPedc_querystring", "Get edc_querystring"),
      CallFuncList: Dot("xedc_querystring.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_querystring",
    Label: Dot("x41eedc_querystring", "edc_querystring"),
    Description: Dot("6wedc_querystring", "TBC"),
  },
};

export default v;
