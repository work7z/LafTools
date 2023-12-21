import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_java_string.text",
      Tooltip: Dot("P56esc_java_stringK", "Click to process your data"),
      Label: Dot("IPesc_java_string", "Get esc_java_string"),
      CallFuncList: Dot("esc_java_string.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_java_string",
    Label: Dot("41eesc_java_string", "esc_java_string"),
    Description: [
      "6wesc_java_string",
      "TBC"
    ],
  },
};

export default v;
