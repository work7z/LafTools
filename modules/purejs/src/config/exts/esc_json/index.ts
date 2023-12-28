import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_json.text",
      Tooltip: Dot("xP56esc_jsonK", "Click to process your data"),
      Label: Dot("xIPesc_json", "Get esc_json"),
      CallFuncList: Dot("xesc_json.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_json",
    Label: Dot("x41eesc_json", "esc_json"),
    Description: Dot("6wesc_json", "TBC"),
  },
};

export default v;
