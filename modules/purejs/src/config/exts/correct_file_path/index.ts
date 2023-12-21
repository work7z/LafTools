import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "correct_file_path.text",
      Tooltip: Dot("P56correct_file_pathK", "Click to process your data"),
      Label: Dot("IPcorrect_file_path", "Get correct_file_path"),
      CallFuncList: Dot("correct_file_path.ConvertText"),
    },
  ],
  Info: {
    Id: "correct_file_path",
    Label: Dot("41ecorrect_file_path", "correct_file_path"),
    Description: [
      "6wcorrect_file_path",
      "TBC"
    ],
  },
};

export default v;