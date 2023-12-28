import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_sass.text",
      Tooltip: Dot("xP56fmt_sassK", "Click to process your data"),
      Label: Dot("xIPfmt_sass", "Get fmt_sass"),
      CallFuncList: Dot("xfmt_sass.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_sass",
    Label: Dot("x41efmt_sass", "fmt_sass"),
    Description: Dot("6wfmt_sass", "TBC"),
  },
};

export default v;
