import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_javascript.text",
      Tooltip: Dot("P56fmt_javascriptK", "Click to process your data"),
      Label: Dot("IPfmt_javascript", "Get fmt_javascript"),
      CallFuncList: Dot("fmt_javascript.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_javascript",
    Label: Dot("41efmt_javascript", "fmt_javascript"),
    Description: [
      "6wfmt_javascript",
      "TBC"
    ],
  },
};

export default v;
