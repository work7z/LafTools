import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_triple_des.text",
      Tooltip: Dot("xP56sym_triple_desK", "Click to process your data"),
      Label: Dot("xIPsym_triple_des", "Get sym_triple_des"),
      CallFuncList: Dot("xsym_triple_des.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_triple_des",
    Label: Dot("x41esym_triple_des", "sym_triple_des"),
    Description: Dot("6wsym_triple_des", "TBC"),
  },
};

export default v;
