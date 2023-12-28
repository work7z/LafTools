import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_plaintext.text",
      Tooltip: Dot("xP56rand_plaintextK", "Click to process your data"),
      Label: Dot("xIPrand_plaintext", "Get rand_plaintext"),
      CallFuncList: Dot("xrand_plaintext.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_plaintext",
    Label: Dot("x41erand_plaintext", "rand_plaintext"),
    Description: Dot("6wrand_plaintext", "TBC"),
  },
};

export default v;
