import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_csv.text",
      Tooltip: Dot("P56esc_csvK", "Click to process your data"),
      Label: Dot("IPesc_csv", "Get esc_csv"),
      CallFuncList: Dot("esc_csv.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_csv",
    Label: Dot("41eesc_csv", "esc_csv"),
    Description: Dot(
      "6wesc_csv",
      "TBC"
    ),
  },
};

export default v;
