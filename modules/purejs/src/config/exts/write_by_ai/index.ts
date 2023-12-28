import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "write_by_ai.text",
      Tooltip: Dot("xP56write_by_aiK", "Click to process your data"),
      Label: Dot("xIPwrite_by_ai", "Get write_by_ai"),
      CallFuncList: Dot("xwrite_by_ai.ConvertText"),
    },
  ],
  Info: {
    Id: "write_by_ai",
    Label: Dot("x41ewrite_by_ai", "write_by_ai"),
    Description: Dot("6wwrite_by_ai", "TBC"),
  },
};

export default v;
