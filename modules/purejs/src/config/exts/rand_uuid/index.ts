import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_uuid.text",
      Tooltip: Dot("xP56rand_uuidK", "Click to process your data"),
      Label: Dot("xIPrand_uuid", "Get rand_uuid"),
      CallFuncList: Dot("xrand_uuid.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_uuid",
    Label: Dot("x41erand_uuid", "rand_uuid"),
    Description: Dot("6wrand_uuid", "TBC"),
  },
};

export default v;
