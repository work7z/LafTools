import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "esc_csv.text",
      Tooltip: Dot("xP56esc_csvK", "Click to process your data"),
      Label: Dot("xIPesc_csv", "Get esc_csv"),
      CallFuncList: Dot("xesc_csv.ConvertText"),
    },
  ],
  Info: {
    Id: "esc_csv",
    Label: Dot("x41eesc_csv", "esc_csv"),
    Description: Dot("6wesc_csv", "TBC"),
  },
};

export default v;
