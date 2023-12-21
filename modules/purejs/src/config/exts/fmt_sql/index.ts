import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_sql.text",
      Tooltip: Dot("P56fmt_sqlK", "Click to process your data"),
      Label: Dot("IPfmt_sql", "Get fmt_sql"),
      CallFuncList: Dot("fmt_sql.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_sql",
    Label: Dot("41efmt_sql", "fmt_sql"),
    Description: Dot(
      "6wfmt_sql",
      "TBC"
    ),
  },
};

export default v;
