import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_less.text",
      Tooltip: Dot("P56fmt_lessK", "Click to process your data"),
      Label: Dot("IPfmt_less", "Get fmt_less"),
      CallFuncList: Dot("fmt_less.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_less",
    Label: Dot("41efmt_less", "fmt_less"),
    Description: Dot(
      "6wfmt_less",
      "TBC"
    ),
  },
};

export default v;
