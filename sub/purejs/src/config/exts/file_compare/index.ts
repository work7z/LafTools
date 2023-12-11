import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "file_compare.text",
      Tooltip: Dot("P56file_compareK", "Click to process your data"),
      Label: Dot("IPfile_compare", "Get file_compare"),
      CallFuncList: Dot("file_compare.ConvertText"),
    },
  ],
  Info: {
    Id: "file_compare",
    Label: Dot("41efile_compare", "file_compare"),
    Description: [
      "6wfile_compare",
      "TBC"
    ],
  },
};

export default v;
