import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sym_pbe_md5_des.text",
      Tooltip: Dot("P56sym_pbe_md5_desK", "Click to process your data"),
      Label: Dot("IPsym_pbe_md5_des", "Get sym_pbe_md5_des"),
      CallFuncList: Dot("sym_pbe_md5_des.ConvertText"),
    },
  ],
  Info: {
    Id: "sym_pbe_md5_des",
    Label: Dot("41esym_pbe_md5_des", "sym_pbe_md5_des"),
    Description: [
      "6wsym_pbe_md5_des",
      "TBC"
    ],
  },
};

export default v;
