import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_javascript.text",
      Tooltip: Dot("P56esc_javascriptK", "Click to process your data"),
      Label: Dot("IPesc_javascript", "Get esc_javascript"),
      CallFuncList: Dot("esc_javascript.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_javascript",
    Label: Dot("41eesc_javascript", "esc_javascript"),
    Description: Dot(
      "6wesc_javascript",
      "TBC"
    ),
  },
};

export default v;
