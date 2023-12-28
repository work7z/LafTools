import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_java_string.text",
      Tooltip: Dot("xP56esc_java_stringK", "Click to process your data"),
      Label: Dot("xIPesc_java_string", "Get esc_java_string"),
      CallFuncList: Dot("xesc_java_string.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_java_string",
    Label: Dot("x41eesc_java_string", "esc_java_string"),
    Description: Dot("6wesc_java_string", "TBC"),
  },
};

export default v;
