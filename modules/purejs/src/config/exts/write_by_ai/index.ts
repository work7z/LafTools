import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "write_by_ai.text",
      Tooltip: Dot("P56write_by_aiK", "Click to process your data"),
      Label: Dot("IPwrite_by_ai", "Get write_by_ai"),
      CallFuncList: Dot("write_by_ai.ConvertText"),
    },
  ],
  Info: {
    Id: "write_by_ai",
    Label: Dot("41ewrite_by_ai", "write_by_ai"),
    Description: [
      "6wwrite_by_ai",
      "TBC"
    ],
  },
};

export default v;
