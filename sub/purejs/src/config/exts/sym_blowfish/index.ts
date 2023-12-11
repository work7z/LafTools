import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_blowfish.text",
      Tooltip: Dot("P56sym_blowfishK", "Click to process your data"),
      Label: Dot("IPsym_blowfish", "Get sym_blowfish"),
      CallFuncList: Dot("sym_blowfish.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_blowfish",
    Label: Dot("41esym_blowfish", "sym_blowfish"),
    Description: [
      "6wsym_blowfish",
      "TBC"
    ],
  },
};

export default v;
