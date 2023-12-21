import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "translate_text.text",
      Tooltip: Dot("P56translate_textK", "Click to process your data"),
      Label: Dot("IPtranslate_text", "Get translate_text"),
      CallFuncList: Dot("translate_text.ConvertText"),
    },
  ],
  Info: {
    Id: "translate_text",
    Label: Dot("41etranslate_text", "translate_text"),
    Description: Dot(
      "6wtranslate_text",
      "TBC"
    ),
  },
};

export default v;
