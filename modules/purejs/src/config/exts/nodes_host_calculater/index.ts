import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "nodes_host_calculater.text",
      Tooltip: Dot("xP56nodes_host_calculaterK", "Click to process your data"),
      Label: Dot("xIPnodes_host_calculater", "Get nodes_host_calculater"),
      CallFuncList: Dot("xnodes_host_calculater.ConvertText"),
    },
  ],
  Info: {
    Id: "nodes_host_calculater",
    Label: Dot("x41enodes_host_calculater", "nodes_host_calculater"),
    Description: Dot("6wnodes_host_calculater", "TBC"),
  },
};

export default v;
