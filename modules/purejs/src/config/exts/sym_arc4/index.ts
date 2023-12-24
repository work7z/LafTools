import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_arc4.text",
      Tooltip: Dot("P56sym_arc4K", "Click to process your data"),
      Label: Dot("IPsym_arc4", "Get sym_arc4"),
      CallFuncList: Dot("sym_arc4.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_arc4",
    Label: Dot("41esym_arc4", "sym_arc4"),
    Description: Dot(
      "6wsym_arc4",
      "TBC"
    ),
  },
};

export default v;
