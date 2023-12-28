import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "grammer_check.text",
      Tooltip: Dot("xP56grammer_checkK", "Click to process your data"),
      Label: Dot("xIPgrammer_check", "Get grammer_check"),
      CallFuncList: Dot("xgrammer_check.ConvertText"),
    },
  ],
  Info: {
    Id: "grammer_check",
    Label: Dot("x41egrammer_check", "grammer_check"),
    Description: Dot("6wgrammer_check", "TBC"),
  },
};

export default v;
