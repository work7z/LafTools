import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "polish_by_ai.text",
      Tooltip: Dot("xP56polish_by_aiK", "Click to process your data"),
      Label: Dot("xIPpolish_by_ai", "Get polish_by_ai"),
      CallFuncList: Dot("xpolish_by_ai.ConvertText"),
    },
  ],
  Info: {
    Id: "polish_by_ai",
    Label: Dot("x41epolish_by_ai", "polish_by_ai"),
    Description: Dot("6wpolish_by_ai", "TBC"),
  },
};

export default v;
