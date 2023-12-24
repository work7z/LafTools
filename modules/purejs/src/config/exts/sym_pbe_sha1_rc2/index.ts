import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_pbe_sha1_rc2.text",
      Tooltip: Dot("P56sym_pbe_sha1_rc2K", "Click to process your data"),
      Label: Dot("IPsym_pbe_sha1_rc2", "Get sym_pbe_sha1_rc2"),
      CallFuncList: Dot("sym_pbe_sha1_rc2.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_pbe_sha1_rc2",
    Label: Dot("41esym_pbe_sha1_rc2", "sym_pbe_sha1_rc2"),
    Description: Dot(
      "6wsym_pbe_sha1_rc2",
      "TBC"
    ),
  },
};

export default v;
