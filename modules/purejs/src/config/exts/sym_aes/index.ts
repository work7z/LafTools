import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_aes.text",
      Tooltip: Dot("xP56sym_aesK", "Click to process your data"),
      Label: Dot("xIPsym_aes", "Get sym_aes"),
      CallFuncList: Dot("xsym_aes.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_aes",
    Label: Dot("x41esym_aes", "sym_aes"),
    Description: Dot("6wsym_aes", "TBC"),
  },
};

export default v;
