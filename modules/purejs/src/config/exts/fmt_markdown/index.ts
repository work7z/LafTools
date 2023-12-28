import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_markdown.text",
      Tooltip: Dot("xP56fmt_markdownK", "Click to process your data"),
      Label: Dot("xIPfmt_markdown", "Get fmt_markdown"),
      CallFuncList: Dot("xfmt_markdown.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_markdown",
    Label: Dot("x41efmt_markdown", "fmt_markdown"),
    Description: Dot("6wfmt_markdown", "TBC"),
  },
};

export default v;
