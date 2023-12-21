import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sql_to_model.text",
      Tooltip: Dot("P56sql_to_modelK", "Click to process your data"),
      Label: Dot("IPsql_to_model", "Get sql_to_model"),
      CallFuncList: Dot("sql_to_model.ConvertText"),
    },
  ],
  Info: {
    Id: "sql_to_model",
    Label: Dot("41esql_to_model", "sql_to_model"),
    Description: Dot(
      "6wsql_to_model",
      "TBC"
    ),
  },
};

export default v;
