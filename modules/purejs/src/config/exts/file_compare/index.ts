import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "file_compare.text",
      Tooltip: Dot("xP56file_compareK", "Click to process your data"),
      Label: Dot("xIPfile_compare", "Get file_compare"),
      CallFuncList: Dot("xfile_compare.ConvertText"),
    },
  ],
  Info: {
    Id: "file_compare",
    Label: Dot("x41efile_compare", "file_compare"),
    Description: Dot("6wfile_compare", "TBC"),
  },
};

export default v;
