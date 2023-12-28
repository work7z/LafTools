import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sm3.text",
      Tooltip: Dot("xP56sm3K", "Click to process your data"),
      Label: Dot("xIPsm3", "Get sm3"),
      CallFuncList: Dot("xsm3.ConvertText"),
    },
  ],
  Info: {
    Id: "sm3",
    Label: Dot("x41esm3", "sm3"),
    Description: Dot("6wsm3", "TBC"),
  },
};

export default v;
