import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_typescript.text",
      Tooltip: Dot("xP56fmt_typescriptK", "Click to process your data"),
      Label: Dot("xIPfmt_typescript", "Get fmt_typescript"),
      CallFuncList: Dot("xfmt_typescript.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_typescript",
    Label: Dot("x41efmt_typescript", "fmt_typescript"),
    Description: Dot("6wfmt_typescript", "TBC"),
  },
};

export default v;
