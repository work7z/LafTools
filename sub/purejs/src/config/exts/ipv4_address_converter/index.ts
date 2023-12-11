import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "ipv4_address_converter.text",
      Tooltip: Dot("P56ipv4_address_converterK", "Click to process your data"),
      Label: Dot("IPipv4_address_converter", "Get ipv4_address_converter"),
      CallFuncList: Dot("ipv4_address_converter.ConvertText"),
    },
  ],
  Info: {
    Id: "ipv4_address_converter",
    Label: Dot("41eipv4_address_converter", "ipv4_address_converter"),
    Description: [
      "6wipv4_address_converter",
      "TBC"
    ],
  },
};

export default v;
