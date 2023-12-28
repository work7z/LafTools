import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_sundrytext.text",
      Tooltip: Dot("xP56rand_sundrytextK", "Click to process your data"),
      Label: Dot("xIPrand_sundrytext", "Get rand_sundrytext"),
      CallFuncList: Dot("xrand_sundrytext.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_sundrytext",
    Label: Dot("x41erand_sundrytext", "rand_sundrytext"),
    Description: Dot("6wrand_sundrytext", "TBC"),
  },
};

export default v;
