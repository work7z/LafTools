import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_javascript.text",
      Tooltip: Dot("xP56fmt_javascriptK", "Click to process your data"),
      Label: Dot("xIPfmt_javascript", "Get fmt_javascript"),
      CallFuncList: Dot("xfmt_javascript.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_javascript",
    Label: Dot("x41efmt_javascript", "fmt_javascript"),
    Description: Dot("6wfmt_javascript", "TBC"),
  },
};

export default v;
