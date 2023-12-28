import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "template_handlebars.text",
      Tooltip: Dot("xP56template_handlebarsK", "Click to process your data"),
      Label: Dot("xIPtemplate_handlebars", "Get template_handlebars"),
      CallFuncList: Dot("xtemplate_handlebars.ConvertText"),
    },
  ],
  Info: {
    Id: "template_handlebars",
    Label: Dot("x41etemplate_handlebars", "template_handlebars"),
    Description: Dot("6wtemplate_handlebars", "TBC"),
  },
};

export default v;
