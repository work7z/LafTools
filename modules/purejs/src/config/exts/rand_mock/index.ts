import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_mock.text",
      Tooltip: Dot("xP56rand_mockK", "Click to process your data"),
      Label: Dot("xIPrand_mock", "Get rand_mock"),
      CallFuncList: Dot("xrand_mock.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_mock",
    Label: Dot("x41erand_mock", "rand_mock"),
    Description: Dot("6wrand_mock", "TBC"),
  },
};

export default v;
