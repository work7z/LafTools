import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_html.text",
      Tooltip: Dot("xP56fmt_htmlK", "Click to process your data"),
      Label: Dot("xIPfmt_html", "Get fmt_html"),
      CallFuncList: Dot("xfmt_html.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_html",
    Label: Dot("x41efmt_html", "fmt_html"),
    Description: Dot("6wfmt_html", "TBC"),
  },
};

export default v;
