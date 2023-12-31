import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "json_to_model.text",
      Tooltip: Dot("xP56json_to_modelK", "Click to process your data"),
      Label: Dot("xIPjson_to_model", "Get json_to_model"),
      CallFuncList: Dot("xjson_to_model.ConvertText"),
    },
  ],
  Info: {
    Id: "json_to_model",
    Label: Dot("x41ejson_to_model", "json_to_model"),
    Description: Dot("6wjson_to_model", "TBC"),
  },
};

export default v;
