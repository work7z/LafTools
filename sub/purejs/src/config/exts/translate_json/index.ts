import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "translate_json.text",
      Tooltip: Dot("P56translate_jsonK", "Click to process your data"),
      Label: Dot("IPtranslate_json", "Get translate_json"),
      CallFuncList: Dot("translate_json.ConvertText"),
    },
  ],
  Info: {
    Id: "translate_json",
    Label: Dot("41etranslate_json", "translate_json"),
    Description: [
      "6wtranslate_json",
      "TBC"
    ],
  },
};

export default v;
