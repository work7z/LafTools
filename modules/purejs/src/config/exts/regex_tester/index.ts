import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "regex_tester.text",
      Tooltip: Dot("xP56regex_testerK", "Click to process your data"),
      Label: Dot("xIPregex_tester", "Get regex_tester"),
      CallFuncList: Dot("xregex_tester.ConvertText"),
    },
  ],
  Info: {
    Id: "regex_tester",
    Label: Dot("x41eregex_tester", "regex_tester"),
    Description: Dot("6wregex_tester", "TBC"),
  },
};

export default v;
