import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_yaml.text",
      Tooltip: Dot("xP56fmt_yamlK", "Click to process your data"),
      Label: Dot("xIPfmt_yaml", "Get fmt_yaml"),
      CallFuncList: Dot("xfmt_yaml.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_yaml",
    Label: Dot("x41efmt_yaml", "fmt_yaml"),
    Description: Dot("6wfmt_yaml", "TBC"),
  },
};

export default v;
