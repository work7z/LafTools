import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_json.text",
      Tooltip: Dot("P56fmt_jsonK", "Click to process your data"),
      Label: Dot("IPfmt_json", "Get fmt_json"),
      CallFuncList: Dot("fmt_json.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_json",
    Label: Dot("41efmt_json", "fmt_json"),
    Description: Dot(
      "6wfmt_json",
      "TBC"
    ),
  },
};

export default v;
