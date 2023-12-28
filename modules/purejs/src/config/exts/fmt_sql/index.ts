import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_sql.text",
      Tooltip: Dot("xP56fmt_sqlK", "Click to process your data"),
      Label: Dot("xIPfmt_sql", "Get fmt_sql"),
      CallFuncList: Dot("xfmt_sql.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_sql",
    Label: Dot("x41efmt_sql", "fmt_sql"),
    Description: Dot("6wfmt_sql", "TBC"),
  },
};

export default v;
