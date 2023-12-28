import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_des.text",
      Tooltip: Dot("xP56sym_desK", "Click to process your data"),
      Label: Dot("xIPsym_des", "Get sym_des"),
      CallFuncList: Dot("xsym_des.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_des",
    Label: Dot("x41esym_des", "sym_des"),
    Description: Dot("6wsym_des", "TBC"),
  },
};

export default v;
