import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "translate_customizer.text",
      Tooltip: Dot("xP56translate_customizerK", "Click to process your data"),
      Label: Dot("xIPtranslate_customizer", "Get translate_customizer"),
      CallFuncList: Dot("xtranslate_customizer.ConvertText"),
    },
  ],
  Info: {
    Id: "translate_customizer",
    Label: Dot("x41etranslate_customizer", "translate_customizer"),
    Description: Dot("6wtranslate_customizer", "TBC"),
  },
};

export default v;
