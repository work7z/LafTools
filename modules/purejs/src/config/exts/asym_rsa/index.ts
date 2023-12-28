import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "asym_rsa.text",
      Tooltip: Dot("xP56asym_rsaK", "Click to process your data"),
      Label: Dot("xIPasym_rsa", "Get asym_rsa"),
      CallFuncList: Dot("xasym_rsa.ConvertText"),
    },
  ],
  Info: {
    Id: "asym_rsa",
    Label: Dot("x41easym_rsa", "asym_rsa"),
    Description: Dot("6wasym_rsa", "TBC"),
  },
};

export default v;
