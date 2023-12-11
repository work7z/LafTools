import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "text_compare.text",
      Tooltip: Dot("P56text_compareK", "Click to process your data"),
      Label: Dot("IPtext_compare", "Get text_compare"),
      CallFuncList: Dot("text_compare.ConvertText"),
    },
  ],
  Info: {
    Id: "text_compare",
    Label: Dot("41etext_compare", "text_compare"),
    Description: [
      "6wtext_compare",
      "TBC"
    ],
  },
};

export default v;
