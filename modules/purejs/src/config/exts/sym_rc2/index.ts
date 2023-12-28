import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_rc2.text",
      Tooltip: Dot("xP56sym_rc2K", "Click to process your data"),
      Label: Dot("xIPsym_rc2", "Get sym_rc2"),
      CallFuncList: Dot("xsym_rc2.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_rc2",
    Label: Dot("x41esym_rc2", "sym_rc2"),
    Description: Dot("6wsym_rc2", "TBC"),
  },
};

export default v;
