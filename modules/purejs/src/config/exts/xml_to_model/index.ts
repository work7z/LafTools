import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "xml_to_model.text",
      Tooltip: Dot("P56xml_to_modelK", "Click to process your data"),
      Label: Dot("IPxml_to_model", "Get xml_to_model"),
      CallFuncList: Dot("xml_to_model.ConvertText"),
    },
  ],
  Info: {
    Id: "xml_to_model",
    Label: Dot("41exml_to_model", "xml_to_model"),
    Description: Dot(
      "6wxml_to_model",
      "TBC"
    ),
  },
};

export default v;
