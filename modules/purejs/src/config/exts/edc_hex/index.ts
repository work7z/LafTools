import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "edc_hex.text",
      Tooltip: Dot("xP56edc_hexK", "Click to process your data"),
      Label: Dot("xIPedc_hex", "Get edc_hex"),
      CallFuncList: Dot("xedc_hex.ConvertText"),
    },
  ],
  Info: {
    Id: "edc_hex",
    Label: Dot("x41eedc_hex", "edc_hex"),
    Description: Dot("6wedc_hex", "TBC"),
  },
};

export default v;
