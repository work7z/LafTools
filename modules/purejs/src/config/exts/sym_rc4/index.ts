import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_rc4.text",
      Tooltip: Dot("xP56sym_rc4K", "Click to process your data"),
      Label: Dot("xIPsym_rc4", "Get sym_rc4"),
      CallFuncList: Dot("xsym_rc4.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_rc4",
    Label: Dot("x41esym_rc4", "sym_rc4"),
    Description: Dot("6wsym_rc4", "TBC"),
  },
};

export default v;
