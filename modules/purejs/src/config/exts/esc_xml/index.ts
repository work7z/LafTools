import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_xml.text",
      Tooltip: Dot("xP56esc_xmlK", "Click to process your data"),
      Label: Dot("xIPesc_xml", "Get esc_xml"),
      CallFuncList: Dot("xesc_xml.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_xml",
    Label: Dot("x41eesc_xml", "esc_xml"),
    Description: Dot("6wesc_xml", "TBC"),
  },
};

export default v;
