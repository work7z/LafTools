import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "template_dotjs.text",
      Tooltip: Dot("xP56template_dotjsK", "Click to process your data"),
      Label: Dot("xIPtemplate_dotjs", "Get template_dotjs"),
      CallFuncList: Dot("xtemplate_dotjs.ConvertText"),
    },
  ],
  Info: {
    Id: "template_dotjs",
    Label: Dot("x41etemplate_dotjs", "template_dotjs"),
    Description: Dot("6wtemplate_dotjs", "TBC"),
  },
};

export default v;
