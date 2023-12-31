import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_url.text",
      Tooltip: Dot("xP56edc_urlK", "Click to process your data"),
      Label: Dot("xIPedc_url", "Get edc_url"),
      CallFuncList: Dot("xedc_url.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_url",
    Label: Dot("x41eedc_url", "edc_url"),
    Description: Dot("6wedc_url", "TBC"),
  },
};

export default v;
