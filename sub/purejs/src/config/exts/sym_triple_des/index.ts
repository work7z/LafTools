import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_triple_des.text",
      Tooltip: Dot("P56sym_triple_desK", "Click to process your data"),
      Label: Dot("IPsym_triple_des", "Get sym_triple_des"),
      CallFuncList: Dot("sym_triple_des.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_triple_des",
    Label: Dot("41esym_triple_des", "sym_triple_des"),
    Description: [
      "6wsym_triple_des",
      "TBC"
    ],
  },
};

export default v;
