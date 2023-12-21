import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_rc2.text",
      Tooltip: Dot("P56sym_rc2K", "Click to process your data"),
      Label: Dot("IPsym_rc2", "Get sym_rc2"),
      CallFuncList: Dot("sym_rc2.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_rc2",
    Label: Dot("41esym_rc2", "sym_rc2"),
    Description: [
      "6wsym_rc2",
      "TBC"
    ],
  },
};

export default v;
