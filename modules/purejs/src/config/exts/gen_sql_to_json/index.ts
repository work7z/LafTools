import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "gen_sql_to_json.text",
      Tooltip: Dot("P56gen_sql_to_jsonK", "Click to process your data"),
      Label: Dot("IPgen_sql_to_json", "Get gen_sql_to_json"),
      CallFuncList: Dot("gen_sql_to_json.ConvertText"),
    },
  ],
  Info: {
    Id: "gen_sql_to_json",
    Label: Dot("41egen_sql_to_json", "gen_sql_to_json"),
    Description: [
      "6wgen_sql_to_json",
      "TBC"
    ],
  },
};

export default v;
