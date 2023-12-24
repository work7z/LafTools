import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_css.text",
      Tooltip: Dot("P56fmt_cssK", "Click to process your data"),
      Label: Dot("IPfmt_css", "Get fmt_css"),
      CallFuncList: Dot("fmt_css.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_css",
    Label: Dot("41efmt_css", "fmt_css"),
    Description: Dot(
      "6wfmt_css",
      "TBC"
    ),
  },
};

export default v;
