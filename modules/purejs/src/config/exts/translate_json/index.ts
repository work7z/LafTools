import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "translate_json.text",
      Tooltip: Dot("xP56translate_jsonK", "Click to process your data"),
      Label: Dot("xIPtranslate_json", "Get translate_json"),
      CallFuncList: Dot("xtranslate_json.ConvertText"),
    },
  ],
  Info: {
    Id: "translate_json",
    Label: Dot("x41etranslate_json", "translate_json"),
    Description: Dot("6wtranslate_json", "TBC"),
  },
};

export default v;
