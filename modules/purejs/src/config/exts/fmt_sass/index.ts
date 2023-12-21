import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_sass.text",
      Tooltip: Dot("P56fmt_sassK", "Click to process your data"),
      Label: Dot("IPfmt_sass", "Get fmt_sass"),
      CallFuncList: Dot("fmt_sass.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_sass",
    Label: Dot("41efmt_sass", "fmt_sass"),
    Description: Dot(
      "6wfmt_sass",
      "TBC"
    ),
  },
};

export default v;
