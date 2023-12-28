import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_graphql.text",
      Tooltip: Dot("xP56fmt_graphqlK", "Click to process your data"),
      Label: Dot("xIPfmt_graphql", "Get fmt_graphql"),
      CallFuncList: Dot("xfmt_graphql.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_graphql",
    Label: Dot("x41efmt_graphql", "fmt_graphql"),
    Description: Dot("6wfmt_graphql", "TBC"),
  },
};

export default v;
