import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_pbe_sha1_des.text",
      Tooltip: Dot("P56sym_pbe_sha1_desK", "Click to process your data"),
      Label: Dot("IPsym_pbe_sha1_des", "Get sym_pbe_sha1_des"),
      CallFuncList: Dot("sym_pbe_sha1_des.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_pbe_sha1_des",
    Label: Dot("41esym_pbe_sha1_des", "sym_pbe_sha1_des"),
    Description: Dot(
      "6wsym_pbe_sha1_des",
      "TBC"
    ),
  },
};

export default v;
