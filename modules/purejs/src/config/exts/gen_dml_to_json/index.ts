import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "gen_dml_to_json.text",
      Tooltip: Dot("P56gen_dml_to_jsonK", "Click to process your data"),
      Label: Dot("IPgen_dml_to_json", "Get gen_dml_to_json"),
      CallFuncList: Dot("gen_dml_to_json.ConvertText"),
    },
  ],
  Info: {
    Id: "gen_dml_to_json",
    Label: Dot("41egen_dml_to_json", "gen_dml_to_json"),
    Description: Dot(
      "6wgen_dml_to_json",
      "TBC"
    ),
  },
};

export default v;
