import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "asym_rsa.text",
      Tooltip: Dot("P56asym_rsaK", "Click to process your data"),
      Label: Dot("IPasym_rsa", "Get asym_rsa"),
      CallFuncList: Dot("asym_rsa.ConvertText"),
    },
  ],
  Info: {
    Id: "asym_rsa",
    Label: Dot("41easym_rsa", "asym_rsa"),
    Description: Dot(
      "6wasym_rsa",
      "TBC"
    ),
  },
};

export default v;
