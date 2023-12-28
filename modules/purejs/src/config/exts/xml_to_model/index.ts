import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "xml_to_model.text",
      Tooltip: Dot("xP56xml_to_modelK", "Click to process your data"),
      Label: Dot("xIPxml_to_model", "Get xml_to_model"),
      CallFuncList: Dot("xxml_to_model.ConvertText"),
    },
  ],
  Info: {
    Id: "xml_to_model",
    Label: Dot("x41exml_to_model", "xml_to_model"),
    Description: Dot("6wxml_to_model", "TBC"),
  },
};

export default v;
