import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "analyze_file_path.text",
      Tooltip: Dot("P56analyze_file_pathK", "Click to process your data"),
      Label: Dot("IPanalyze_file_path", "Get analyze_file_path"),
      CallFuncList: Dot("analyze_file_path.ConvertText"),
    },
  ],
  Info: {
    Id: "analyze_file_path",
    Label: Dot("41eanalyze_file_path", "analyze_file_path"),
    Description: Dot(
      "6wanalyze_file_path",
      "TBC"
    ),
  },
};

export default v;
