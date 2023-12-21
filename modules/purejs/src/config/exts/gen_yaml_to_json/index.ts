import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "gen_yaml_to_json.text",
      Tooltip: Dot("P56gen_yaml_to_jsonK", "Click to process your data"),
      Label: Dot("IPgen_yaml_to_json", "Get gen_yaml_to_json"),
      CallFuncList: Dot("gen_yaml_to_json.ConvertText"),
    },
  ],
  Info: {
    Id: "gen_yaml_to_json",
    Label: Dot("41egen_yaml_to_json", "gen_yaml_to_json"),
    Description: [
      "6wgen_yaml_to_json",
      "TBC"
    ],
  },
};

export default v;
