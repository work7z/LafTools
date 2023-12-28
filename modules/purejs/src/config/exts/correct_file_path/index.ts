import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "correct_file_path.text",
      Tooltip: Dot("xP56correct_file_pathK", "Click to process your data"),
      Label: Dot("xIPcorrect_file_path", "Get correct_file_path"),
      CallFuncList: Dot("xcorrect_file_path.ConvertText"),
    },
  ],
  Info: {
    Id: "correct_file_path",
    Label: Dot("x41ecorrect_file_path", "correct_file_path"),
    Description: Dot("6wcorrect_file_path", "TBC"),
  },
};

export default v;
