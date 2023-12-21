import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_typescript.text",
      Tooltip: Dot("P56fmt_typescriptK", "Click to process your data"),
      Label: Dot("IPfmt_typescript", "Get fmt_typescript"),
      CallFuncList: Dot("fmt_typescript.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_typescript",
    Label: Dot("41efmt_typescript", "fmt_typescript"),
    Description: Dot(
      "6wfmt_typescript",
      "TBC"
    ),
  },
};

export default v;
