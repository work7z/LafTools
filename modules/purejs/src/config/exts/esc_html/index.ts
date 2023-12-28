import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_html.text",
      Tooltip: Dot("xP56esc_htmlK", "Click to process your data"),
      Label: Dot("xIPesc_html", "Get esc_html"),
      CallFuncList: Dot("xesc_html.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_html",
    Label: Dot("x41eesc_html", "esc_html"),
    Description: Dot("6wesc_html", "TBC"),
  },
};

export default v;
