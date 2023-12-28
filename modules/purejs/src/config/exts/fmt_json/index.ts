import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_json.text",
      Tooltip: Dot("xP56fmt_jsonK", "Click to process your data"),
      Label: Dot("xIPfmt_json", "Get fmt_json"),
      CallFuncList: Dot("xfmt_json.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_json",
    Label: Dot("x41efmt_json", "fmt_json"),
    Description: Dot("6wfmt_json", "TBC"),
  },
};

export default v;
