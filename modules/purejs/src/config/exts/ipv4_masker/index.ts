import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "ipv4_masker.text",
      Tooltip: Dot("xP56ipv4_maskerK", "Click to process your data"),
      Label: Dot("xIPipv4_masker", "Get ipv4_masker"),
      CallFuncList: Dot("xipv4_masker.ConvertText"),
    },
  ],
  Info: {
    Id: "ipv4_masker",
    Label: Dot("x41eipv4_masker", "ipv4_masker"),
    Description: Dot("6wipv4_masker", "TBC"),
  },
};

export default v;
