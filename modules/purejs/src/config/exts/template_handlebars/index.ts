import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "template_handlebars.text",
      Tooltip: Dot("P56template_handlebarsK", "Click to process your data"),
      Label: Dot("IPtemplate_handlebars", "Get template_handlebars"),
      CallFuncList: Dot("template_handlebars.ConvertText"),
    },
  ],
  Info: {
    Id: "template_handlebars",
    Label: Dot("41etemplate_handlebars", "template_handlebars"),
    Description: [
      "6wtemplate_handlebars",
      "TBC"
    ],
  },
};

export default v;
