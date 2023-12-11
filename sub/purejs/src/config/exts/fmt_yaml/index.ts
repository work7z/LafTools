import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_yaml.text",
      Tooltip: Dot("P56fmt_yamlK", "Click to process your data"),
      Label: Dot("IPfmt_yaml", "Get fmt_yaml"),
      CallFuncList: Dot("fmt_yaml.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_yaml",
    Label: Dot("41efmt_yaml", "fmt_yaml"),
    Description: [
      "6wfmt_yaml",
      "TBC"
    ],
  },
};

export default v;
