import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "regex_tester.text",
      Tooltip: Dot("P56regex_testerK", "Click to process your data"),
      Label: Dot("IPregex_tester", "Get regex_tester"),
      CallFuncList: Dot("regex_tester.ConvertText"),
    },
  ],
  Info: {
    Id: "regex_tester",
    Label: Dot("41eregex_tester", "regex_tester"),
    Description: [
      "6wregex_tester",
      "TBC"
    ],
  },
};

export default v;
