import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_markdown.text",
      Tooltip: Dot("P56fmt_markdownK", "Click to process your data"),
      Label: Dot("IPfmt_markdown", "Get fmt_markdown"),
      CallFuncList: Dot("fmt_markdown.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_markdown",
    Label: Dot("41efmt_markdown", "fmt_markdown"),
    Description: Dot(
      "6wfmt_markdown",
      "TBC"
    ),
  },
};

export default v;
