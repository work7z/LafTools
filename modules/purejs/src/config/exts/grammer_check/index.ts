import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "grammer_check.text",
      Tooltip: Dot("P56grammer_checkK", "Click to process your data"),
      Label: Dot("IPgrammer_check", "Get grammer_check"),
      CallFuncList: Dot("grammer_check.ConvertText"),
    },
  ],
  Info: {
    Id: "grammer_check",
    Label: Dot("41egrammer_check", "grammer_check"),
    Description: Dot(
      "6wgrammer_check",
      "TBC"
    ),
  },
};

export default v;
