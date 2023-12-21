import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_xml.text",
      Tooltip: Dot("P56esc_xmlK", "Click to process your data"),
      Label: Dot("IPesc_xml", "Get esc_xml"),
      CallFuncList: Dot("esc_xml.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_xml",
    Label: Dot("41eesc_xml", "esc_xml"),
    Description: Dot(
      "6wesc_xml",
      "TBC"
    ),
  },
};

export default v;
