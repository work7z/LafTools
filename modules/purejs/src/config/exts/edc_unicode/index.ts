import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_unicode.text",
      Tooltip: Dot("xP56edc_unicodeK", "Click to process your data"),
      Label: Dot("xIPedc_unicode", "Get edc_unicode"),
      CallFuncList: Dot("xedc_unicode.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_unicode",
    Label: Dot("x41eedc_unicode", "edc_unicode"),
    Description: Dot("6wedc_unicode", "TBC"),
  },
};

export default v;
