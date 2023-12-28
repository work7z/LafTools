import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "ipv4_address_converter.text",
      Tooltip: Dot("xP56ipv4_address_converterK", "Click to process your data"),
      Label: Dot("xIPipv4_address_converter", "Get ipv4_address_converter"),
      CallFuncList: Dot("xipv4_address_converter.ConvertText"),
    },
  ],
  Info: {
    Id: "ipv4_address_converter",
    Label: Dot("x41eipv4_address_converter", "ipv4_address_converter"),
    Description: Dot("6wipv4_address_converter", "TBC"),
  },
};

export default v;
