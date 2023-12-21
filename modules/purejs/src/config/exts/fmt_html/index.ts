import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_html.text",
      Tooltip: Dot("P56fmt_htmlK", "Click to process your data"),
      Label: Dot("IPfmt_html", "Get fmt_html"),
      CallFuncList: Dot("fmt_html.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_html",
    Label: Dot("41efmt_html", "fmt_html"),
    Description: Dot(
      "6wfmt_html",
      "TBC"
    ),
  },
};

export default v;
