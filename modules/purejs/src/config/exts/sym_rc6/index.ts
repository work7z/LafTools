import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_rc6.text",
      Tooltip: Dot("P56sym_rc6K", "Click to process your data"),
      Label: Dot("IPsym_rc6", "Get sym_rc6"),
      CallFuncList: Dot("sym_rc6.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_rc6",
    Label: Dot("41esym_rc6", "sym_rc6"),
    Description: Dot(
      "6wsym_rc6",
      "TBC"
    ),
  },
};

export default v;
