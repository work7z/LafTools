import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_javascript.text",
      Tooltip: Dot("xP56esc_javascriptK", "Click to process your data"),
      Label: Dot("xIPesc_javascript", "Get esc_javascript"),
      CallFuncList: Dot("xesc_javascript.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_javascript",
    Label: Dot("x41eesc_javascript", "esc_javascript"),
    Description: Dot("6wesc_javascript", "TBC"),
  },
};

export default v;
