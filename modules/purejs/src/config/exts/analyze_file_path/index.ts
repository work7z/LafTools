import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "analyze_file_path.text",
      Tooltip: Dot("xP56analyze_file_pathK", "Click to process your data"),
      Label: Dot("xIPanalyze_file_path", "Get analyze_file_path"),
      CallFuncList: Dot("xanalyze_file_path.ConvertText"),
    },
  ],
  Info: {
    Id: "analyze_file_path",
    Label: Dot("x41eanalyze_file_path", "analyze_file_path"),
    Description: Dot("6wanalyze_file_path", "TBC"),
  },
};

export default v;
