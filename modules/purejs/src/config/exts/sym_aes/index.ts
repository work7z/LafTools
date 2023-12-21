import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_aes.text",
      Tooltip: Dot("P56sym_aesK", "Click to process your data"),
      Label: Dot("IPsym_aes", "Get sym_aes"),
      CallFuncList: Dot("sym_aes.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_aes",
    Label: Dot("41esym_aes", "sym_aes"),
    Description: Dot(
      "6wsym_aes",
      "TBC"
    ),
  },
};

export default v;
