import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_des.text",
      Tooltip: Dot("P56sym_desK", "Click to process your data"),
      Label: Dot("IPsym_des", "Get sym_des"),
      CallFuncList: Dot("sym_des.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_des",
    Label: Dot("41esym_des", "sym_des"),
    Description: [
      "6wsym_des",
      "TBC"
    ],
  },
};

export default v;
