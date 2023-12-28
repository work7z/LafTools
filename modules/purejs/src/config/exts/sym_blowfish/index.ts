import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_blowfish.text",
      Tooltip: Dot("xP56sym_blowfishK", "Click to process your data"),
      Label: Dot("xIPsym_blowfish", "Get sym_blowfish"),
      CallFuncList: Dot("xsym_blowfish.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_blowfish",
    Label: Dot("x41esym_blowfish", "sym_blowfish"),
    Description: Dot("6wsym_blowfish", "TBC"),
  },
};

export default v;
