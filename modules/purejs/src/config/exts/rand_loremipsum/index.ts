import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_loremipsum.text",
      Tooltip: Dot("P56rand_loremipsumK", "Click to process your data"),
      Label: Dot("IPrand_loremipsum", "Get rand_loremipsum"),
      CallFuncList: Dot("rand_loremipsum.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_loremipsum",
    Label: Dot("41erand_loremipsum", "rand_loremipsum"),
    Description: Dot(
      "6wrand_loremipsum",
      "TBC"
    ),
  },
};

export default v;
