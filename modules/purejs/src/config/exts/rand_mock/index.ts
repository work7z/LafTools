import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_mock.text",
      Tooltip: Dot("P56rand_mockK", "Click to process your data"),
      Label: Dot("IPrand_mock", "Get rand_mock"),
      CallFuncList: Dot("rand_mock.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_mock",
    Label: Dot("41erand_mock", "rand_mock"),
    Description: Dot(
      "6wrand_mock",
      "TBC"
    ),
  },
};

export default v;
