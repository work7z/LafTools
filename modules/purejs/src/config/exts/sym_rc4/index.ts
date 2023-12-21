import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_rc4.text",
      Tooltip: Dot("P56sym_rc4K", "Click to process your data"),
      Label: Dot("IPsym_rc4", "Get sym_rc4"),
      CallFuncList: Dot("sym_rc4.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_rc4",
    Label: Dot("41esym_rc4", "sym_rc4"),
    Description: Dot(
      "6wsym_rc4",
      "TBC"
    ),
  },
};

export default v;
