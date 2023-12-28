import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sm4.text",
      Tooltip: Dot("xP56sm4K", "Click to process your data"),
      Label: Dot("xIPsm4", "Get sm4"),
      CallFuncList: Dot("xsm4.ConvertText"),
    },
  ],
  Info: {
    Id: "sm4",
    Label: Dot("x41esm4", "sm4"),
    Description: Dot("6wsm4", "TBC"),
  },
};

export default v;
