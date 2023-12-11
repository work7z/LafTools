import { ExtensionInfo, ExtensionVM } from "../../../all-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "rand_plaintext.text",
      Tooltip: Dot("P56rand_plaintextK", "Click to process your data"),
      Label: Dot("IPrand_plaintext", "Get rand_plaintext"),
      CallFuncList: Dot("rand_plaintext.ConvertText"),
    },
  ],
  Info: {
    Id: "rand_plaintext",
    Label: Dot("41erand_plaintext", "rand_plaintext"),
    Description: [
      "6wrand_plaintext",
      "TBC"
    ],
  },
};

export default v;
