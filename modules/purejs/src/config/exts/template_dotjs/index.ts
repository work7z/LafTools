import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "template_dotjs.text",
      Tooltip: Dot("P56template_dotjsK", "Click to process your data"),
      Label: Dot("IPtemplate_dotjs", "Get template_dotjs"),
      CallFuncList: Dot("template_dotjs.ConvertText"),
    },
  ],
  Info: {
    Id: "template_dotjs",
    Label: Dot("41etemplate_dotjs", "template_dotjs"),
    Description: Dot(
      "6wtemplate_dotjs",
      "TBC"
    ),
  },
};

export default v;
