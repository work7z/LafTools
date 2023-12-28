import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sm2.text",
      Tooltip: Dot("xP56sm2K", "Click to process your data"),
      Label: Dot("xIPsm2", "Get sm2"),
      CallFuncList: Dot("xsm2.ConvertText"),
    },
  ],
  Info: {
    Id: "sm2",
    Label: Dot("x41esm2", "sm2"),
    Description: Dot("6wsm2", "TBC"),
  },
};

export default v;
