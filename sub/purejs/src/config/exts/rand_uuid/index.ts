import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_uuid.text",
      Tooltip: Dot("P56rand_uuidK", "Click to process your data"),
      Label: Dot("IPrand_uuid", "Get rand_uuid"),
      CallFuncList: Dot("rand_uuid.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_uuid",
    Label: Dot("41erand_uuid", "rand_uuid"),
    Description: [
      "6wrand_uuid",
      "TBC"
    ],
  },
};

export default v;
