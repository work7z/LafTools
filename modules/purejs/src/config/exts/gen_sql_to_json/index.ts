import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "gen_sql_to_json.text",
      Tooltip: Dot("xP56gen_sql_to_jsonK", "Click to process your data"),
      Label: Dot("xIPgen_sql_to_json", "Get gen_sql_to_json"),
      CallFuncList: Dot("xgen_sql_to_json.ConvertText"),
    },
  ],
  Info: {
    Id: "gen_sql_to_json",
    Label: Dot("x41egen_sql_to_json", "gen_sql_to_json"),
    Description: Dot("6wgen_sql_to_json", "TBC"),
  },
};

export default v;
