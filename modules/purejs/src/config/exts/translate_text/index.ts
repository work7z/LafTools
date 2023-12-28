import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "translate_text.text",
      Tooltip: Dot("xP56translate_textK", "Click to process your data"),
      Label: Dot("xIPtranslate_text", "Get translate_text"),
      CallFuncList: Dot("xtranslate_text.ConvertText"),
    },
  ],
  Info: {
    Id: "translate_text",
    Label: Dot("x41etranslate_text", "translate_text"),
    Description: Dot("6wtranslate_text", "TBC"),
  },
};

export default v;
