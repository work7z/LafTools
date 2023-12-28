import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_rc6.text",
      Tooltip: Dot("xP56sym_rc6K", "Click to process your data"),
      Label: Dot("xIPsym_rc6", "Get sym_rc6"),
      CallFuncList: Dot("xsym_rc6.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_rc6",
    Label: Dot("x41esym_rc6", "sym_rc6"),
    Description: Dot("6wsym_rc6", "TBC"),
  },
};

export default v;
