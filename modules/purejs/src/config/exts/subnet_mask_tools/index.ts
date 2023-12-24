import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "subnet_mask_tools.text",
      Tooltip: Dot("P56subnet_mask_toolsK", "Click to process your data"),
      Label: Dot("IPsubnet_mask_tools", "Get subnet_mask_tools"),
      CallFuncList: Dot("subnet_mask_tools.ConvertText"),
    },
  ],
  Info: {
    Id: "subnet_mask_tools",
    Label: Dot("41esubnet_mask_tools", "subnet_mask_tools"),
    Description: Dot(
      "6wsubnet_mask_tools",
      "TBC"
    ),
  },
};

export default v;
