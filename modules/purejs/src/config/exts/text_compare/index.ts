import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "text_compare.text",
      Tooltip: Dot("xP56text_compareK", "Click to process your data"),
      Label: Dot("xIPtext_compare", "Get text_compare"),
      CallFuncList: Dot("xtext_compare.ConvertText"),
    },
  ],
  Info: {
    Id: "text_compare",
    Label: Dot("x41etext_compare", "text_compare"),
    Description: Dot("6wtext_compare", "TBC"),
  },
};

export default v;
