import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_html.text",
      Tooltip: Dot("P56esc_htmlK", "Click to process your data"),
      Label: Dot("IPesc_html", "Get esc_html"),
      CallFuncList: Dot("esc_html.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_html",
    Label: Dot("41eesc_html", "esc_html"),
    Description: Dot(
      "6wesc_html",
      "TBC"
    ),
  },
};

export default v;
