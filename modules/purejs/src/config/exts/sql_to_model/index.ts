import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sql_to_model.text",
      Tooltip: Dot("xP56sql_to_modelK", "Click to process your data"),
      Label: Dot("xIPsql_to_model", "Get sql_to_model"),
      CallFuncList: Dot("xsql_to_model.ConvertText"),
    },
  ],
  Info: {
    Id: "sql_to_model",
    Label: Dot("x41esql_to_model", "sql_to_model"),
    Description: Dot("6wsql_to_model", "TBC"),
  },
};

export default v;
