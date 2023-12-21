import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_sundrytext.text",
      Tooltip: Dot("P56rand_sundrytextK", "Click to process your data"),
      Label: Dot("IPrand_sundrytext", "Get rand_sundrytext"),
      CallFuncList: Dot("rand_sundrytext.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_sundrytext",
    Label: Dot("41erand_sundrytext", "rand_sundrytext"),
    Description: Dot(
      "6wrand_sundrytext",
      "TBC"
    ),
  },
};

export default v;
