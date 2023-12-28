import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "fmt_xml.text",
      Tooltip: Dot("xP56fmt_xmlK", "Click to process your data"),
      Label: Dot("xIPfmt_xml", "Get fmt_xml"),
      CallFuncList: Dot("xfmt_xml.ConvertText"),
    },
  ],
  Info: {
    Id: "fmt_xml",
    Label: Dot("x41efmt_xml", "fmt_xml"),
    Description: Dot("6wfmt_xml", "TBC"),
  },
};

export default v;
