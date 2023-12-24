import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_json.text",
      Tooltip: Dot("P56esc_jsonK", "Click to process your data"),
      Label: Dot("IPesc_json", "Get esc_json"),
      CallFuncList: Dot("esc_json.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_json",
    Label: Dot("41eesc_json", "esc_json"),
    Description: Dot(
      "6wesc_json",
      "TBC"
    ),
  },
};

export default v;
