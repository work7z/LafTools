import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_rc5.text",
      Tooltip: Dot("P56sym_rc5K", "Click to process your data"),
      Label: Dot("IPsym_rc5", "Get sym_rc5"),
      CallFuncList: Dot("sym_rc5.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_rc5",
    Label: Dot("41esym_rc5", "sym_rc5"),
    Description: Dot(
      "6wsym_rc5",
      "TBC"
    ),
  },
};

export default v;
