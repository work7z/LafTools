import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "translate_properties.text",
      Tooltip: Dot("xP56translate_propertiesK", "Click to process your data"),
      Label: Dot("xIPtranslate_properties", "Get translate_properties"),
      CallFuncList: Dot("xtranslate_properties.ConvertText"),
    },
  ],
  Info: {
    Id: "translate_properties",
    Label: Dot("x41etranslate_properties", "translate_properties"),
    Description: Dot("6wtranslate_properties", "TBC"),
  },
};

export default v;
