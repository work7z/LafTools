import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "polish_by_ai.text",
      Tooltip: Dot("P56polish_by_aiK", "Click to process your data"),
      Label: Dot("IPpolish_by_ai", "Get polish_by_ai"),
      CallFuncList: Dot("polish_by_ai.ConvertText"),
    },
  ],
  Info: {
    Id: "polish_by_ai",
    Label: Dot("41epolish_by_ai", "polish_by_ai"),
    Description: Dot(
      "6wpolish_by_ai",
      "TBC"
    ),
  },
};

export default v;
