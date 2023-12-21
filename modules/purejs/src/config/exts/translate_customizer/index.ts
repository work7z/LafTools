import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "translate_customizer.text",
      Tooltip: Dot("P56translate_customizerK", "Click to process your data"),
      Label: Dot("IPtranslate_customizer", "Get translate_customizer"),
      CallFuncList: Dot("translate_customizer.ConvertText"),
    },
  ],
  Info: {
    Id: "translate_customizer",
    Label: Dot("41etranslate_customizer", "translate_customizer"),
    Description: [
      "6wtranslate_customizer",
      "TBC"
    ],
  },
};

export default v;
